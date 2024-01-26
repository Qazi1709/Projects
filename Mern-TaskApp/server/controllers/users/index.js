import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  userRegisterValidations,
  errorMiddleware,
  userLoginValidation,
  errorMiddlewareForLogin,
} from "../../middlewares/validations/index.js";

import userModel from "../../models/UserModel.js";
const router = express.Router();

router.post(
  "/register",
  userRegisterValidations(),
  errorMiddleware,
  async (req, res) => {
    try {
      console.log(req.body);
      let {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        password2,
      } = req.body;
      if (password2 !== password) {
        return res.status(400).json({
          message: "Passwords don't match please try again.",
          status: false,
        });
      }
      let findEmail = await userModel.findOne({ email });
      console.log(findEmail);
      if (findEmail) {
        return res.status(409).json({
          message: "Email already exists please login",
          status: false,
        });
      }
      password = await bcrypt.hash(password, 12);

      let userData = {
        firstName,
        lastName,
        email,
        password,
        mobileNumber,
        tasks: [],
        verificationToken : ""
      };
   
      let userDataPayload = new userModel(userData);
      userDataPayload.save(); 
      res.status(200).json({ message: "User Signed up Successfully!", status: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error Please Try Again!",
        status: false,
      });
    }
  }
);


router.post(
    "/login",
    userLoginValidation(),
    errorMiddlewareForLogin,
    async (req, res) => {
      try {
        console.log(req.body);
        let findEmail = await userModel.findOne({email: req.body.email});
        if (!findEmail) {
          return res.status(401).json({ error: "Email Not Found" });
        }
        const matchPassword = await bcrypt.compare(
          req.body.password,
          findEmail.password
        );
        if (!matchPassword) {
          return res.status(401).json({ error: "incorrect password" });
        }
        let payload = {
          email: req.body.email,
          role: "user",
        };
        let privateKey = "codeforindia";
        var token = jwt.sign(payload, privateKey, { expiresIn: "1d" });
        return res.status(200).json({ message: "User logged in Successfully!", status: true, token });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error Please Try Again!",
          status: false,
        });
      }
    }
  );

 
  
export default router;  