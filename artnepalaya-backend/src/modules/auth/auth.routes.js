import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../middlewares/validator.js';
import { authGuard } from '../../middlewares/authGuard.js';
import * as validation from './auth.validation.js';
import * as controller from './auth.controller.js';

const router = Router();

// === Strict Rate Limiters based on API Contract ===

// Prevents SMS Toll Fraud (Max 3 OTP requests per hour per IP)
const otpSendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, 
  message: { 
    success: false, 
    error: { code: "RATE_LIMIT", message: "Too many OTP requests. Try again later." }
  }
});

// Prevents Brute Forcing OTPs (Max 5 attempts per 15 minutes per IP)
const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: { 
    success: false, 
    error: { code: "RATE_LIMIT", message: "Too many failed attempts. Try again later." }
  }
});

// === Public Routes ===
router.post('/google', validate(validation.googleAuthSchema), controller.googleLogin);
router.post('/otp/send', otpSendLimiter, validate(validation.sendOtpSchema), controller.sendOtp);
router.post('/otp/verify', otpVerifyLimiter, validate(validation.verifyOtpSchema), controller.verifyOtp);
router.post('/refresh', validate(validation.refreshSchema), controller.refreshToken);

// === Protected Routes ===
router.post('/logout', authGuard, validate(validation.logoutSchema), controller.logout);

export default router;