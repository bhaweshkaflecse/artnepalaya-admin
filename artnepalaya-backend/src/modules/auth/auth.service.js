import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env.js'; // Restored your env import
import { redisClient } from '../../server.js'; // Restored your redis import
import { User } from '../users/user.model.js';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
const OTP_TTL = 300; // 5 minutes
const REFRESH_TTL = 7 * 24 * 60 * 60; // 7 days

export const generateTokens = async (userId, role, deviceId) => {
  if (!deviceId) throw Object.assign(new Error('Device ID is required'), { status: 400 });

  // Restored your role handling in the payload
  const accessToken = jwt.sign({ id: userId, role }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId, deviceId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  // Using deviceId to allow multi-device login without overwriting
  await redisClient.setEx(`auth:refresh:${userId}:${deviceId}`, REFRESH_TTL, refreshToken);

  return { accessToken, refreshToken };
};

export const authenticateWithGoogle = async (idToken, deviceId) => {
  if (!deviceId) throw Object.assign(new Error('Device ID is required'), { status: 400 });

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      email: payload.email,
      username: payload.name,
      avatarUrl: payload.picture,
      status: 'active',
      role: 'User' // Default role
    });
  }

  const tokens = await generateTokens(user._id, user.role, deviceId);
  return { user, ...tokens };
};

export const sendOtp = async (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redisClient.setEx(`auth:otp:${phoneNumber}`, OTP_TTL, otp);
  
  // SMS Gateway Integration goes here
  console.log(`[DEV] OTP for ${phoneNumber} is ${otp}`);
  return true;
};

export const verifyOtp = async (phoneNumber, otp, deviceId) => {
  if (!deviceId) throw Object.assign(new Error('Device ID is required'), { status: 400 });

  const storedOtp = await redisClient.get(`auth:otp:${phoneNumber}`);
  
  // Restored your custom error object
  if (!storedOtp || storedOtp !== otp) {
    throw Object.assign(new Error('Invalid or expired OTP'), { status: 400 });
  }
  
  await redisClient.del(`auth:otp:${phoneNumber}`);
  
  let user = await User.findOne({ phoneNumber });
  if (!user) {
    user = await User.create({ phoneNumber, status: 'active', role: 'User' });
  }
  
  const tokens = await generateTokens(user._id, user.role, deviceId);
  return { user, ...tokens };
};

export const refreshSession = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const storedToken = await redisClient.get(`auth:refresh:${decoded.id}:${decoded.deviceId}`);

    if (!storedToken || storedToken !== refreshToken) {
      throw Object.assign(new Error('Session revoked or invalid'), { status: 401 });
    }

    // Role is not in the refresh token, so we fetch it quickly from the DB
    const user = await User.findById(decoded.id).select('role').lean();
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

    return await generateTokens(decoded.id, user.role, decoded.deviceId);
  } catch (err) {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }
};

export const logout = async (userId, deviceId) => {
  await redisClient.del(`auth:refresh:${userId}:${deviceId}`);
  return true;
};