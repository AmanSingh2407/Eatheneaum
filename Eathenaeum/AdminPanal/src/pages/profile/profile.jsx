import './profile.css'
import { assets } from '../../assets/assets.js'
import { useContext, useState } from 'react'
import { StoreContexts } from '../../context/contextFile.jsx'
import { toast } from 'react-toastify'
import axios from 'axios' 

const Profile = () => {

    const { url, adminToken, adminUser, setAdminUser } = useContext(StoreContexts)
    const [imageProfile, setImageProfile] = useState("")

    const onChangeProfile = async (e) => {
        e.preventDefault()
        if (imageProfile.size / (1024 * 1024) > 1)
            return toast.error("please select photo less than 1 Mb")
        const token = adminToken;
        const adProfile = new FormData()
        adProfile.append("image", imageProfile)
        adProfile.append("oldImage", adminUser.profilePhoto)
        const res = await axios.post(url + '/api/admin/user/change/profile', adProfile, { headers: { token } })
        if (res.data.success) {
            setImageProfile("")
            toast.success("Successfully Change")
            setAdminUser(res.data.data)
            window.location.reload()
        } else
            toast.error(res.data.message)
    }


    const selectProfileImg = (e) => {
        const allowedFormats = ['image/jpeg', 'image/png'];
        if (allowedFormats.includes(e.target.files[0].type))
            setImageProfile(e.target.files[0])
        else
            toast.error("please select jpeg/png image format")
    }

    const ageCalculator = () => {
        const today = new Date();
        const dob = new Date(adminUser.dob)
        return today.getFullYear() - dob.getFullYear()
    }


    return (
        <>
            <div className='ad-profile-container' >
                <div className='ad-Profile' >
                    {/* <button type="button" className='ad-profile-add-bank-details' onClick={stateChange} >{BankDetails ? "Cancel" : "Add Bank Details"}</button> */}
                    <div className="ad-profile-img d-flex" >
                        <div>
                            <img src={imageProfile ? URL.createObjectURL(imageProfile) : url + '/admin/profile/image/' + adminUser.profilePhoto} alt="Profil Photo" />
                            <label htmlFor="adminUser-edit-profile"><img src={assets.editProfile} alt="" /></label>
                        </div>
                        <input onChange={selectProfileImg} type="file" id="adminUser-edit-profile" accept='image/*' hidden />
                        {imageProfile ? <button className='ad-profile-img-save' type='button' onClick={onChangeProfile}>Save</button> : ""}
                    </div>
                    <h2>Personal Details</h2>
                    <div className="ad-profile-info">
                        <div>
                            <p className='ad-profile-info-head'>Name</p> : <p className='ad-profile-info-value'>{adminUser.name}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Gender</p> : <p className='ad-profile-info-value'>{adminUser.gender}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Age</p> : <p className='ad-profile-info-value'>{ageCalculator()}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Email</p> : <p className='ad-profile-info-value-email'>{adminUser.email}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Phone</p> : <p className='ad-profile-info-value'>{adminUser.phone}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Role</p> : <p className='ad-profile-info-value'>{adminUser.role}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>City</p> : <p className='ad-profile-info-value'>{adminUser.city}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>State</p> : <p className='ad-profile-info-value'>{adminUser.state}</p>
                        </div>
                    </div>
                    <h2>Qulification Details</h2>
                    <div className="ad-profile-info">
                        <div>
                            <p className='ad-profile-info-head'>college</p> : <p className='ad-profile-info-value'>{adminUser.college}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Course</p> : <p className='ad-profile-info-value'>{adminUser.course}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Department</p> : <p className='ad-profile-info-value'>{adminUser.department}</p>
                        </div>
                        <div>
                            <p className='ad-profile-info-head'>Batch</p> : <p className='ad-profile-info-value'>{adminUser.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
