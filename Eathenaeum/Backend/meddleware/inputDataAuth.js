const checkValidName = (name) => {
    if (!name) {
        return { valid: false, message: "Fill Name" };
    }
    // Trim the name to remove leading/trailing spaces
    name = name.trim();

    // Regular expression to match valid names (letters, spaces, hyphens, and apostrophes)
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    if (!nameRegex.test(name))
        return { valid: false, message: "Invalid name. Only letters, spaces, hyphens, and apostrophes are allowed." };

    // Ensure the name is not empty and has a reasonable length (e.g., between 2 and 50 characters)
    if (name.length < 2 || name.length > 50)
        return { valid: false, message: "Invalid name length. Name should be between 2 and 50 characters long." };

    return { valid: true, message: "Valid name." };
};




const checkValidEmail = (email) => {
    if (!email) {
        return { valid: false, message: "Fill Email Id" };
    }

    email = email.trim()
    // Improved regular expression to match valid email addresses
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email))
        return { valid: false, message: "Email address format." };
    if (email.length <= 6)
        return { valid: false, message: "Email address is too short. Must be more than 6 characters." };
    if (email.length >= 40)
        return { valid: false, message: "Email address is too long. Must be less than 40 characters." };

    return { valid: true, message: "Valid email address." };
};



const checkValidPhone = (phone) => {
    if (!phone) {
        return { valid: false, message: "Fill Phone Number" };
    }

    phone = phone.trim()
    const pattern = /^\d{10}$/;
    if (!pattern.test(phone))
        return { valid: false, message: "Invalid Phone No." };
    return { valid: true, message: "Valid Phone No." }
}



const checkValidAge = (age) => {
    if (!age) {
        return { valid: false, message: "Fill Age" };
    }

    age = age.trim()
    // Convert age to a number if it's not already
    const ageNum = Number(age);

    // Check if age is a valid number, not fractional, and within a reasonable range
    if (isNaN(ageNum) || !Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 90)
        return { valid: false, message: "Please enter a valid age between 1 and 90 years." };

    // Calculate the date of birth based on the current date and the provided age
    const today = new Date();
    const birthYear = today.getFullYear() - ageNum;
    const birthMonth = today.getMonth();
    const birthDay = today.getDate();

    const dob = new Date(birthYear, birthMonth, birthDay);

    return { valid: true, message: "Valid age.", date: dob };
};


const checkValidRole = (role) => {
    if (!role) {
        return { valid: false, message: "Fill User Role" };
    }
    
    if (!(role === 'admin user'))
        return { valid: false, message: "Invalid role" }

    return { valid: true, message: "Valid role" }
}

const checkValidPassword = (password) => {
    if (!password) {
        return { valid: false, message: "Fill Password" };
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 20;

    if (!isValidLength) {
        return { valid: false, message: "Password must be between 8 and 20 characters long." };
    }
    if (!hasUppercase) {
        return { valid: false, message: "Password must contain at least one uppercase letter." };
    }
    if (!hasLowercase) {
        return { valid: false, message: "Password must contain at least one lowercase letter." };
    }
    if (!hasDigit) {
        return { valid: false, message: "Password must contain at least one digit." };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character." };
    }

    return { valid: true, message: "Valid password." };
};



const checkValidOTP = (otp) => {
    if (!otp) {
        return { valid: false, message: "Fill OTP" };
    }
    otp = otp.trim()
    // Regular expression to match exactly 6 digits
    const otpRegex = /^\d{6}$/;

    if (!otpRegex.test(otp)) {
        return { valid: false, message: "Invalid OTP. The OTP must be exactly 6 digits." };
    }

    return { valid: true, message: "Valid OTP." };
};


const checkValidInput = (data) => {
    if (!data) {
        return { valid: false, message: "Input Invalid Input" };
    }

    data = data.trim()
    // Regular expression to check for allowed characters (letters, hyphens, dots, and whitespace)
    const regex = /^[A-Za-z\s.-]+$/;

    // Trim the input to remove leading/trailing whitespace and check if it's empty
    if (data.trim() === "") {
        return { valid: false, message: "Input cannot be empty." };
    }

    // Check if the input matches the regular expression
    if (!regex.test(data)) {
        return { valid: false, message: "Input can only contain letters, hyphens, dots, and whitespace." };
    }

    return { valid: true, message: "Input is valid." };
};


const checkValidStatus = (startYear, endYear) => {

    if (!startYear && !endYear) {
        return { valid: false, message: "InValid year" }
    }
    // Regular expression to check if the input is exactly 4 digits
    const regex = /^\d{4}$/;
    // Check if the input matches the regular expression
    if (!regex.test(startYear) || !regex.test(endYear))
        return { valid: false, message: "Invalid year" };

    return { valid: true, message: "Valid year" };
}

const checkValidBankName = (name) => {
    if (!name)
        return false 

    name = name.trim()
    // Check if name is a string and not empty
    if (typeof (name) !== 'string' || name.trim() === '')
        return false;

    name = name.trim();
    if (name.length < 2 || name.length > 50)
        return false;

    const validPattern = /^[A-Za-z\s]+$/;
    if (!validPattern.test(name))
        return false;

    return true;
}

const checkValidAccount = (accountNumber) => {
    if (!accountNumber)
        return false 

    accountNumber = accountNumber.trim()
    accountNumber = accountNumber.toString().trim();
    if (accountNumber.length < 8 || accountNumber.length > 20)
        return false;

    const validPattern = /^\d+$/;
    if (!validPattern.test(accountNumber))
        return false;

    return true;
}

const checkValidIFSCCode = (ifscCode) => {
    if (!ifscCode)
        return false 

    ifscCode = ifscCode.trim()
    if (typeof (ifscCode) !== 'string')
        return false;

    ifscCode = ifscCode.trim();
    if (ifscCode.length !== 11)
        return false;

    // Check the format: First 4 chars should be letters, 5th should be '0', last 6 chars should be alphanumeric
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscPattern.test(ifscCode))
        return false;

    return true;

}

export { checkValidName, checkValidEmail, checkValidPhone, checkValidAge, checkValidRole, checkValidPassword, checkValidOTP, checkValidInput, checkValidStatus, checkValidBankName, checkValidAccount, checkValidIFSCCode }