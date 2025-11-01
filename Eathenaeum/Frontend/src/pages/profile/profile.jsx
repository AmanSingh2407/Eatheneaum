import { useState, useContext } from 'react'
import './profile.css'
import UserProfileData from '../../compoent/userinfo/userinfo';
import { StoreContext } from '../../context/storecontextfile';
import axios from 'axios';
import { toast } from 'react-toastify';
import { collegeId, courseDepartment, courseId, departmentId } from '../../assets/college';
import { MutatingDots } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';


const Profile = () => {

    const { url, token, setUserInfo, isValidName, userInfo, DOBAgeFormat } = useContext(StoreContext)
    const [active, setActive] = useState('Profile')
    const [data, setData] = useState({
        name: userInfo.name ? userInfo.name : "",
        college: userInfo.college ? userInfo.college : "",
        course: userInfo.course ? userInfo.course : "",
        department: userInfo.department ? userInfo.department : "",
        age: userInfo.dob ? DOBAgeFormat() : ""
    })

    const onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData(prev => ({ ...prev, [name]: value })) 
    }

    const onUpdate = async (event) => {
        event.preventDefault()
        Object.keys(data).forEach((key) => {
            if (!(key === 'age'))
                data[key] = data[key].toString().toLowerCase().trim();
            else
                data[key] = data[key].toString().trim();
        })
        if (isValidName(data.name)) {
            const res = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/update`, data, { headers: { token } })
            if (res.data.success) {
                toast.success("Successfully Update");
                setUserInfo(res.data.user)
                setActive('Profile')
            }
            else
                toast.error(res.data.message)
        }
    }

    const changeState = () => {
        if (active == 'Profile')
            setActive('Edit Profile')
        else {
            setActive('Profile')
            setData({
                name: userInfo.name ? userInfo.name : "",
                college: userInfo.college ? userInfo.college : "",
                course: userInfo.course ? userInfo.course : "",
                department: userInfo.department ? userInfo.department : "",
                age: userInfo.dob ? DOBAgeFormat() : ""
            })
        }
    }

    const fetchOptionsData = (Data, type, condition) => {
        const value = []
        for (const key in Data) {
            if (type == 'university' || type == 'course')
                value.push(key)

            if (type == 'department')
                if (courseId[key] == condition)
                    return Data[key]
        }
        return value;
    }


    return (

        !(Object.keys(userInfo).length === 0) ?

            <div className='profile'>
                <Helmet>
                    <title>Profile</title>
                </Helmet>
                <div className='a-flex'>
                    <h3 className='profile-heading'>{active}</h3>
                    <button className='btn profile-edit-btn ' type='button' onClick={changeState}>{active == 'Profile' ? "Edit Profile" : "Cancel"}</button>
                </div>
                <hr />
                {
                    active == 'Profile' ? <UserProfileData />
                        : <>
                            <div className='editUser'>
                                {/* <h3 className="edit-h3">Change General Information </h3> */}
                                <form className='editUser-form' onSubmit={onUpdate}>
                                    <div className='editUser-form-input'>
                                        <label htmlFor="user-form-name">Name</label>
                                        <input type="text" id='user-form-name' name='name' onChange={onChangeHandler} value={data.name} placeholder='Full Name' autoComplete='off' required />
                                    </div>
                                    <div className='editUser-form-input'>
                                        <label htmlFor="user-form-age">Age</label>
                                        <input type="Number" id='user-form-age' name='age' onChange={onChangeHandler} value={data.age} placeholder='Ex. 20' autoComplete='off' required />
                                    </div>
                                    <div className='editUser-form-input'>
                                        <label htmlFor="user-form-college">College</label>
                                        <select name="college" id="user-form-college" onChange={onChangeHandler} value={data.college} required>
                                            <option value="select">Select</option>
                                            {
                                                fetchOptionsData(collegeId, 'university', "").map((Id, index) => {
                                                    return <option key={index} value={collegeId[Id]} >{collegeId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='editUser-form-input'>
                                        <label htmlFor="user-form-course">Course</label>
                                        <select name="course" id="user-form-course" onChange={onChangeHandler} value={data.course} required>
                                            <option value="select">Select</option>
                                            {
                                                fetchOptionsData(courseId, 'course', "").map((Id, index) => {
                                                    return <option key={index} value={courseId[Id]}>{courseId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='editUser-form-input'>
                                        <label htmlFor="user-form-department">Department</label>
                                        <select name="department" id="user-form-department" onChange={onChangeHandler} value={data.department} required>
                                            <option value="select" >Select</option>
                                            {
                                                fetchOptionsData(courseDepartment, 'department', data.course).map((Id, index) => {
                                                    return <option key={index} value={departmentId[Id]} >{departmentId[Id]}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <button type='submit' className='editUser-form-btn btn'>Save</button>
                                </form>
                            </div>
                        </>
                }

            </div>
            : <div className='fe-loading'>
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#e0341d"
                    secondaryColor="#333"
                    radius="15"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
    )
}



export default Profile
