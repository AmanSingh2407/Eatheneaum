import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { useContext } from 'react'
import { StoreContexts } from '../../context/contextFile'

const Navbar = () => {

    const navigate = useNavigate()
    const { url, setAdminToken, adminUser } = useContext(StoreContexts)
    const onLogOut = () => {
        localStorage.removeItem('adminToken');
        setAdminToken("")
        navigate('/')
    }

    return (

        <div className='navbar a-flex'>
            <div className="navbar-left">
                <h2>E-Athenaeum</h2>
            </div>
            <div className="navbar-right">
                <img className='navbar-right-pro-icon' src={`${url}/admin/profile/image/${adminUser.profilePhoto}`} alt="Profile Image" />
                <div className="navbar-right-dropdown">
                    <Link className='navbar-right-dropdown-btn' to='/'>
                        <img src={assets.home_icon} alt="" />
                        <p>Home</p>
                    </Link>
                    <Link className='navbar-right-dropdown-btn' to='/profile'>
                        <img src={assets.profile_icon} alt="" />
                        <p>Profile</p>
                    </Link>
                    <Link className='navbar-right-dropdown-btn' to='/organization'>
                        <img src={assets.org_icon} alt="" />
                        <p>Organization</p>
                    </Link>
                    {
                        adminUser.organization ?
                            adminUser.organization.createBy === adminUser._id ?
                                <Link className='navbar-right-dropdown-btn' to='/uploadpdf/add'>
                                    <img src={assets.uploadPDF_icon} alt="" />
                                    <p>Upload</p>
                                </Link>
                                : <></>
                            : <></>
                    }

                    {adminUser && (adminUser.role === import.meta.env.VITE_APP_SECRET_ID) ?
                        <>
                            <Link className='navbar-right-dropdown-btn' to='/userlist'>
                                <img src={assets.user_icon} alt="" />
                                <p>User</p>
                            </Link>
                            <Link className='navbar-right-dropdown-btn' to='/organizationlist'>
                                <img src={assets.orgs_icon} alt="" />
                                <p>All Organization</p>
                            </Link>
                            <Link className='navbar-right-dropdown-btn' to='/userreq'>
                                <img src={assets.adminUser_icon} alt="" />
                                <p>Admin User</p>
                            </Link>
                            <Link className='navbar-right-dropdown-btn' to='/pdfreq'>
                                <img src={assets.PDFs_icon} alt="" />
                                <p>PDF</p>
                            </Link>
                            <Link className='navbar-right-dropdown-btn' to='/setting'>
                                <img src={assets.setting_icon} alt="" />
                                <p>Setting</p>
                            </Link>
                        </>
                        : <></>
                    }
                    {/* <Link className='navbar-right-dropdown-btn' to='/' >
                        <img src={assets.payment_icon} alt="" />
                        <p>Payments</p>
                    </Link> */}
                    <Link className='navbar-right-dropdown-btn' onClick={onLogOut} >
                        <img src={assets.logout} alt="" />
                        <p>Logout</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar




