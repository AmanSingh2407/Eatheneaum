import { useContext, useState, useEffect } from 'react';
import './login.css'
import PropType from 'prop-types'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storecontextfile';
import axios from 'axios'
import ForgetPasword from '../forgetPassword/forgetPasword';
import { toast } from 'react-toastify';

const Login = ({ setLoginShow, curState, setCurState }) => {


    const { url, setToken, userData, overflowCon, isValidOTP, isValidName, isValidEmail, isValidPassword, isValidPhoneNumber } = useContext(StoreContext)
    const [OTPSignUp, setOTPSignUp] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        otp: "",
        termCondition: false
    })

    const sendOTP = () => {
        setMinutes(1);
        setSeconds(59);
    };


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (!(name === 'termCondition'))
            setData(data => ({ ...data, [name]: value }));
        if (name === 'termCondition')
            setData(data => ({ ...data, [name]: document.getElementById('signupcheckbox').checked })); 
    }

    const onLogin = async (event) => {
        event.preventDefault()
        Object.keys(data).forEach((key) => {
            if (!(key === 'password'))
                data[key] = data[key].toString().toLowerCase().trim();
            else
                data[key] = data[key].toString().trim();
        })
        let response;
        if (isValidEmail(data.email) && isValidPassword(data.password)) {
            if (curState == 'Login') {
                response = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/login`, data);
                if (response.data.success) {
                    await setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    overflowCon();
                    setLoginShow(false);
                    userData(response.data.token);
                } else
                    toast.error(response.data.message);
            }
            else {
                if (!data.termCondition)
                    return toast.error("Please term and Condition")

                if (isValidName(data.name) && isValidPhoneNumber(data.phone)) {
                    response = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/signup`, data);
                    if (response.data.success) {
                        sendOTP()
                        setOTPSignUp(true)
                    } else
                        toast.error(response.data.message);
                }

            }
        }
    }

    const onVerifySignUp = async (event) => {
        event.preventDefault()
        if (isValidOTP(data.otp) && isValidName(data.name) && isValidEmail(data.email) && isValidPassword(data.password) && isValidPhoneNumber(data.phone)) {
            const res = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/signup/verify`, data);
            if (res.data.success) {
                await setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                overflowCon();
                userData(res.data.token);
                setLoginShow(false);
            }
            else
                alert(res.data.message)
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


    return (
        <>
            <div className='login'>
                {curState == 'forgetPassword'
                    ? <ForgetPasword setLoginShow={setLoginShow} setCurState={setCurState} />
                    : <form onSubmit={onLogin} className='login-container' >
                        <div className="login-title">
                            <h2>{curState}</h2>
                            <img onClick={() => { setLoginShow(false); overflowCon() }} src={assets.cross_icon} alt="closed" />
                        </div>
                        <div className='login-inputs'>
                            {curState === 'Login' || OTPSignUp
                                ? <></>
                                : <><input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required autoComplete='off' />
                                    <input name='phone' onChange={onChangeHandler} value={data.phone} type="" placeholder="Phone Number" required autoComplete='off' />
                                </>
                            }

                            {OTPSignUp
                                ? <>
                                    <input name='otp' type='number' onChange={onChangeHandler} value={data.otp} placeholder='Enter OTP' autoComplete='off' />
                                    {seconds > 0 || minutes > 0 ? (
                                        <p>
                                            Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <div className='d-flex'>
                                            <p>Did not recieve code?</p>
                                            <button className='login-resend-OTP-btn' type='submit'>Resend OTP</button>
                                        </div>
                                    )}
                                </>
                                : <><input name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder="Your Email" required autoComplete='off' />
                                    <div className='login-input-password'>
                                        <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required autoComplete='off' />
                                        <p>Password should have atleast one character, one number, one uppercase & lowercase letter. minimum 10 characters</p>
                                    </div>
                                </>
                            }
                            {curState == "Login" ? <p className='login-inputs-forget' onClick={() => setCurState('forgetPassword')}>Forget Password? </p> : <></>}
                        </div>
                        {
                            OTPSignUp
                                ? <>
                                    <button className='login-container-btn' type='button' onClick={onVerifySignUp}>Verify OTP</button>
                                    <p className='login-option-change'>OTP sent! Please check your email to proceed.</p>
                                </>
                                : <button className='login-container-btn' type='submit'>{curState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                        }

                        {curState === 'Login'
                            ? <p className='login-option-change' >Create a new Account? <span onClick={() => setCurState('Sign Up')}> Click here</span></p>
                            : <></>
                        }

                        {curState === 'Login' || OTPSignUp
                            ? <></>
                            : <>
                                <div className="login-popoup-condition">
                                    <input type="checkbox" name="termCondition" onChange={onChangeHandler} value='true' id='signupcheckbox' required />
                                    <p>By Continuing, i agree to the terms to use & privacy Policy.</p>
                                </div>
                                <p className='login-option-change' >Already have a Account?<span onClick={() => setCurState('Login')}> Login here</span></p>
                            </>
                        }
                    </form>}
            </div>
        </>
    )
}

Login.propTypes = {
    setLoginShow: PropType.func,
    setCurState: PropType.func,
    curState: PropType.string
}


export default Login;
