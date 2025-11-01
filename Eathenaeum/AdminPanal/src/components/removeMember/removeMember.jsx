import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './removeMember.css'
import { StoreContexts } from '../../context/contextFile';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const RemoveMember = () => {

    const navigator = useNavigate()
    const { url, reMember, setReMember, scrollHideInOrg, adminToken, isValidEmail, isValidPassword } = useContext(StoreContexts)
    const [remData, setReMData] = useState({
        reEmail: "",
        rePassword: "",
        reOption: reMember
    })

    const onchangeReHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReMData((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmitReMember = async (e) => {
        e.preventDefault()
        Object.keys(remData).forEach((key) => {
            if (key === 'reEmail')
                remData[key] = remData[key].toString().toLowerCase().trim();
            else
                remData[key] = remData[key].toString().trim();
        })
        if (!isValidEmail(remData.reEmail) && !isValidPassword(remData.rePassword))
            return
        const token = adminToken;
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ORG_PATH}/member/add-remove`, remData, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            setReMember("")
            navigator("/")
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        } else
            toast.error(res.data.message)
    }



    return (
        <div className='RemoveMember' >
            <div className='RemoveMember-form'>
                <div className='RemoveMember-form-head'>
                    <h3>{reMember === 'add' ? "Add Member" : "Remove Member"}</h3>
                    <img onClick={() => { setReMember(""); scrollHideInOrg() }} src={assets.cross_Icon} alt="" />
                </div>
                <form onSubmit={onSubmitReMember}>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" name='reEmail' onChange={onchangeReHandler} value={remData.reEmail} placeholder='Enter Member Email' required  autoComplete="off" />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name='rePassword' onChange={onchangeReHandler} value={remData.rePassword} placeholder='Enter Member Password' required autoComplete='off' />
                    </div>
                    <button type='submit'>{reMember === 'add' ? "Add" : "Remove"}</button>
                </form>
                <p>You must enter the email address and password of the person you want to add or remove. A leader cannot remove himself.</p>
            </div>
        </div>
    )
}

export default RemoveMember;
