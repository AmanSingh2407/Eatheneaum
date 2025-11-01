import { useContext, useState } from 'react'
import './editOrganization.css'
import { StoreContexts } from '../../context/contextFile'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditOrganization = () => {

    const { url, adminToken, adminUser, isValidBankName, isValidAccount, isValidIFSCCode } = useContext(StoreContexts)

    const [adData, setAdData] = useState({
        org_OrgName: adminUser.organization.organization,
        org_LeaderEmail: "",
        org_LeaderPass: "",
        org_NLeaderEmail: "",
        org_NLeaderPass: "",
        org_BankName: adminUser.organization.bankName,
        org_Account: adminUser.organization.bankAccount,
        org_IFSCCode: adminUser.organization.IFSCCode
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdData((prev) => ({ ...prev, [name]: value }))
    }

    const onsubmitData = async (e) => {
        e.preventDefault()
        Object.keys(adData).forEach((key) => {
            if (!(key.slice(-10) === 'LeaderPass') && !(key === 'org_Account'))
                adData[key] = adData[key].toString().toLowerCase().trim();
            else
                adData[key] = adData[key].toString().trim();
        })
        const token = adminToken; 
        if (!isValidBankName(adData.org_BankName))
            return toast.error("Please check invalid bank name")
        if (!isValidAccount(adData.org_Account))
            return toast.error("Please check invalid Account Number")
        if (!isValidIFSCCode(adData.org_IFSCCode))
            return toast.error("Please check invalid IFSC Code")

        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ORG_PATH}/update`, adData, { headers: { token } })
        if (res.data.success) {
            toast.success("Update successfully")
            window.location.reload()
        } else
            toast.error(res.data.message)
    }



    return (
        <div className='editOrg'>
            <form onSubmit={onsubmitData} className='editOrg-form'>
                <div className='editOrg-inputBox'>
                    <label htmlFor="">Organization Name</label>
                    <input type="text" name='org_OrgName' onChange={onChangeHandler} value={adData.org_OrgName} placeholder='New Organization Name' />
                </div>
                <div>
                    <h2>Change Leader</h2>
                    <div className='editOrg-form-leader'>
                        <div className='editOrg-inputBox'>
                            <label htmlFor="">Leader Email</label>
                            <input type="text" name='org_LeaderEmail' onChange={onChangeHandler} value={adData.org_LeaderEmail} placeholder='Email' />
                        </div>
                        <div className='editOrg-inputBox'>
                            <label htmlFor="">Leader Password</label>
                            <input type="text" name='org_LeaderPass' onChange={onChangeHandler} value={adData.org_LeaderPass} placeholder='Password' />
                        </div>
                    </div>
                    <div className='editOrg-form-leader'>
                        <div className='editOrg-inputBox'>
                            <label htmlFor=""> New Leader Email</label>
                            <input type="text" name='org_NLeaderEmail' onChange={onChangeHandler} value={adData.org_NLeaderEmail} placeholder='Email' />
                        </div>
                        <div className='editOrg-inputBox'>
                            <label htmlFor="">New Leader Password</label>
                            <input type="text" name='org_NLeaderPass' onChange={onChangeHandler} value={adData.org_NLeaderPass} placeholder='Password' />
                        </div>
                    </div>
                </div>
                <h2>Bank Details</h2>
                <div className='editOrg-inputBox'>
                    <label htmlFor=""> Bank Name</label>
                    <input type="text" name='org_BankName' onChange={onChangeHandler} value={adData.org_BankName} placeholder='Bank Name' />
                </div>
                <div className='editOrg-inputBox'>
                    <label htmlFor="">Bank Account No.</label>
                    <input type="text" name='org_Account' onChange={onChangeHandler} value={adData.org_Account} placeholder='Account Number' />
                </div>
                <div className='editOrg-inputBox'>
                    <label htmlFor="">IFSC Code</label>
                    <input type="text" name='org_IFSCCode' onChange={onChangeHandler} value={adData.org_IFSCCode} placeholder='IFSC Code' />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditOrganization
