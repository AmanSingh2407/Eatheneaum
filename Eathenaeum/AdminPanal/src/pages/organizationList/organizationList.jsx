import { useContext } from 'react'
import { assets } from '../../assets/assets'
import './organizationList.css'
import { StoreContexts } from '../../context/contextFile'
import { MutatingDots } from 'react-loader-spinner'

const OrganizationList = () => {

    const { url, orgs, adminUserList, orgVerify, adminToken, adminUser, homeRerender } = useContext(StoreContexts);

    const showMoreMemberDetails = (index) => {
        document.getElementById(`org-rotate-${index}`).classList.toggle('rotate')
        document.getElementById(`org-moreinfo-${index}`).classList.toggle('hidden')
    }

    const findMemberDetails = (Id) => {
        var value;
        adminUserList.forEach(member => { 
            if (Id === member._id)
                value = member;
        })
        return value;
    }


    return (
        orgs && adminUserList ?
            (adminUser.role ===  import.meta.env.VITE_APP_SECRET_ID )?
                <div className='org-list'>
                    <div className='org-list-box' >
                        <h2>Organization List</h2>
                    </div>
                    <div className="org-list-table">
                        <div className='org-list-table-head org-table-size '>
                            <p>S.No</p>
                            <p>Organization Name</p>
                            <p>Created By</p>
                            <p>Total Member</p>
                            <p>Total PDF</p>
                            <p>Verifed</p>
                        </div>
                        {
                            orgs.map((org, index) => {
                                return (
                                    <div key={index}>
                                        <div className='org-list-table-body org-table-size'>
                                            <p>1</p>
                                            <p>{org.organization}</p>
                                            <p>amitsingheng0@gmail.com</p>
                                            <p>{org.members.length}</p>
                                            <p>{org.bookuploade.length}</p>
                                            <p>{
                                                org.verify ?
                                                    <button type='button' onClick={() => orgVerify(adminToken, org._id)}><img src={assets.accept} alt="" /></button>
                                                    : <button type='button' onClick={() => orgVerify(adminToken, org._id)}><img src={assets.reject} alt="" /></button>
                                            }</p>
                                        </div>
                                        <div className='userReq-box-details'>
                                            <div className="userReq-box-details-view" onClick={() => showMoreMemberDetails(index)} >
                                                <p id="text">Member Details</p>
                                                <img id={`org-rotate-${index}`} className="rotate" style={{ width: "15px" }} src={assets.arrow} alt="arrow" />
                                            </div>
                                            <div id={`org-moreinfo-${index}`} className="org-more-details hidden" name='pdf'>
                                                {
                                                    org.members.map((id, index) => {
                                                        const member = findMemberDetails(id);
                                                        return (
                                                            <div key={index}>
                                                                <p><img className='org-more-details-pro' src={`${url}/admin/profile/image/${member.profilePhoto}`} alt="" /></p>
                                                                <p>{member.name}</p>
                                                                <p>{member.email}</p>
                                                                <p>{member.phone}</p>
                                                                <p style={member._id === org.createBy ? { color: "red" } : { color: "blue" }}><b>{member._id === org.createBy ? "Leader" : "Member"}</b></p>
                                                                <p>{member.verify ? <img className='org-more-details-verify' src={assets.verifed} alt="" /> : <img className='org-more-details-verify' src={assets.reject} alt="" />}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
                : homeRerender()
            :
            <div className='ad-Loading'>
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

export default OrganizationList;
