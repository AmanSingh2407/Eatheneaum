import { assets, indianStatesCity, years } from '../../assets/assets'
import { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../../context/storecontextfile'
import './joinFrom.css'
import { courseDepartment, courseId, departmentId, collegeId } from '../../assets/college'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

const JoinFrom = () => {

    const { url, isValidOTP, isValidName, isValidEmail, isValidPassword, isValidPhoneNumber, selectOptionCheck, userInfo, token } = useContext(StoreContext)
    const [OTP, setOTP] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


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
    })

    const startTime = () => {
        setMinutes(1);
        setSeconds(59);
    };

    const [data, setData] = useState({
        ad_name: "",
        ad_email: "",
        ad_phone: "",
        ad_age: "",
        ad_gender: "",
        ad_role: "",
        ad_state: "",
        ad_city: "",
        ad_password: "",
        ad_cpassword: "",
        ad_college: "",
        ad_course: "",
        ad_department: "",
        ad_startYear: "",
        ad_endYear: "",
        ad_otp: "",
        ad_termCondition: false
    })

    const onchangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (!(name === 'ad_termCondition'))
            setData(data => ({ ...data, [name]: value }));
        if (name === 'ad_termCondition')
            setData(data => ({ ...data, [name]: document.getElementById('join-term-condition').checked }));
    }


    const onCheckInputValid = () => {
        Object.keys(data).forEach((key) => {
            if (!(key === 'ad_password') && !(key === 'ad_cpassword'))
                data[key] = data[key].toString().toLowerCase().trim();
            else
                data[key] = data[key].toString().trim();
        })
        if (!data.ad_termCondition) {
            toast.error("please cheak term and condition")
            return false
        }
        if (!(data.ad_password == data.ad_cpassword)) {
            toast.error("password does not match!")
            return false
        }

        if (!selectOptionCheck(data.ad_gender, "Gender"))
            return false
        if (!selectOptionCheck(data.ad_role, "Role"))
            return false
        if (!selectOptionCheck(data.ad_state, "State"))
            return false
        if (!selectOptionCheck(data.ad_city, "City"))
            return false
        if (!selectOptionCheck(data.ad_college, "College"))
            return false
        if (!selectOptionCheck(data.ad_course, "Course"))
            return false
        if (!selectOptionCheck(data.ad_department, "Department"))
            return false
        if (!selectOptionCheck(data.ad_startYear, "Start Year"))
            return false
        if (!selectOptionCheck(data.ad_endYear, "Ending Year"))
            return false

        if (!isValidName(data.ad_name) && !isValidEmail(data.ad_email) && !isValidPhoneNumber(data.ad_phone) && !isValidPassword(data.ad_password) && !isValidPassword(data.ad_cpassword))
            return false

        return true
    }

    const onSendOTPInBack = async () => {
        if (!onCheckInputValid()) {
            return
        }
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/verify`, data, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            setOTP(true)
            startTime()
        } else
            toast.error(res.data.message)
    }

    const onSubmitInBack = async () => {
        if (!onCheckInputValid()) {
            return
        }
        if (!isValidOTP(data.ad_otp))
            return
        const response = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/register`, data, { headers: { token } })
        if (response.data.success) {
            toast.success(response.data.message)
            setOTP(false)
            setData({
                ad_name: "",
                ad_email: "",
                ad_phone: "",
                ad_age: "",
                ad_gender: "",
                ad_role: "",
                ad_state: "",
                ad_city: "",
                ad_password: "",
                ad_cpassword: "",
                ad_college: "",
                ad_course: "",
                ad_department: "",
                ad_startYear: "",
                ad_endYear: "",
                ad_otp: "",
                ad_termCondition: false
            })
        } else
            toast.error(response.data.message)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (!OTP) {
            await onSendOTPInBack()
        } else {
            await onSubmitInBack()
        }
    }

    const fetchData = (Data, type, condition) => {
        const value = []
        for (const key in Data) {
            if (type == 'state')
                value.push(key)

            if (type == 'city')
                if (key == condition)
                    return Data[key]

            if (type == 'university' || type == 'course')
                value.push(key)

            if (type == 'department')
                if (courseId[key] == condition)
                    return Data[key]
        }
        return value;
    }

    return (

        <div className='join'>
            <Helmet>
                <title>Join-From</title>
            </Helmet>
            {!userInfo.role ?
                <>
                    <h2>Become a Member</h2>
                    <form onSubmit={onSubmit}>
                        {OTP ? <>
                            <div >
                                <div className='join-input'>
                                    <label htmlFor="join-otp">Enter OTP</label>
                                    <input type="number" name="ad_otp" id="join-otp" onChange={onchangeHandler} value={data.otp} placeholder='Ex. 1254' required autoComplete='off' />
                                </div>
                                <div>
                                    {(seconds > 0 || minutes > 0) ? (
                                        <p className='mx-10'>
                                            Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <div className='d-flex mx-10 '>
                                            <p>Did not recieve code?</p>
                                            <button className='join-resend-otp my-10' onClick={onSendOTPInBack}>Resend OTP</button>
                                        </div>
                                    )}
                                </div>
                                <p className='join-otp-para'>Please enter the OTP sent to your email to verify.</p>
                            </div>
                        </> :
                            <>
                                <h1>Personal Details</h1>
                                <div className="join-form-personal-details">
                                    <div className='join-input'>
                                        <label htmlFor="join-name">Name</label>
                                        <input type="text" id='join-name' name='ad_name' onChange={onchangeHandler} value={data.ad_name} autoComplete='off' required />
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-email">Email</label>
                                        <input type="text" id='join-email' name='ad_email' onChange={onchangeHandler} value={data.ad_email} autoComplete='off' required />
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-phone">Phone</label>
                                        <input type="text" id='join-phone' name='ad_phone' onChange={onchangeHandler} value={data.ad_phone} autoComplete='off' required />
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-age">Age</label>
                                        <input type="Number" id='join-age' name='ad_age' onChange={onchangeHandler} value={data.ad_age} autoComplete='off' required />
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-gender">Gender</label>
                                        <select name="ad_gender" id="join-gender" onChange={onchangeHandler} value={data.ad_gender} autoComplete='off' required>
                                            <option value="select" >Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-role">Role</label>
                                        <select name="ad_role" id="join-role" onChange={onchangeHandler} value={data.ad_role} required>
                                            <option value="select" >Select</option>
                                            <option value="admin user">Admin User</option>
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-state">State</label>
                                        <select name="ad_state" id="join-state" onChange={onchangeHandler} value={data.ad_state} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchData(indianStatesCity, 'state', "").map((element, index) => {
                                                    return (<option key={index} value={element} >{element}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-city">City</label>
                                        <select name="ad_city" id="join-city" onChange={onchangeHandler} value={data.ad_city} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchData(indianStatesCity, 'city', data.ad_state).map((element, index) => {
                                                    return (<option key={index} value={element} >{element}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-password">Password</label>
                                        <input type='password' id='join-password' name='ad_password' onChange={onchangeHandler} value={data.ad_password} autoComplete='off' required />
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-cpassword">Confirm Password</label>
                                        <input type='password' id='join-cpassword' name='ad_cpassword' onChange={onchangeHandler} value={data.ad_cpassword} autoComplete='off' required />
                                    </div>
                                </div>
                                {/* ------------- Qualification Details  ------------ */}
                                <h1>Qualification Details</h1>
                                <div className="join-form-personal-details">
                                    <div className='join-input'>
                                        <label htmlFor="join-college">College</label>
                                        <select name="ad_college" id="join-college" onChange={onchangeHandler} value={data.ad_college} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchData(collegeId, 'university', "").map((Id, index) => {
                                                    return <option key={index} value={collegeId[Id]} >{collegeId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-course">Course</label>
                                        <select name="ad_course" id="join-course" onChange={onchangeHandler} value={data.ad_course} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchData(courseId, 'course', "").map((Id, index) => {
                                                    return <option key={index} value={courseId[Id]}>{courseId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-department">Department</label>
                                        <select name="ad_department" id="join-department" onChange={onchangeHandler} value={data.ad_department} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchData(courseDepartment, 'department', data.ad_course).map((Id, index) => {
                                                    return <option key={index} value={departmentId[Id]} >{departmentId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-startYear">Starting Year</label>
                                        <select name="ad_startYear" id="join-startYear" onChange={onchangeHandler} value={data.ad_startYear} required>
                                            <option value="select" >Select</option>
                                            {
                                                years.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='join-input'>
                                        <label htmlFor="join-endYear">Ending Year</label>
                                        <select name="ad_endYear" id="join-endYear" onChange={onchangeHandler} value={data.ad_endYear} required >
                                            <option value="select" >Select</option>
                                            {
                                                years.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='d-flex join-termCondition'>
                                        <input type="checkbox" name="ad_termCondition" id="join-term-condition" onChange={onchangeHandler} value={data.ad_termCondition} required />
                                        <label htmlFor="join-term-condition">By creating an account, you agree to our <b>Terms</b> and <b>Conditions and Privacy Policy</b>. </label>
                                    </div>
                                </div>
                            </>}
                        <button className='join-form-button btn' type='submit' style={{ width: "200px" }} >{OTP ? "Verify" : "Submit"}</button>
                    </form>
                </> :
                <>
                    {userInfo.role == 'adminUser'
                        ? <div className='join-message'>
                            <div className='join-message-congrate'>
                                <img src={assets.congrate} alt="" />
                                <p><b>Congrats!</b></p>
                            </div>
                            <hr />
                            <p>You&apos;ve now joined E-Athenaeum, as a collaborator. A Better way to grow.</p>
                            <div className='d-flex'>
                                <p>Link :</p><Link className='my-10'>Admin Panel</Link>
                            </div>
                        </div>
                        :
                        <div className='join-message'>
                            <div className='join-message-success'>
                                <img src={assets.success} alt="" />
                                <p><b>Success!</b></p>
                            </div>
                            <p>Thank you for filling out the form. We appreciate your efforts.</p>
                            <p>We&apos;ll analyze your form & come back to you within few days.</p>
                        </div>
                    }
                </>

            }
        </div>
    )
}

export default JoinFrom
