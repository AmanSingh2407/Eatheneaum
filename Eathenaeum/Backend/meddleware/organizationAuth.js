import { checkValidAccount, checkValidBankName, checkValidEmail, checkValidIFSCCode, checkValidPassword } from "./inputDataAuth.js";
import jwt from 'jsonwebtoken'
import 'dotenv'

const createOrgMidd = (req, res, next) => {
    const {
        org_orgName,
        org_m1LEmail, org_m2Email, org_m3Email, org_m4Email, org_m5Email,
        org_m1LPassword, org_m2Password, org_m3Password, org_m4Password, org_m5Password,
        org_termCondition
    } = req.body;

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    try {
        if (!org_orgName || !org_m1LEmail || !org_m1LPassword) {
            throw "Compulsory fields are required";
        }

        if (!org_termCondition) {
            throw "Please accept Terms & Conditions";
        }

        // Array of member emails and passwords for validation
        const members = [
            { email: org_m1LEmail, password: org_m1LPassword },
            { email: org_m2Email, password: org_m2Password },
            { email: org_m3Email, password: org_m3Password },
            { email: org_m4Email, password: org_m4Password },
            { email: org_m5Email, password: org_m5Password }
        ];

        // Validate emails and passwords
        members.forEach((member, index) => {
            if (member.email && member.password) {
                const validEmail = checkValidEmail(member.email);
                const validPassword = checkValidPassword(member.password);

                if (!validEmail.valid) {
                    throw `Member ${index + 1} Email: ${validEmail.message}`;
                }
                if (!validPassword.valid) {
                    throw `Member ${index + 1} Password: ${validPassword.message}`;
                }
            }
        });

        // Decode and verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};



const updateOrgMidd = (req, res, next) => {
    const {
        org_OrgName, org_LeaderEmail, org_LeaderPass,
        org_NLeaderEmail, org_NLeaderPass, org_BankName,
        org_Account, org_IFSCCode
    } = req.body;

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    try {

        if (org_OrgName)
            if (org_OrgName.length >= 70)
                throw "Organization name exceeds 70 characters"

        // Validate Leadership Details
        if (org_LeaderEmail && org_LeaderPass && org_NLeaderEmail && org_NLeaderPass) {
            const validations = [
                { result: checkValidEmail(org_LeaderEmail), field: "Leader Email" },
                { result: checkValidPassword(org_LeaderPass), field: "Leader Password" },
                { result: checkValidEmail(org_NLeaderEmail), field: "New Leader Email" },
                { result: checkValidPassword(org_NLeaderPass), field: "New Leader Password" },
            ];

            validations.forEach(({ result, field }) => {
                if (!result.valid) throw `${field}: ${result.message}`;
            });
        }

        // Validate Bank Details
        if (!org_BankName && !checkValidBankName(org_BankName))
            throw "Invalid Bank Name";
        if (org_Account && !checkValidAccount(org_Account))
            throw "Invalid Account Number";
        if (org_IFSCCode && !checkValidIFSCCode(org_IFSCCode))
            throw "Invalid IFSC Code";

        // Verify JWT Token
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
            req.body.userId = token_decode.id;
        } catch (err) {
            throw "Invalid or expired token. Please log in again.";
        }

        // Proceed to the next middleware
        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};


const removeOrgMemberMidd = (req, res, next) => {
    const { reEmail, rePassword, reOption } = req.body;
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    try {
        // Validate operation type (reOption)
        const validOptions = ['add', 'remove'];
        if (!validOptions.includes(reOption)) {
            throw "Invalid operation. Please specify either 'add' or 'remove'.";
        }

        // Validate Email and Password
        const emailValidation = checkValidEmail(reEmail);
        const passwordValidation = checkValidPassword(rePassword);

        if (!emailValidation.valid) {
            throw `Invalid Email: ${emailValidation.message}`;
        }
        if (!passwordValidation.valid) {
            throw `Invalid Password: ${passwordValidation.message}`;
        }

        // Verify JWT Token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
        req.body.userId = token_decode.id;

        // Proceed to the next middleware
        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};



export { createOrgMidd, updateOrgMidd, removeOrgMemberMidd };