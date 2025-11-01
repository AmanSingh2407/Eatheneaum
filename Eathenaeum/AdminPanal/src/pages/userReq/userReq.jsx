import { useContext } from 'react'
import { assets } from '../../assets/assets'
import './userReq.css'
import { StoreContexts } from '../../context/contextFile'
import { MutatingDots } from 'react-loader-spinner'

const UserRequeste = () => {

    const { url, adminUserList, adminUserVerify, adminToken, findOrgName, adminUser, homeRerender } = useContext(StoreContexts)

    const showMoreDetails = (index) => {
        document.getElementById(`userReq-rotate-${index}`).classList.toggle('rotate')
        document.getElementById(`moreinfo-${index}`).classList.toggle('hidden')
    }

    const DOBAgeFormat = (date) => {
        const today = new Date()
        const dob = new Date(date);
        return today.getFullYear() - dob.getFullYear()
    }


    return (

        adminUserList && adminToken ?
            (adminUser.role === import.meta.env.VITE_APP_SECRET_ID) ?
                <div className='userReq'>
                    <h2 className='userReq-h2' >Admin User List</h2>
                    <div className='userReq-head userReq-table'>
                        <p>Image</p>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Organization</p>
                        <p>Verifed</p>
                    </div>

                    {
                        adminUserList.map((user, index) => {
                            return (
                                <div key={index} className='userReq-box'>
                                    <div className='userReq-box-user userReq-table'>
                                        <img className='userReq-box-user-img' src={`${url}/admin/profile/image/${user.profilePhoto}`} alt="Profile Image" />
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                        <p>{findOrgName(user.organization) ? findOrgName(user.organization) : "None"}</p>
                                        {
                                            user.verify ?
                                                <button type='button' id='userReq-green' onClick={() => adminUserVerify(adminToken, user._id)} ><img src={assets.accept} alt="" /></button>
                                                : <button type='button' id='userReq-red' onClick={() => adminUserVerify(adminToken, user._id)} ><img src={assets.reject} alt="" /></button>
                                        }
                                    </div>
                                    <div className='userReq-box-details'>
                                        <div className="userReq-box-details-view" onClick={() => showMoreDetails(index)} >
                                            <p id="text">More Details</p>
                                            <img id={`userReq-rotate-${index}`} className="rotate" style={{ width: "15px" }} src={assets.arrow} alt="arrow" />
                                        </div>
                                        <div id={`moreinfo-${index}`} className="userReq-more-details hidden" name='pdf'>
                                            <div>
                                                <h3>Personal Details</h3>
                                                <div className='userReq-more-details-show'>
                                                    <div> <span className='userReq-bold'>Phone No</span>  <span>:</span>   <span>{user.phone}</span>     </div>
                                                    <div> <span className='userReq-bold'>Role</span>       <span>:</span>   <span>{user.role}</span>           </div>
                                                    <div> <span className='userReq-bold'>Age</span>        <span>:</span>   <span>{DOBAgeFormat(user.dob)}</span>             </div>
                                                    <div> <span className='userReq-bold'>Gender</span>     <span>:</span>   <span>{user.gender}</span>           </div>
                                                    <div> <span className='userReq-bold'>City</span>       <span>:</span>   <span>{user.city}</span>     </div>
                                                    <div> <span className='userReq-bold'>State</span>      <span>:</span>   <span>{user.state}</span>  </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3>Qulification Details</h3>
                                                <div className='userReq-more-details-show'>
                                                    <div> <span className='userReq-bold'>College</span>     <span>:</span>  <span>{user.college}</span>    </div>
                                                    <div> <span className='userReq-bold'>Course</span>      <span>:</span>  <span>{user.course}</span>                    </div>
                                                    <div> <span className='userReq-bold'>Department</span>  <span>:</span>  <span>{user.department}</span>                       </div>
                                                    <div> <span className='userReq-bold'>Batch</span>       <span>:</span>  <span>{user.status}</span>                 </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                : homeRerender()
            : <div className='ad-Loading'>
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

export default UserRequeste
