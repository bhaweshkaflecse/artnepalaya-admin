import * as authService from './auth.service.js';

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken, deviceId } = req.body;
    const result = await authService.authenticateWithGoogle(idToken, deviceId);
    res.status(200).json({ success: true, message: "Login successful", data: result });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    // Notice it uses phoneNumber now!
    await authService.sendOtp(req.body.phoneNumber);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    // Notice it uses phoneNumber now!
    const { phoneNumber, otp, deviceId } = req.body;
    const result = await authService.verifyOtp(phoneNumber, otp, deviceId);
    res.status(200).json({ success: true, message: "Verification successful", data: result });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const tokens = await authService.refreshSession(req.body.refreshToken);
    res.status(200).json({ success: true, message: "Token refreshed", data: tokens });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    await authService.logout(req.user.id, deviceId);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};