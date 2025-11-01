import jwt from 'jsonwebtoken'
import { checkValidEmail } from './inputDataAuth.js';
import 'dotenv'

const tokenMiddl = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code)
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Authorized function" })
    }
}

const queryTokenMiddl = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code)
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Authorized function" })
    }
}



const ResetPassMiddl = (req, res, next) => {
    const { admin_email, email } = req.body;
    let email_id = "";
    try {
        if (email) {
            email_id = email;
        }
        else if (admin_email) {
            email_id = admin_email;
        }
        else {
            throw "Email not given"
        }

        const validEmail = checkValidEmail(email_id)
        if (!validEmail.valid)
            throw validEmail.message
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error })
    }
}

export { tokenMiddl, queryTokenMiddl, ResetPassMiddl }