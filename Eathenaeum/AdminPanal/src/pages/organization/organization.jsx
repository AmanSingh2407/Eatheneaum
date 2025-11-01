import { useContext, useState } from 'react'
import './organization.css'
import EditOrganization from '../../components/editOrganization/editOrganization'
import OrgForm from '../../components/orgForm/orgForm'
import { StoreContexts } from '../../context/contextFile'
import { assets } from '../../assets/assets'

const Organization = () => {

    const { url, adminUser, setReMember, scrollHideInOrg } = useContext(StoreContexts)
    const [orgEdit, setOrgEdit] = useState(false)


    const stateChange = () => {
        if (orgEdit)
            setOrgEdit(false)
        else
            setOrgEdit(true)
    }

    const removeFun = (option) => {
        setReMember(option)
        window.scrollTo(0, 0);
        scrollHideInOrg()
    }

    return (

        <div className='org' id='organization-page'>
            {adminUser.organization ?
                adminUser.organization.verify ?
                    <>
                        <div className='org-details'>
                            <div className='org-details-head'>
                                <h2>{adminUser.organization.organization}</h2>
                                {
                                    (adminUser.organization.createBy == adminUser._id) && adminUser ?
                                        <div>
                                            <button onClick={stateChange}>{orgEdit ? "Cancle" : "Edit"}</button>
                                            <button onClick={() => removeFun("remove")}>Remove member</button>
                                            <button onClick={() => removeFun("add")}>Add member</button>
                                        </div>
                                        : <></>
                                }
                            </div>

                            {orgEdit ?
                                <EditOrganization /> :
                                <>
                                    <div className='org-details-info'>
                                        <div className='org-details-info-main'>
                                            <h6>Total Upload PDF :</h6>
                                            <p>{adminUser.organization.bookuploade.length}</p>

                                        </div>
                                        <h4>Bank Details</h4>
                                        <div className='org-details-bank'>
                                            <div>
                                                <h6>Bank Name</h6>
                                                <p>{adminUser.organization.bankName ? adminUser.organization.bankName : "None"}</p>
                                            </div>
                                            <div>
                                                <h6>Account Number</h6>
                                                <p>{adminUser.organization.bankAccount ? adminUser.organization.bankAccount : "None"}</p>
                                            </div>
                                            <div>
                                                <h6>IFSC Code</h6>
                                                <p>{adminUser.organization.IFSCCode ? adminUser.organization.IFSCCode : "None"}</p>
                                            </div>
                                            <div>
                                                <h6>Earning</h6>
                                                <p>0</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Our Team</h3>
                                        <hr />
                                        {
                                            adminUser.organization.members.map((data, index) => {
                                                return (
                                                    <div key={index} className='org-details-user'>
                                                        <img src={url + '/admin/profile/image/' + data.profilePhoto} alt="" />
                                                        <p>{data.name}</p>
                                                        <p>{data.email}</p>
                                                        <p>{data.phone}</p>
                                                        {data._id === adminUser.organization.createBy ? <p><del>Leader</del></p> : <p><ins>member</ins></p>}

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </>
                    :
                    <div className='app-org-bock'>
                        <img src={assets.orgBlock} alt="" />
                        <p>Organization is not verified</p>
                    </div>
                : <OrgForm />
            }
        </div> 

    )
}

export default Organization
