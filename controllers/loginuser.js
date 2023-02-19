import user from '../models/user.js';
import {sendToken} from '../Utils/sendToken.js';

const VerfiyUser = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const user = await user.findById(req.user._id);
    if (user.otp != otp || user.otp_expiry < Date.now()) {
      res.status(400).json({
        message: 'Link expired',
        status: false,
      });
      return;
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();
    sendToken(res, user, 200, 'User Verified');
  } catch (error) {
    res.status(400).json({
      message: `Error ${error}`,
      status: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', null, {
        expires: new Date(Date.now()),
      })
      .json({
        message: 'Log-out Successfully',
        status: true,
      });
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};
const loginuser = async (req, res) => {
  try {
    const {email, password} = req.body;

    let user = await user.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: 'please enter valid Email or Password',
        status: false,
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Email or password countnt recornized',
        status: false,
      });
    }

    sendToken(res, user, 200, 'Log-in Successfully');
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    let user = await user.findById(req.user._id);
    if (user) {
      sendToken(res, user, 200, `welcome ${user.name}`);
    }
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

export {loginuser, VerfiyUser, logout, getMyProfile};
