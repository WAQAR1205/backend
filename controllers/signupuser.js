import user from '../models/user.js';
import {sendToken} from '../Utils/sendToken.js';

export const signupUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: 'kindly fill all the fields',
        status: false,
      });
      return;
    }
    let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailreg.test(email)) {
      return res.status(400).json({
        message: 'kindly fill the correct Email',
        status: false,
      });
    }
    let User = await user.findOne({email}).select('+password');
    if (User) {
      res.status(400).json({
        message: 'user already exist',
        status: false,
      });

      return;
    }
    const otp = Math.floor(Math.random() * 100000);

    const obj_to_sent = {
      name,
      email,
      password,
      otp,
      otp_expiry: new Date(
        Date.now() + process.env.OTP_EXPIRY_DATE * 60 * 1000,
      ),
    };

    User = await user.create(obj_to_sent);

    sendToken(
      res,
      User,
      201,
      'signUp Successfully',
    );
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};
