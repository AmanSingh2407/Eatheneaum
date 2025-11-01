import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import UserList from './pages/userList/userList'
import UploadPdf from './pages/uploadPdf/uploadPdfs'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login'
import { useContext } from 'react'
import { StoreContexts } from './context/contextFile'
import Profile from './pages/profile/profile'
import UserRequeste from './pages/userReq/userReq'
import PDFRequeste from './pages/pdfReq/pdfReq'
import Setting from './pages/setting/setting'
import Organization from './pages/organization/organization'
import RemoveMember from './components/removeMember/removeMember'
import OrganizationList from './pages/organizationList/organizationList'
import { MutatingDots } from 'react-loader-spinner'
import { assets } from './assets/assets'



const App = () => {

  const { adminToken, reMember, adminUser } = useContext(StoreContexts)

  return (

    <div>
      {reMember ? <RemoveMember /> : <></>}
      <ToastContainer />
      {!adminToken ?
        <Login /> :
        !(Object.keys(adminUser).length === 0) ?
          adminUser.verify ?
            <>
              <>
                <Navbar />
                <hr />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/organization' element={<Organization />} />
                  <Route path='/userlist' element={<UserList />} />
                  <Route path='/organizationlist' element={<OrganizationList />} />
                  <Route path='/uploadpdf/:task' element={<UploadPdf />} />
                  <Route path='/userreq' element={<UserRequeste />} />
                  <Route path='/pdfreq' element={<PDFRequeste />} />
                  <Route path='/setting' element={<Setting />} />
                </Routes>

              </>
            </>
            : <>
              <div className='app-user-bock'>
                <img src={assets.userBlock} alt="" />
                <p>User Blocked</p>
              </div>
            </>
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
      }
    </div>

  )
}

export default App
