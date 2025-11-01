import express from 'express'
import { AddAdminUser, adminUserAccountVerify, AdminUserChangeProImg, AdminUserDetails, AdminUserList, AdminUserLogin, AdminUserResetPassOTPSend, AdminUserResetPassword, AdminUserSendOTP } from '../controller/adminUserCon.js'
import { AdLoginMiddl, AdSignUpMiddl } from '../meddleware/adminAuth.js'
import { queryTokenMiddl, ResetPassMiddl, tokenMiddl } from '../meddleware/tokenAuth.js'
import multer from 'multer'
import path from 'path'


const adminUser = express.Router()


// Image Storage in the file
const StorageAdImg = multer.diskStorage({
    destination: 'uploads/profile_admin',
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname);
    }
})

const uploadAdProfile = multer({
    storage: StorageAdImg,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
    limits: {
        fileSize: 1000000 // 1 MB
    }
})


adminUser.post('/verify', AdSignUpMiddl, AdminUserSendOTP)
adminUser.post('/register', AdSignUpMiddl, AddAdminUser)
adminUser.post('/login', AdLoginMiddl, AdminUserLogin)
adminUser.post('/reset', ResetPassMiddl, AdminUserResetPassOTPSend)
adminUser.post('/change/password', AdLoginMiddl, AdminUserResetPassword)
adminUser.get('/details', queryTokenMiddl, AdminUserDetails)
adminUser.post('/change/profile', uploadAdProfile.single('image'), tokenMiddl, AdminUserChangeProImg);

adminUser.get('/userlist', queryTokenMiddl, AdminUserList)
adminUser.post('/account-verify', tokenMiddl, adminUserAccountVerify)



export default adminUser;