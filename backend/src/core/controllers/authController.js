import jwt from 'jsonwebtoken';
import User from '#models/User.js';
import asyncHandler from '#utils/async-handler.js';
import { sendCreated, sendOk, sendBadRequest, sendUnauthorized } from '#utils/apiResponse.js';
import ApiError from '#utils/asyncError.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return sendBadRequest(res, 'Please provide username, email, and password');
  }

  if (password.length < 6) {
    return sendBadRequest(res, 'Password must be at least 6 characters');
  }

  // Check if user exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    if (existingUser.email === email) {
      return sendBadRequest(res, 'Email already registered');
    }
    return sendBadRequest(res, 'Username already taken');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  sendCreated(
    res,
    'User registered successfully',
    {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        activeModules: user.activeModules,
      },
      token,
    }
  );
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return sendBadRequest(res, 'Please provide email and password');
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return sendUnauthorized(res, 'Invalid credentials');
  }

  // Check password
  const isPasswordCorrect = await user.isCorrectPassword(password, user.password);

  if (!isPasswordCorrect) {
    return sendUnauthorized(res, 'Invalid credentials');
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  sendOk(
    res,
    'Login successful',
    {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        activeModules: user.activeModules,
      },
      token,
    }
  );
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  sendOk(res, 'User fetched successfully', {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      activeModules: user.activeModules,
      createdAt: user.createdAt,
    },
  });
});

/**
 * @route   PATCH /api/auth/modules
 * @desc    Update active modules
 * @access  Private
 */
export const updateModules = asyncHandler(async (req, res, next) => {
  const { activeModules } = req.body;

  const validModules = ['tasks', 'finance', 'notes'];

  if (!Array.isArray(activeModules)) {
    return sendBadRequest(res, 'activeModules must be an array');
  }

  const invalidModules = activeModules.filter((mod) => !validModules.includes(mod));

  if (invalidModules.length > 0) {
    return sendBadRequest(res, `Invalid modules: ${invalidModules.join(', ')}`);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { activeModules },
    { new: true, runValidators: true }
  );

  sendOk(res, 'Modules updated successfully', {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      activeModules: user.activeModules,
    },
  });
});

export default { register, login, getMe, updateModules };
