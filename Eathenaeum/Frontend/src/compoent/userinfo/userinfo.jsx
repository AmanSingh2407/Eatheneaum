import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './userinfo.css'
import { StoreContext } from '../../context/storecontextfile'
import axios from 'axios'
import { toast } from 'react-toastify'


const UserProfileData = () => {
    const { userInfo, url, token, DOBAgeFormat } = useContext(StoreContext);
    const [imagePro, setImagePro] = useState()

    const onChangeProfileImg = async (e) => {
        e.preventDefault()
        if (imagePro.size / (1024 * 1024) > 1)
            return toast.error("please select photo less than 1 Mb")
        const profileImg = new FormData()
        profileImg.append("image", imagePro)
        profileImg.append("oldImage", userInfo.profileName)
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_USER_PATH}/profileicon`, profileImg, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            window.location.reload();
        }
        else
            toast.error(res.data.message)
    }

    const selectUserProfileImg = (e) => {
        const allowedFormats = ['image/jpeg', 'image/png'];
        if (allowedFormats.includes(e.target.files[0].type))
            setImagePro(e.target.files[0])
        else
            toast.error("please select jpeg/png image format")
    }

    return (
        <div className="userInfo-bottom-box">
            <div className="userInfo-image">
                <div className='userInfo-image-box'>
                    {<img className='UserInfo-user-img' src={imagePro ? URL.createObjectURL(imagePro) : url + '/profile/image/' + userInfo.profileName} alt="" />}
                    <label htmlFor="userInfo-edit-profile">
                        <img className='userInfo-image-edit' src={assets.edit_profile_img} alt="" />
                    </label>
                    <input onChange={selectUserProfileImg} type="file" id="userInfo-edit-profile" accept='image/*' hidden />
                </div>
                {imagePro ? <button type='button' onClick={onChangeProfileImg}>Save</button> : <></>}
            </div>
            <div className="userInfo-details">
                <div className="userInfo-delails-box userInfo-color-box">
                    <p className='userInfo-delails-key' >Name</p>:<p className='userInfo-delails-value  capitalize' >{userInfo.name}</p>
                </div>
                <div className="userInfo-delails-box ">
                    <p className='userInfo-delails-key'>Contact No</p>:<p className='userInfo-delails-value'>{userInfo.phone}</p>
                </div>
                <div className="userInfo-delails-box userInfo-color-box">
                    <p className='userInfo-delails-key'>Email</p>:<p className='userInfo-delails-value'>{userInfo.email}</p>
                </div>
                <div className="userInfo-delails-box">
                    <p className='userInfo-delails-key'>Age</p>:<p className='userInfo-delails-value'>{!userInfo.dob ? "None" : DOBAgeFormat()}</p>
                </div>
                <div className="userInfo-delails-box userInfo-color-box">
                    <p className='userInfo-delails-key'>College</p>:<p className='userInfo-delails-value  capitalize'>{userInfo.college ? userInfo.college : "None"}</p>
                </div>
                <div className="userInfo-delails-box  ">
                    <p className='userInfo-delails-key'>Course</p>:<p className='userInfo-delails-value  capitalize'>{userInfo.course ? userInfo.course : "None"}</p>
                </div>
                <div className="userInfo-delails-box userInfo-color-box">
                    <p className='userInfo-delails-key'>Department</p>:<p className='userInfo-delails-value  capitalize'>{userInfo.department ? userInfo.department : "None"}</p>
                </div>
            </div>

        </div>
    )
}

export default UserProfileData;
