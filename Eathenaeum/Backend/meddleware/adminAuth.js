import { checkValidName, checkValidEmail, checkValidPhone, checkValidAge, checkValidRole, checkValidPassword, checkValidInput, checkValidStatus, checkValidBankName, checkValidAccount, checkValidIFSCCode } from "./inputDataAuth.js";
import 'dotenv'
import jwt from 'jsonwebtoken'

const AdSignUpMiddl = async (req, res, next) => {
    const { token } = req.headers;
    const {
        ad_name, ad_email, ad_phone, ad_age, ad_gender, ad_role,
        ad_state, ad_city, ad_password, ad_college, ad_course,
        ad_department, ad_startYear, ad_endYear, ad_termCondition
    } = req.body;

    try {
        if (!token) {
            throw "Not Authorized. Please log in again!";
        }

        if (!ad_termCondition) {
            throw "Please accept the terms and conditions.";
        }

        // Validation checks
        const validators = [
            { check: checkValidName(ad_name), name: "Name" },
            { check: checkValidEmail(ad_email), name: "Email" },
            { check: checkValidPhone(ad_phone), name: "Phone" },
            { check: checkValidPassword(ad_password), name: "Password" },
            { check: checkValidAge(ad_age), name: "Age" },
            { check: checkValidInput(ad_gender), name: "Gender" },
            { check: checkValidRole(ad_role), name: "Role" },
            { check: checkValidInput(ad_state), name: "State" },
            { check: checkValidInput(ad_city), name: "City" },
            { check: checkValidInput(ad_college), name: "College" },
            { check: checkValidInput(ad_course), name: "Course" },
            { check: checkValidInput(ad_department), name: "Department" },
            { check: checkValidStatus(ad_startYear, ad_endYear), name: "Status" }
        ];

        for (let validator of validators) {
            if (!validator.check.valid) {
                throw `${validator.name}: ${validator.check.message}`;
            }
        }

        // Verify JWT token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};

const AdLoginMiddl = (req, res, next) => {
    const { admin_email, admin_password } = req.body;

    try {
        const validEmail = checkValidEmail(admin_email);
        const validPassword = checkValidPassword(admin_password);

        if (!validEmail.valid) {
            throw validEmail.message;
        }
        if (!validPassword.valid) {
            throw validPassword.message;
        }

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};

 
export { AdSignUpMiddl, AdLoginMiddl  }