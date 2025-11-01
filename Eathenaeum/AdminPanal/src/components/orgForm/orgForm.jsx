import { useContext, useState } from 'react';
import './orgForm.css'
import axios from 'axios'
import { StoreContexts } from '../../context/contextFile';
import { toast } from 'react-toastify';

const OrgForm = () => {

    const { url, adminToken, setOrgDetails } = useContext(StoreContexts)
    const [orgData, setOrgData] = useState({
        org_orgName: "",
        org_m1LEmail: "",
        org_m2Email: "",
        org_m3Email: "",
        org_m4Email: "",
        org_m5Email: "",
        org_m1LPassword: "",
        org_m2Password: "",
        org_m3Password: "",
        org_m4Password: "",
        org_m5Password: "",
        org_termCondition: false
    })

    const onchangeHandlerOrg = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (!(name === 'org_termCondition'))
            setOrgData(data => ({ ...data, [name]: value }));
        if (name === 'org_termCondition')
            setOrgData(data => ({ ...data, [name]: document.getElementById('org_TermCondition').checked }));

    }

    const onSubmitOrg = async (event) => {
        event.preventDefault()
        Object.keys(orgData).forEach((key) => {
            if (!(key.slice(-8) === 'Password'))
                orgData[key] = orgData[key].toString().toLowerCase().trim();
            else
                orgData[key] = orgData[key].toString().trim();
        })
        const token = adminToken;
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ORG_PATH}/create`, orgData, { headers: { token } })
        if (res.data.success) {
            toast.success("Successfully Created")
            window.location.reload()
            setOrgDetails(res.data.organization)
        } else
            toast.error(res.data.message)
    }

    return (
        <div className='orgForm'>
            <form onSubmit={onSubmitOrg}>
                <h2>Create your Organization</h2>
                <div className='org-inputs' id='or' >
                    <label htmlFor="">Organization Name</label>
                    <input type="text" name='org_orgName' autoFocus onChange={onchangeHandlerOrg} value={orgData.org_orgName} required />
                </div>

                <h6>Member 1 (<span style={{ color: "red" }}>Leader</span>) </h6>
                <div className='org-inputs-form-member'>
                    <div className='org-inputs'>
                        <label htmlFor="">Email</label>
                        <input type='email' name='org_m1LEmail' placeholder="Enter member email id" onChange={onchangeHandlerOrg} value={orgData.org_m1LEmail} required />
                    </div>
                    <div className='org-inputs'>
                        <label htmlFor="">Password</label>
                        <input type='password' name='org_m1LPassword' placeholder="Password" onChange={onchangeHandlerOrg} value={orgData.org_m1LPassword} required />
                    </div>
                </div>

                <h6>Member 2 </h6>
                <div className='org-inputs-form-member'>
                    <div className='org-inputs'>
                        <label htmlFor="">Email</label>
                        <input type='email' name='org_m2Email' placeholder="Enter member email id" onChange={onchangeHandlerOrg} value={orgData.org_m2Email} />
                    </div>
                    <div className='org-inputs'>
                        <label htmlFor="">Password</label>
                        <input type='password' name='org_m2Password' placeholder="Password" onChange={onchangeHandlerOrg} value={orgData.org_m2Password} />
                    </div>
                </div>

                <h6>Member 3 </h6>
                <div className='org-inputs-form-member'>
                    <div className='org-inputs'>
                        <label htmlFor="">Email</label>
                        <input type='email' name='org_m3Email' placeholder="Enter member email id" onChange={onchangeHandlerOrg} value={orgData.org_m3Email} />
                    </div>
                    <div className='org-inputs'>
                        <label htmlFor="">Password</label>
                        <input type='password' name='org_m3Password' placeholder="Password" onChange={onchangeHandlerOrg} value={orgData.org_m3Password} />
                    </div>
                </div>

                <h6>Member 4 </h6>
                <div className='org-inputs-form-member'>
                    <div className='org-inputs'>
                        <label htmlFor="">Email</label>
                        <input type='email' name='org_m4Email' placeholder="Enter member email id" onChange={onchangeHandlerOrg} value={orgData.org_m4Email} />
                    </div>
                    <div className='org-inputs'>
                        <label htmlFor="">Password</label>
                        <input type='password' name='org_m4Password' placeholder="Password" onChange={onchangeHandlerOrg} value={orgData.org_m4Password} />
                    </div>
                </div>

                <h6>Member 5 </h6>
                <div className='org-inputs-form-member'>
                    <div className='org-inputs'>
                        <label htmlFor="">Email</label>
                        <input type='email' name='org_m5Email' placeholder="Enter member email id" onChange={onchangeHandlerOrg} value={orgData.org_m5Email} />
                    </div>
                    <div className='org-inputs'>
                        <label htmlFor="">Password</label>
                        <input type='password' name='org_m5Password' placeholder="Password" onChange={onchangeHandlerOrg} value={orgData.org_m5Password} />
                    </div>
                </div>

                <div className='org-inputs-termCondition'>
                    <input type="checkbox" name="org_termCondition" id="org_TermCondition" onChange={onchangeHandlerOrg} value='true' />
                    <label htmlFor="org_TermCondition">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, reiciendis.</label>
                </div>

                <button type='submit' >Create </button>
            </form>
        </div>
    )
}

export default OrgForm;
