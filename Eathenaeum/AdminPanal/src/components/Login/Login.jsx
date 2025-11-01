import { useContext, useEffect, useState } from 'react';
import './Login.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContexts } from '../../context/contextFile';
import { toast } from 'react-toastify';

const Login = () => {

    const { url, isValidPassword, isValidEmail } = useContext(StoreContexts)
    const [OTP, setOTP] = useState(false)
    const [reset, setReset] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [data, setData] = useState({
        admin_email: "",
        admin_password: "",
        admin_cpassword: "",
        admin_otp: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        Object.keys(data).forEach((key) => {
            if (!(key === 'admin_email'))
                data[key] = data[key].toString().trim();
            else
                data[key] = data[key].toString().toLowerCase().trim();
        })
        if (reset) {
            if (!isValidEmail(data.admin_email) && !isValidPassword(data.admin_password) && !isValidPassword(data.admin_cpassword))
                return
            if (data.admin_password === data.admin_cpassword) {
                const res = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/change/password`, data)
                if (res.data.success) {
                    localStorage.setItem('adminToken', res.data.token)
                    window.location.reload()
                }
                else
                    toast.error(res.data.message)
            } else
                toast.error("please check confirem password not match")

        } else { 
            const res = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/login`, data)
            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.token)
                window.location.reload()
            }
            else
                toast.error(res.data.message)
        }
    }

    const sendResetOTP = async () => {
        if (!OTP)
            setOTP(true)
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/reset`, data)
        if (res.data.success) {
            toast.success(res.data.message)
            sendOTP()
        } else
            toast.error(res.data.message)
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

    const sendOTP = () => {
        setMinutes(1);
        setSeconds(59);
    };

    return (
        <div className='ad-login'>
            <form onSubmit={onSubmit} className='ad-login-container' >
                <h2>Admin Panel</h2>
                <div className='ad-login-inputs'>
                    <input name="admin_email" onChange={onChangeHandler} value={data.admin_email} type='email' placeholder="Your Email" required />
                    {!reset || OTP ?
                        <input name="admin_password" onChange={onChangeHandler} value={data.admin_password} type="text" placeholder="Password" required />
                        : <></>
                    }
                    {OTP ?
                        <><input type="text" name="admin_cpassword" onChange={onChangeHandler} value={data.admin_cpassword} placeholder='Confirem Password' required />
                            <input type="number" name="admin_otp" onChange={onChangeHandler} value={data.admin_otp} placeholder='OTP' required />
                            {seconds > 0 || minutes > 0 ?
                                <p className='login-resetOTP'> Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}: {seconds < 10 ? `0${seconds}` : seconds}</p>
                                :
                                <p className='login-resetOTP text-underline' onClick={sendResetOTP}>Resend OTP</p>
                            }
                        </>
                        : <></>
                    }
                    {reset ? <></> : <p onClick={() => setReset(true)} className='ad-login-reset' >ForgetPassword</p>}
                </div>
                {reset && !OTP ? <button type='button' onClick={sendResetOTP} >Send OTP</button> : <></>}
                {!reset || OTP ? <button type='submit'>{OTP ? "Change Password" : "Login"}</button> : <></>}
                {reset ? <div className='ad-login-reset-back' onClick={() => { setReset(false); setOTP(false) }}><img src={assets.back_icon} /><span>Back to Login</span> </div> : <></>}
            </form>
        </div>
    )
}

export default Login;
