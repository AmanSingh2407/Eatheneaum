import nodemailer from 'nodemailer'
import userModel from '../models/userModel.js';
import OTPModel from '../models/otpModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ResetPasswordOTPMail } from '../assets/assets.js';


// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_Code);
}

// Check OTP Expiry 
const OTPExpiry = async (OTPTime) => {
    try {
        const cDate = new Date()
        var diffValue = (OTPTime - cDate.getTime()) / (1000 * 60);
        if (Math.abs(diffValue) >= 2)
            return true
        return false

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in OTP Expiry" })
    }
}

// Send OTP
const SendMail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user)
            return res.json({ success: false, message: "Doesn't exist in Data Base" })

        const OldOTP = await OTPModel.findOne({ userId: user._id })

        if (OldOTP) {
            const sendNextOTP = await OTPExpiry(OldOTP.timestamp)
            if (!sendNextOTP)
                return res.json({ success: false, message: "Please try after 5 min" })
        }
        const genrateOTP = Math.floor(100000 + Math.random() * 900000);

        await OTPModel.findOneAndUpdate(
            { userId: user._id },
            { otp: genrateOTP, timestamp: new Date() },
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
            subject: "OTP Code for Password Reset | E-Athenaeum",
            text: "E-Athenaeum",
            html: ResetPasswordOTPMail(user.name, genrateOTP),
        }, (error, response) => {
            if (error)
                return res.json({ success: false, message: error })
            response.end()
        });
        return res.json({ success: true, message: "Email successfully send." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


const ResetPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user)
            return res.json({ success: false, message: "Doesn't exist in Data Base" })

        const checkvalidOTP = await OTPModel.findOne({ userId: user._id })
        if (!checkvalidOTP)
            return res.json({ success: false, message: "Error in checkvalidOTP" })

        if (checkvalidOTP) {
            const sendNextOTP = await OTPExpiry(checkvalidOTP.timestamp)
            if (!sendNextOTP)
                return res.json({ success: false, message: "OTP Expiry!" })
        }

        if (checkvalidOTP.otp == otp) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            await userModel.findByIdAndUpdate(user._id, { password: hashedPass })
            await OTPModel.findByIdAndDelete(user._id)
            const token = createToken(user._id);
            return res.json({ success: true, token })
        }
        res.json({ success: false, message: "incorrect OTP!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


export { SendMail, ResetPassword, OTPExpiry };