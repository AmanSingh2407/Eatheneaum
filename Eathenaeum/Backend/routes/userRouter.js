import express from 'express'
import { LoginUser, VerifyOTPSignUpUser, SendMailSignUpUser, getUser, listAllUser, userUpdate, changeUserProfleImg } from '../controller/usercon.js'
import { SendMail, ResetPassword } from '../controller/otpcon.js'
import multer from 'multer';
import { LoginMiddl, SignUpMiddl, UpdateUserMiddl } from '../meddleware/frontAuth.js';
import { tokenMiddl, ResetPassMiddl, queryTokenMiddl } from '../meddleware/tokenAuth.js';
import path from 'path'

const userRouter = express.Router();


// Image Storage in the file
const StorageImg = multer.diskStorage({
    destination: 'uploads/profile_front',
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname);
    }
})

const uploadProfile = multer({
    storage: StorageImg,
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
 

userRouter.post('/signup', SignUpMiddl, SendMailSignUpUser);
userRouter.post('/signup/verify', SignUpMiddl, VerifyOTPSignUpUser);
userRouter.post("/login", LoginMiddl, LoginUser);
userRouter.get("/info", queryTokenMiddl, getUser)
userRouter.get('/listuser', queryTokenMiddl, listAllUser);
userRouter.post('/update', UpdateUserMiddl, userUpdate)
userRouter.post('/resetpassword', ResetPassMiddl, SendMail)
userRouter.post('/resetpassword/verify', LoginMiddl, ResetPassword)
userRouter.post('/profileicon', uploadProfile.single('image'), tokenMiddl, changeUserProfleImg)

export default userRouter;
