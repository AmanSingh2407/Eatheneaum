import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import axios from 'axios'
import { toast } from 'react-toastify';

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {


    const url = import.meta.env.VITE_APP_URL

    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [bookList, setBookList] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [searchResult, setSearchResult] = useState("")

    const [offNavFoot, setOffNavFoot] = useState(false)

    const resetFunction = () => {
        window.scrollTo(0, 0);
        setSearchResult("")
    }
    const resetScroll = () => {
        window.scrollTo(0, 0);
    }

    const overflowCon = () => {
        document.body.classList.toggle("hidden");
    }

    const selectOptionCheck = (data, filed) => {
        if (data) {
            if (data === "select" || data === "") {
                toast.error(`please fill ${filed}`)
                return false
            }
            return true
        } else {
            toast.error(`please fill ${filed}`)
            return false
        }

    }

    const userData = async (token) => {
        if (token) {
            const response = await axios.get(`${url}${import.meta.env.VITE_APP_USER_PATH}/info?token=${token}`)
            if (response.data.success) {
                setUserInfo(response.data.user)
                setCartData(response.data.user.cartData)
            } else {
                toast.error(response.data.message)
            }

        }
    }

    const featchBookList = async () => {
        const res = await axios.get(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/list`, {})
        if (res.data.success) {
            setBookList(res.data.data);
        }

    }

    const addTOCart = async (item) => {
        if (token) {
            const addItem = await axios.post(`${url}${import.meta.env.VITE_APP_CART_ITEM_PATH}/add`, { item }, { headers: { token } })
            if (addItem.data.success) {
                toast.success(addItem.data.message)
                setCartData((prev) => [...prev, item])
            } else {
                toast.error(addItem.data.message)
            }
        }
        else {
            alert("Please Login Now!");
        }
    }

    const removeCartItem = async (item) => {
        const arr = [];
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_CART_ITEM_PATH}/remove`, { item }, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            cartData.forEach((element) => {
                if (!(item == element)) {
                    arr.push(element)
                }
            })
            setCartData(arr);
        }
    }


    const DOBAgeFormat = () => {
        const today = new Date()
        const dob = new Date(userInfo.dob);
        return today.getFullYear() - dob.getFullYear()
    }

    /*    -----------------------  Validation  ----------------------------   */

    const isValidName = (name) => {
        const nameRegex = /^[a-zA-Z\s-]+$/;
        if (!nameRegex.test(name)) {
            toast.error("Invalid name: Only letters, spaces, and hyphens are allowed.")
            return false;
        }
        if (name.length < 2 || name.length > 25) {
            toast.error("Invalid name length. Name should be between 2 and 50 characters long.")
            return false;
        }
        return true;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.length <= 6 || email.length >= 40) {
            toast.error("Invalid email address format")
            return false
        }
        return true;
    }

    const isValidPhoneNumber = (number) => {
        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobileNumberRegex.test(number)) {
            toast.error("Invalid Phone Number.");
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

    const isValidOTP = (otp) => {
        otp = otp.trim()
        if (!(otp.toString().length == 6)) {
            toast.error("Enter a valid OTP")
            return false
        }
        return true
    }


    const contextValue = {
        removeCartItem,
        overflowCon,
        setUserInfo,
        addTOCart,
        setToken,
        userData,
        isValidOTP,
        isValidName,
        isValidEmail,
        isValidPassword,
        isValidPhoneNumber,
        setSearchResult,
        resetFunction,
        DOBAgeFormat,
        resetScroll,
        setOffNavFoot,
        selectOptionCheck,
        offNavFoot,
        bookList,
        cartData,
        userInfo,
        token,
        url,
        searchResult
    }

    useEffect(() => {
        async function loadData() {
            await featchBookList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                userData(localStorage.getItem('token'));
            }
        }
        loadData();
    }, [])

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

StoreContextProvider.propTypes = {
    children: PropTypes.object
}

export default StoreContextProvider;
