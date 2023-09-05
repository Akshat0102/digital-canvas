import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      res.send({ err: "Name is required!" });
    }
    if (!email) {
      res.send({ err: "Email is required!" });
    }
    if (!password) {
      res.send({ err: "Password is required!" });
    }
    if (!phone) {
      res.send({ err: "Phone is required!" });
    }
    if (!address) {
      res.send({ err: "Address is required!" });
    }

    //check exsisting user
    const exsistingUser = await userModel.findOne({ email });

    if (exsistingUser) {
      res.status(200).send({
        success: true,
        message: "User already registed. Please Login!",
      });
    }

    //register new user
    const hashPass = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      password: hashPass,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully!",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registeration Failed!",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password!",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered!",
      });
    }

    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password is incorrect!",
      });
    }

    //tokens
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Failed!",
      error,
    });
  }
};