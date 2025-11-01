import { useContext, useEffect, useState } from 'react'
import './updateBook.css'
import PropTypes from 'prop-types'
import { StoreContexts } from '../../context/contextFile'
import axios from 'axios'
import { toast } from 'react-toastify'

const UpdateBook = ({ bookId }) => {

    const { url, orgPDFs, adminToken, fetchOrgPDFList } = useContext(StoreContexts)
    const [upData, setUpData] = useState({
        up_title: "",
        up_description: "",
        up_oldTitle: "",
        up_oldDescription: "",
        bookId: bookId,
    })

    const onChangeHandlerUP = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpData(prev => ({ ...prev, [name]: value })) 
    }

    const onUpdate = async (e) => {
        e.preventDefault()
        const token = adminToken;
        Object.keys(upData).forEach((key) => {
            upData[key] = upData[key].toString().toLowerCase().trim();
        })

        if (upData.up_title.length > 100 || upData.up_title.length <= 10)
            return toast.error("The word length of the title should be between 30 to 500")
        if (upData.up_description.length > 500 || upData.up_description.length <= 30)
            return toast.error("The word length of the Description should be between 30 to 500")

        const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/edit`, upData, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            setTimeout(() => {
                fetchOrgPDFList(token)
            }, 2000);
        } else
            toast.error(res.data.message)
    }

    useEffect(() => {
        if (orgPDFs) {
            orgPDFs.map((book) => {
                if (book._id === bookId) {
                    setUpData({
                        up_title: book.title,
                        up_description: book.description,
                        up_oldTitle: book.title,
                        up_oldDescription: book.description,
                        bookId: bookId,
                    })
                }
            })
        }
    }, [orgPDFs, bookId])
 

    return (
        <div className='upBook'>
            <form className='upBook-form' onSubmit={onUpdate} >
                <h1>Update Book Details</h1>
                <div className='upBook-from-input'>
                    <label htmlFor="upBook-title">Title</label>
                    <input type="text" name="up_title" id="upBook-title" onChange={onChangeHandlerUP} value={upData.up_title} />
                    <p style={upData.up_title.length > 100 ? { color: "red" } : {}} >{upData.up_title.length}/100</p>
                </div>
                <div className='upBook-from-input'>
                    <label htmlFor="upBook-description">Description</label>
                    <textarea name="up_description" rows='10' id="upBook-description" onChange={onChangeHandlerUP} value={upData.up_description}></textarea>
                    <p style={upData.up_description.length > 500 ? { color: "red" } : {}}>{upData.up_description.length}/500</p>
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

UpdateBook.propTypes = {
    bookId: PropTypes.string
}

export default UpdateBook
