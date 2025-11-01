import Navbar from "./compoent/navbar/navbar"
import Footer from "./compoent/footer/footer"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import { useContext, useState } from "react"
import Login from "./compoent/login/login"
import Product from "./pages/productpage/productpage"
import Profile from "./pages/profile/profile"
import MyDocument from "./pages/pdf/pdf"
import { pdfjs } from 'react-pdf';
import Cart from "./pages/cart/cart"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactPage from "./pages/contactpage/contactPage"
import MyBook from "./compoent/myBook/myBook"
import AboutUs from "./compoent/aboutUs/aboutUs"
import { StoreContext } from "./context/storecontextfile"
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy"
import TermAndCondition from "./pages/termAndCondition/termAndCondition"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const App = () => {
  const { offNavFoot } = useContext(StoreContext)
  const [loginShow, setLoginShow] = useState(false);
  const [curState, setCurState] = useState('Login');

  return (
    <>
      <ToastContainer />
      {loginShow ? <Login setLoginShow={setLoginShow} setCurState={setCurState} curState={curState} /> : <></>}
      <div className="app">
        {offNavFoot ? <></> : <Navbar setLoginShow={setLoginShow} setCurState={setCurState} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path="/mybook" element={<MyBook />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-condition' element={<TermAndCondition />} />
          <Route path='/contact/:page' element={<ContactPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/pdf/:filename" element={<MyDocument />} />
        </Routes>
      </div>
      {offNavFoot ? <></> : <Footer />}

    </>

  )
}

export default App
