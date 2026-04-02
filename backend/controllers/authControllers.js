const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.json({
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
  });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Token.create({ userId: user._id, refreshToken });

    res.json({ accessToken, refreshToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
};

// REFRESH TOKEN
exports.refresh = async (req, res) => {
  const { token } = req.body;

  const stored = await Token.findOne({ refreshToken: token });
  if (!stored) return res.status(403).json("Invalid refresh token");

  const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

  const accessToken = generateAccessToken(decoded.id);

  res.json({ accessToken });
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetToken = resetToken;
  await user.save();

  const link = `http://localhost:3000/reset/${resetToken}`;

  await sendEmail(user.email, "Reset Password", link);

  res.json("Email sent");
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token });

  user.password = req.body.password;
  user.resetToken = undefined;

  await user.save();

  res.json("Password reset success");
};