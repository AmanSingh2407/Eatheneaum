const SignUpOTPMail = (name, otp) => {

    return (`<div>
            <p>Dear <b>${name}</b>,</p>
            <h3>Here's Your OTP: <b>${otp}</b></h3>
            <p> Thank you for registering with E-Athenaeum. <br>
                To complete your verification process, please use the above One-Time Password (OTP).</p>
            <p> Please enter this code on the verification page within the next time limit of 2 minutes to complete your
                process.</p>
            <div>For any queries,</div>
            <a href="http://localhost:1573">eathenaeum10@gmail.com</a>
            <div>
                <p>Regards,</p>
                <p><b>E-Athenaeum Team</b></p>
                <p>eathenaeum10@gmail.com</p> 
                <a href="http://localhost:1573">www.eathenaeum.com</a>
            </div> `)
}


const ResetPasswordOTPMail = (name, otp) => {

    return (
        `<div>
            <p>Hello <b>${name}</b>,</p>
            <h3>Here's Your OTP: <b>${otp}</b></h3>
            <p> We received a request to reset the password for your account.
                To proceed with the password reset, please use the above One-Time Password (OTP).</p>
            <p> Please enter the code on the password reset page within the next time limit of 5 minutes to reset your password.</p>
            <div>If you didn't request a new password, let us know, support@eathenaeum .</div>
            <a href="http://localhost:1573">eathenaeum10@gmail.com</a>
            <div>
                <p>Regards,</p>
                <p><b>E-Athenaeum Team</b></p>
                <p>eathenaeum10@gmail.com</p> 
                <a href="http://localhost:1573">www.eathenaeum.com</a>
            </div>
        </div>`  )
}


const AdminUserSignUpMail = (name, otp) => {

    return (
        `<div>
            <p>Dear <b>${name}</b>,</p>
            <p>Welcome to the Eathenaeum Admin Panel!</p>
            <p>To complete your registration and secure your account, please verify your email address by entering the One-Time Password (OTP) provided below: </p>
            <h3>Your OTP: <b>${otp}</b></h3> 
            <p>This OTP is valid for the next 2 minutes. Please ensure that you enter the code correctly in the verification field on the Eathenaeum Admin Panel.</p>
            <p>If you did not initiate this request or have any concerns, please contact our support team immediately eathenaeum10@gmail.com</p>
            <p>Thank you for joining us, and we look forward to having you onboard!</p>
     
            <div>
                <p>Best regards,</p>
                <p><b>E-Athenaeum Team</b></p>
                <p>eathenaeum10@gmail.com</p> 
                <a href="http://localhost:1573">www.eathenaeum.com</a>
            </div> `
    )
}

const AdminUserResetMail = (name, otp) => {


    return (
        `<div>
            <p>Dear <b>${name}</b>,</p>
            <p>We received a request to reset the password for your Eathenaeum Admin Panel account. </br>
             To proceed, please use the One-Time Password (OTP) provided below:</p>
            <h3>Your OTP: <b>${otp}</b></h3>
            <p>This OTP is valid for the next 2 minutes. Please enter this code in the admin panel to complete the password reset process.</p>
            <div>If you did not request a password reset, please ignore this email or contact our support team immediately at eathenaeum10@gmail.com</div>
            <p>For your security, please do not share this OTP with anyone.</p>
            <p>Thank you for being a valued member of the Eathenaeum community!</p>
             
            <div>
                <p>Best regards,</p>
                <p><b>E-Athenaeum Team</b></p>
                <p>eathenaeum10@gmail.com</p> 
                <a href="http://localhost:1573">www.eathenaeum.com</a>
            </div>
        </div>`  )
}


export { SignUpOTPMail, ResetPasswordOTPMail, AdminUserSignUpMail, AdminUserResetMail };