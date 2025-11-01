import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export const StoreContexts = createContext(null)

const StoreContextProviders = ({ children }) => {

    const navigate = useNavigate();
    const url = import.meta.env.VITE_APP_URL;

    // data variable for as
    const [listUser, setListUser] = useState([])
    const [adminUserList, setAdminUserList] = useState([])
    const [PDFList, setPDFList] = useState([])
    const [orgs, setOrgs] = useState([])



    const [adminUser, setAdminUser] = useState({})
    const [orgPDFs, setOrgPDFs] = useState([])
    const [adminToken, setAdminToken] = useState("")
    const [reMember, setReMember] = useState("")


    //  --------------------------  Fetch Data     ------------------------

    const fetchUserDetails = async (token) => {
        if (token) {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/details?token=${token}`)
            if (res.data.success) {
                setAdminUser(res.data.data)
            }
            toast.error(res.data.message)
        }
    }

    const fetchOrgPDFList = async (token) => {
        if (token) {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/org-books-list?token=${token}`)
            if (res.data.success) {
                setOrgPDFs(res.data.data)
            }
            else
                toast.error(res.data.message)
        }
    }

    const removePDFData = async (bookId) => {
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/remove`, { id: bookId })
        if (res.data.success) {
            toast.success(res.data.message)
        }
        else {
            toast.error(res.data.message)
        }
    }

    // ------------------- ---------------- ----------------- ------------

    const fetchPDFList = async (token) => {
        if (token) {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/list?token=${token}`)
            if (res.data.success) {
                setPDFList(res.data.data)
            } else
                toast.error(res.data.message)
        }
    }

    const fetchAdminUserList = async (token) => {
        if (token) {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/userlist?token=${token}`)
            if (res.data.success) {
                setAdminUserList(res.data.data)
            }
            else
                toast.error(res.data.message)
        }
    }


    const fetchUserList = async (token) => {
        if (token) {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_USER_PATH}/listuser?token=${token}`)
            if (res.data.success) {
                setListUser(res.data.data)
            }
            else
                toast.error(res.data.message)
        }
    }

    const fetchOrgs = async (token) => {
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ORG_PATH}/all-orgs?token=${token}`)
        if (res.data.success) {
            setOrgs(res.data.data)
        } else
            toast.error(res.data.message)

    }



    //  -------------------------- END :  Fetch Data     ------------------------



    //  -------------------------- Verify account function    ------------------------

    const bookVerify = async (token, id) => {
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/book-verify`, { id }, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
        } else
            toast.error(res.data.message)
    }

    const orgVerify = async (token, id) => {
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ORG_PATH}/account-verify`, { id }, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
        } else
            toast.error(res.data.message)
    }

    const adminUserVerify = async (token, id) => {
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_ADMIN_USER_PATH}/account-verify`, { id }, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
        } else
            toast.error(res.data.message)
    }

    //  -------------------------- END :  Verify account function    ------------------------


    //  -------------------------- General purpose function    ------------------------

    const scrollHideInOrg = () => {
        document.getElementById('organization-page').classList.toggle('hidden')
    }

    const DateFormat = (date) => {
        const DateFormat = new Date(date)
        return DateFormat.toLocaleDateString('en-GB');
    }

    const findOrgName = (id) => {
        var name = "";
        orgs.forEach(org => {
            if (org._id === id)
                name = org.organization;
        });
        return name;
    }

    const homeRerender = () => {
        navigate('/')
    }

    //  -------------------------- END:  General purpose function    ------------------------


    // ---------------------------------  Validation ---------------------------------------

    const isValidBankName = (bankName) => {
        if (bankName) {
            const regex = /^[A-Za-z][A-Za-z\s\-']{1,50}[A-Za-z]$/;
            return regex.test(bankName.trim());
        }
        return false
    }

    const isValidAccount = (number) => {
        if (number) {
            const regex = /^\d{10,12}$/;
            return regex.test(number);
        }
        else
            return false
    }
    const isValidIFSCCode = (IFSC) => {
        if (IFSC) {
            const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
            return regex.test(IFSC);
        }
        else
            return false
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.length <= 6 || email.length >= 50) {
            toast.error("Invalid email address format")
            return false
        }
        return true;
    }

    const isValidPassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length > 20 || password.length < 8 || !hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
            toast.error("Invalid Password!")
            return false
        }
        return true
    }

    const validateImage = (file) => {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 1 * 1024 * 1024;
        if (!allowedFormats.includes(file.type))
            return { valid: false, message: 'Invalid file format. Only JPG and PNG are allowed.' }

        if (file.size > maxSize)
            return { valid: false, message: 'File size exceeds 1MB.' }

        return { valid: true, message: 'Image Format correct' }
    }


    const contextValue = {
        url,
        listUser,
        PDFList,
        adminToken,
        adminUser,
        reMember,
        adminUserList,
        orgPDFs,
        orgs,
        setAdminToken,
        removePDFData,
        setAdminUser,
        isValidBankName,
        isValidEmail,
        isValidPassword,
        isValidAccount,
        isValidIFSCCode,
        setReMember,
        scrollHideInOrg,
        validateImage,
        DateFormat,
        bookVerify,
        orgVerify,
        adminUserVerify,
        findOrgName,
        fetchUserDetails,
        homeRerender,
        fetchOrgPDFList
    }

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem('adminToken')) {
                setAdminToken(localStorage.getItem('adminToken'))
                fetchUserDetails(localStorage.getItem('adminToken'))
                fetchOrgPDFList(localStorage.getItem('adminToken'))
            }
        }
        loadData();
    }, [])


    useEffect(() => {
        if (adminUser) {
            if (adminUser.role === import.meta.env.VITE_APP_SECRET_ID) {
                const token = adminToken;
                fetchUserList(token)
                fetchPDFList(token)
                fetchAdminUserList(token)
                fetchOrgs(token)
            }
        }
    }, [adminUser, adminToken])

    return (
        <StoreContexts.Provider value={contextValue}>
            {children}
        </StoreContexts.Provider>
    )
}

StoreContextProviders.propTypes = {
    children: PropTypes.object
}

export default StoreContextProviders;
