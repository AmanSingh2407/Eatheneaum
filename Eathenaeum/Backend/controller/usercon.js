import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import paddUserModel from "../models/paddingUserModel.js";
import { OTPExpiry } from "./otpcon.js";
import nodemailer from 'nodemailer'
import { SignUpOTPMail } from '../assets/assets.js'
import fs from 'fs'
import { checkValidAge } from "../meddleware/inputDataAuth.js";
import adminUserModel from "../models/adminUserModel.js";


// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_Code);
}

// Login User
const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user)
            return res.json({ success: false, message: "user doesn't exits" });

        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!isPassMatch)
            return res.json({ success: false, message: "Incorrect Password" });

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}



// Sign-Up User
const SendMailSignUpUser = async (req, res) => {
    const { name, email, phone, password, termCondition } = req.body;
    try {

        const exist = await userModel.findOne({ email: email });
        if (exist)
            return res.json({ success: false, message: "User already Exist" })

        const OldOTP = await paddUserModel.findOne({ email: email })
        if (OldOTP) {
            const sendNextOTP = await OTPExpiry(OldOTP.timestamp)
            if (!sendNextOTP) {
                return res.json({ success: false, message: "Please try after 2 min" })
            }
        }

        const genrateOTP = Math.floor(100000 + Math.random() * 900000);
        const cDate = new Date()
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password.trim(), salt);

        await paddUserModel.findOneAndUpdate(
            { email: email },
            { name: name, email: email, phone: phone, password: hashedPass, otp: genrateOTP, termCondition: termCondition, timestamp: new Date(cDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SECRET_Email_Id,
                pass: process.env.SECRET_Email_Id_Pass,
            },
        });

        const info = transporter.sendMail({
            from: process.env.SECRET_Email_Id,
            to: `${email}`,
            subject: "OTP Code for Account Verification | E-Athenaeum",
            text: "E-Athenaeum",
            html: SignUpOTPMail(name, genrateOTP),
        }, (error, response) => {
            if (error)
                return res.json({ success: true, message: error })

            response.end()
        });

        return res.json({ success: true, message: "OTP Send" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}




// Sign-Up User Verify OTP
const VerifyOTPSignUpUser = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const paddUser = await paddUserModel.findOne({ email: email })
        if (!paddUser)
            return res.json({ success: false, message: "Email Not Exist" })

        if (paddUser) {
            const sendNextOTP = await OTPExpiry(paddUser.timestamp)
            if (sendNextOTP)
                return res.json({ success: false, message: "Expiry OTP" })
        }

        if (paddUser.otp == Number(otp)) {
            const newUser = new userModel({
                name: paddUser.name,
                email: email,
                phone: paddUser.phone,
                password: paddUser.password,
                termCondition: paddUser.termCondition
            })

            const user = await newUser.save();
            const token = createToken(user._id);
            await paddUserModel.findByIdAndDelete(paddUser._id)
            return res.json({ success: true, token });

        } else
            return res.json({ success: false, message: "Wrong OTP" });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// User Data Update 
const userUpdate = async (req, res) => {
    const { name, college, course, department, age, userId } = req.body;
    try {
        const dob = checkValidAge(age)
        const user = await userModel.findById(userId);
        if (!user)
            return res.json({ succese: false, message: "User not exist" })

        const user_ = await userModel.findOneAndUpdate(
            { _id: userId },
            { name: name, college: college, course: course, department: department, dob: dob.date },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )

        res.json({ success: true, user: user_ })
    } catch (error) {
        console.log(error)
        res.json({ succese: false, message: "Error" })
    }
}

// Profile Image change 
const changeUserProfleImg = async (req, res) => {
    const proImg_name = `${req.file.filename}`;
    const { userId, oldImage } = req.body;
    try {
        if (!(oldImage == 'profile_pic.jpg'))
            fs.unlink(`profileImg/${oldImage}`, () => { })

        const user_ = await userModel.findOneAndUpdate({ _id: userId }, { profileName: proImg_name })
        if (user_)
            return res.json({ success: true, message: "change Profile" })
        else
            return res.json({ success: false, message: "user not exist" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// fatch User information 
const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (user) {
            user['password'] = ""; 
            return res.json({ success: true, user: user });
        }
        else
            return res.json({ success: false, message: 'User not exist' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// Fetch all user 
const listAllUser = async (req, res) => {

    try {
        const user = await adminUserModel.findById(req.body.userId)
        if (!(user.role === process.env.SECRET_Id))
            res.json({ success: false, message: 'Error' })

        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


export { LoginUser, SendMailSignUpUser, VerifyOTPSignUpUser, getUser, listAllUser, userUpdate, changeUserProfleImg };