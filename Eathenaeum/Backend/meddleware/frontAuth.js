import { checkValidName, checkValidEmail, checkValidPhone, checkValidPassword, checkValidInput, checkValidAge } from "./inputDataAuth.js";
import jwt from 'jsonwebtoken'
import 'dotenv'

const SignUpMiddl = async (req, res, next) => {
    const { name, email, phone, password, termCondition } = req.body;

    try {
        if (!termCondition) {
            throw "Please accept the terms and conditions.";
        }

        const validations = [
            { check: checkValidName(name), name: "Name" },
            { check: checkValidEmail(email), name: "Email" },
            { check: checkValidPhone(phone), name: "Phone" },
            { check: checkValidPassword(password), name: "Password" }
        ];

        for (let validation of validations) {
            if (!validation.check.valid) {
                throw `${validation.name}: ${validation.check.message}`;
            }
        }

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};



const LoginMiddl = (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validEmail = checkValidEmail(email)
        const ValidPassword = checkValidPassword(password)

        if (!validEmail.valid)
            throw validEmail.message;
        if (!ValidPassword.valid)
            throw ValidPassword.message;

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error })
    }
}


const UpdateUserMiddl = (req, res, next) => {
    const { token } = req.headers;
    const { name, college, course, department, age } = req.body;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        // Validation checks
        const validations = [
            { check: checkValidName(name), name: "Name" },
            { check: checkValidInput(college), name: "College" },
            { check: checkValidInput(course), name: "Course" },
            { check: checkValidInput(department), name: "Department" },
            { check: checkValidAge(age), name: "Age" },
        ];

        for (let validation of validations) {
            if (!validation.check.valid) {
                throw `${validation.name}: ${validation.check.message}`;
            }
        }

        // Verify JWT token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: `Authorization Error: ${error}` });
    }
};


export { SignUpMiddl, LoginMiddl, UpdateUserMiddl }