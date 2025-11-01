import './forgetPassword.css'
import { assets } from '../../assets/assets';
import propTypes from 'prop-types'
import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../context/storecontextfile';
import axios from 'axios';
import { toast } from 'react-toastify';



const ForgetPasword = ({ setLoginShow, setCurState }) => {

    const { url, setToken, userData, overflowCon, isValidOTP, isValidEmail, isValidPassword } = useContext(StoreContext)

    const [sendOTP, setSendOTP] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [data, setData] = useState({
        email: "",
        password: "",
        cpassword: "",
        otp: ""

    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const OnsendOTP = async () => {
        Object.keys(data).forEach((key) => {
            if (!(key === 'password') && !(key === 'cpassword') && !(key === 'otp'))
                data[key] = data[key].toString().toLowerCase().trim();
            else
                data[key] = data[key].toString().trim();
        })
        
        if (isValidEmail(data.email)) {
            console.log(data)
            const response = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/resetpassword`, data);
            if (response.data.success) {
                setTime()
                setSendOTP(true)
            }
            else {
                toast.error(response.data.message);
            }
        }
    }

    const onForgetPassword = async (event) => {
        event.preventDefault()
        Object.keys(data).forEach((key) => {
            if (!(key === 'password') && !(key === 'cpassword') && !(key === 'otp'))
                data[key] = data[key].toString().toLowerCase().trim();
            else
                data[key] = data[key].toString().trim();
        }) 
        if (isValidEmail(data.email) && isValidOTP(data.otp) && isValidPassword(data.password) && isValidPassword(data.cpassword)) {
            if (!(data.password === data.cpassword))
                toast.error("Password does not match");

            const response = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/resetpassword/verify`, data);
            if (response.data.success) {
                await setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                overflowCon();
                setLoginShow(false);
                userData(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const setTime = () => {
        setMinutes(1);
        setSeconds(59);
    };

    return (
        <div className='forgetPassword login-container'>
            <form className='forgetPassword-from' onSubmit={onForgetPassword} >
                <div className="login-title ">
                    <h2>Forget Password</h2>
                    <img onClick={() => setLoginShow(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-inputs forgetPassword-from-input'>
                    <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email' autoComplete='off' required />
                    {
                        sendOTP ?
                            <>
                                <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='New Password' autoComplete='off' required />
                                <input name='cpassword' onChange={onChangeHandler} value={data.cpassword} type="text" placeholder='Confirm Password' autoComplete='off' required />
                                <input name='otp' onChange={onChangeHandler} value={data.otp} type="number" placeholder='OTP' required />
                                {seconds > 0 || minutes > 0 ? (
                                    <p>
                                        Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                ) : (
                                    <div className='d-flex'> <p>Did not recieve code?</p>
                                        <button className='login-resend-OTP-btn' onClick={OnsendOTP} >Resend OTP</button>
                                    </div>
                                )}
                            </>
                            : <></>
                    }
                    {
                        sendOTP
                            ? <button type='submit' className='login-container-btn'> Change Password </button>
                            : <></>
                    }
                </div>
            </form>
            {sendOTP ? <></> :
                <button type='button' className='login-container-btn' onClick={OnsendOTP} > Send OTP </button>
            }

            <div className='forgetPassword-from-back' onClick={() => setCurState('Login')}><img src={assets.back_icon} /><span>Back to Login</span> </div>
        </div>
    )
}

ForgetPasword.propTypes = {
    setLoginShow: propTypes.func,
    setCurState: propTypes.func
}

export default ForgetPasword
