import adminOTPUserModel from "../models/adminOTPUserModel.js";
import adminUserModel from "../models/adminUserModel.js";
import { OTPExpiry } from "./otpcon.js";
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import { AdminUserResetMail, AdminUserSignUpMail } from "../assets/assets.js";
import adminUserResetModel from "../models/adminUserResetPassModel.js";
import userModel from "../models/userModel.js";
import { checkValidAge } from "../meddleware/inputDataAuth.js";
import fs from 'fs'
import OrgModel from "../models/organizationModel.js";



// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_Code);
}

// Sign-Up Admin User 
const AdminUserSendOTP = async (req, res) => {
    const { ad_name, ad_email, ad_termCondition, userId } = req.body;
    try {
        const frontEndUser = await userModel.findById(userId)
        if (!frontEndUser)
            return res.json({ success: false, message: "User not exist" })

        const exist = await adminUserModel.findOne({ email: ad_email });
        if (exist)
            return res.json({ success: false, message: "User already Exist" })

        const OldOTP = await adminOTPUserModel.findOne({ email: ad_email })
        if (OldOTP) {
            const sendNextOTP = await OTPExpiry(OldOTP.timestamp)
            if (!sendNextOTP) {
                return res.json({ success: false, message: "Please try after 2 min" })
            }
        }

        const genrateOTP = Math.floor(100000 + Math.random() * 900000);
        const cDate = new Date()

        await adminOTPUserModel.findOneAndUpdate(
            { email: ad_email },
            { email: ad_email, otp: genrateOTP, termCondition: ad_termCondition, timestamp: new Date(cDate.getTime()) },
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
            to: `${ad_email}`,
            subject: "OTP Code for Account Verification | E-Athenaeum",
            text: "E-Athenaeum",
            html: AdminUserSignUpMail(ad_name, genrateOTP),
        }, (error, response) => {
            if (error)
                return res.json({ success: false, message: error })
            response.end()
        });

        res.json({ success: true, message: "OTP Send" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// Sign-Up User Verify OTP and add Data Base
const AddAdminUser = async (req, res) => {
    const { ad_name, ad_email, ad_phone, ad_gender, ad_age, ad_role, ad_city, ad_state, ad_college, ad_course, ad_department, ad_startYear, ad_endYear, ad_termCondition, ad_otp, ad_password, userId } = req.body;
    const status = `${ad_startYear}-${ad_endYear}`;
    try {

        if (!(ad_role === 'admin user'))  
            return res.json({ success: false, message: "User Role : Admin user only" })

        const dob = checkValidAge(ad_age)
        const frontEndUser = await userModel.findById(userId)
        if (!frontEndUser)
            return res.json({ success: false, message: "User not exist" })


        const paddAdminUser = await adminOTPUserModel.findOne({ email: ad_email })
        if (!paddAdminUser)
            return res.json({ success: false, message: "Email Not Exist" })

        if (paddAdminUser) {
            const sendNextOTP = await OTPExpiry(paddAdminUser.timestamp)
            if (sendNextOTP)
                return res.json({ success: false, message: "Expiry OTP" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(ad_password, salt);

        if (paddAdminUser.otp == Number(ad_otp)) {
            const newUser = new adminUserModel({
                frontUser: userId,
                name: ad_name,
                email: ad_email,
                phone: ad_phone,
                gender: ad_gender,
                dob: dob.date,
                role: ad_role,
                city: ad_city,
                state: ad_state,
                college: ad_college,
                course: ad_course,
                department: ad_department,
                status: status,
                termCondition: ad_termCondition,
                password: hashedPass
            })
            const user = await newUser.save();
            await userModel.findByIdAndUpdate({ _id: userId }, { role: "panding" })
            await adminOTPUserModel.findByIdAndDelete(paddAdminUser._id)
            return res.json({ success: true, message: "Account created" });

        } else
            return res.json({ succese: false, message: "Wrong OTP" })

    } catch (e) {
        console.log(e);
        res.json({ succese: false, message: "Error" })
    }
}


const AdminUserLogin = async (req, res) => {
    const { admin_email, admin_password } = req.body;
    try {
        const user = await adminUserModel.findOne({ email: admin_email });
        if (!user)
            return res.json({ success: false, message: "user doesn't exits" });

        if (!user.verify)
            return res.json({ success: false, message: "User not verify" });

        const isPassMatch = await bcrypt.compare(admin_password, user.password)
        if (!isPassMatch)
            return res.json({ success: false, message: "Incorrect Password" });

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const AdminUserResetPassOTPSend = async (req, res) => {
    const { admin_email } = req.body;
    try {

        const user = await adminUserModel.findOne({ email: admin_email })
        if (!user)
            return res.json({ succese: false, message: "User Does not exist" })

        const OldOTP = await adminUserResetModel.findOne({ userId: user._id })
        if (OldOTP) {
            const sendNextOTP = await OTPExpiry(OldOTP.timestamp)
            if (!sendNextOTP)
                return res.json({ success: false, message: "Please try after 2 min" })
        }

        const genrateOTP = Math.floor(100000 + Math.random() * 900000);
        const cDate = new Date()

        await adminUserResetModel.findOneAndUpdate(
            { userId: user._id },
            { email: admin_email, otp: genrateOTP, timestamp: new Date(cDate.getTime()) },
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
            from:  process.env.SECRET_Email_Id,
            to: `${admin_email}`,
            subject: "Reset Your Password - Eathenaeum Admin Panel",
            text: "E-Athenaeum",
            html: AdminUserResetMail(user.name, genrateOTP),
        }, (error, response) => {
            if (error)
                return res.json({ success: false, message: error })
            response.end()
        });

        res.json({ success: true, message: "OTP Send" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


const AdminUserResetPassword = async (req, res) => {
    const { admin_email, admin_password, admin_otp } = req.body;
    try {
        const user = await adminUserModel.findOne({ email: admin_email })
        if (!user)
            return res.json({ success: false, message: "Doesn't exist in Data Base" })

        const checkOTP = await adminUserResetModel.findOne({ userId: user._id })
        if (!checkOTP)
            return res.json({ success: false, message: "OTP Doesn't Exist" })


        if (checkOTP) {
            const sendNextOTP = await OTPExpiry(checkOTP.timestamp)
            if (sendNextOTP)
                return res.json({ success: false, message: "OTP Expiry!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(admin_password, salt);

        if (checkOTP.otp === Number(admin_otp)) {
            await adminUserModel.findByIdAndUpdate(user._id, { password: hashedPass })
            const token = createToken(user._id);
            await adminUserResetModel.findByIdAndDelete(user._id)
            return res.json({ success: true, token })
        }
        res.json({ success: false, message: "incorrect OTP!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


const AdminUserChangeProImg = async (req, res) => {
    const proImg_name = `${req.file.filename}`;
    const { userId, oldImage } = req.body;
    try {
        if (!(oldImage == 'profile_pic.jpg'))
            fs.unlink(`adminUserProfileImg/${oldImage}`, () => { })

        const user = await adminUserModel.findByIdAndUpdate(userId, { profilePhoto: proImg_name })
        if (user)
            return res.json({ success: true, data: user })
        else
            return res.json({ success: true, data: "User not exist" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}



// -------------------  Organizations Details -----------------------------------


const fetchData = async (data, userId) => {
    // Convert all IDs to strings
    const stringIds = data.map(id => id.toString());

    // Count occurrences of userId
    const count = stringIds.filter(id => id === userId).length;

    try {
        // Fetch all users in one database query
        const users = await adminUserModel.find({ _id: { $in: stringIds } });

        // Map the users to the desired format
        const userList = users.map(user => ({
            _id: user._id,
            profilePhoto: user.profilePhoto,
            name: user.name,
            email: user.email,
            phone: user.phone
        }));

        return { count, data: userList };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch user data');
    }
};


const getOrgDetails = async (user) => {

    const organization = await OrgModel.findById(user.organization)
    if (!organization)
        return { valid: false, message: "Organization not exist" }
    const userData = await fetchData(organization.members, user._id.toString().replace(/new ObjectId\('(.+)'\)/, '$1'))
    organization['members'] = userData.data;

    if (!userData.count)
        return { valid: false, message: "you are not part of Organization." }

    return { valid: true, data: organization }
}


// -------------------  END :  Organizations Details -----------------------------------


const AdminUserDetails = async (req, res) => {
    try {
        // Fetch user by ID
        const user = await adminUserModel.findById(req.body.userId);
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Fetch organization details if applicable
        if (user.organization && user.verify) {
            const resData = await getOrgDetails(user);
            if (!resData.valid) {
                return res.json({ success: false, message: resData.message });
            }
            user.organization = resData.data; // Attach organization details to user object
        }
        // Send success response
        user['password'] = ''
        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error); // Log the specific error
        res.json({ success: false, message: 'Error' });
    }
};



const AdminUserList = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "user not exist" })

        if (!(user.role === process.env.SECRET_Id))
            return res.json({ success: false, message: "Error" })

        const users = await adminUserModel.find({})
        res.json({ success: true, data: users })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}


const adminUserAccountVerify = async (req, res) => {
    const { userId, id } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "you are not Authorized" }) 

        if (!(user.role === process.env.SECRET_Id))
            return res.json({ success: false, message: "Error" })
      

        const person = await adminUserModel.findById(id)
        if (!person)
            return res.json({ success: false, message: "user not exist" }) 

        if (person.verify) {
            await adminUserModel.findByIdAndUpdate(id, { verify: false })
            await userModel.findByIdAndUpdate(person.frontUser, { role: "panding" })
            return res.json({ success: true, message: "user verify : false" })
        }
        else {
            await adminUserModel.findByIdAndUpdate(id, { verify: true })
            await userModel.findByIdAndUpdate(person.frontUser, { role: "adminUser" })
            return res.json({ success: true, message: "user verify : true" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}


export { AddAdminUser, AdminUserSendOTP, AdminUserLogin, AdminUserResetPassOTPSend, AdminUserResetPassword, AdminUserDetails, AdminUserChangeProImg, AdminUserList, adminUserAccountVerify };