import { useContext, useState } from 'react'
import './feedbackFrom.css'
import { StoreContext } from '../../context/storecontextfile'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const FeedbackFrom = () => {

    const { isValidName, isValidEmail, url } = useContext(StoreContext)
    const [feedData, setfeedData] = useState({
        feedName: "",
        feedEmail: "",
        feedSubject: "",
        feedMessage: ""
    })

    const onChangeHandlerFeed = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setfeedData((perv) => ({ ...perv, [name]: value })) 
    }

    const onSubmitFeed = async (e) => {
        e.preventDefault()
        Object.keys(feedData).forEach((key) => {
            feedData[key] = feedData[key].toString().toLowerCase().trim();
        })

        if (!isValidName(feedData.feedName) || !isValidEmail(feedData.feedEmail))
            return
        if (feedData.feedMessage.length > 500 || feedData.feedMessage.length < 9) {
            toast.error("Message characters use between 10 and 500")
            return
        }
        if (feedData.feedSubject.length > 500 || feedData.feedSubject.length < 9) {
            toast.error("Message characters use between 10 and 100")
            return
        }

        const res = await axios.post(`${url}${import.meta.env.VITE_APP_MESS_PATH}/feedback`, feedData)
        if (res.data.success) {
            toast.success(res.data.message)
            setfeedData({
                feedName: "",
                feedEmail: "",
                feedSubject: "",
                feedMessage: ""
            })
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <div className='feedback'>
            <Helmet>
                <title>FeedBack</title>
            </Helmet>
            <form className="feedback-from" onSubmit={onSubmitFeed}>
                <h2>Feedback Form</h2>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" name='feedName' onChange={onChangeHandlerFeed} value={feedData.feedName} placeholder='Enter your full name' autoComplete='off' required />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" name='feedEmail' onChange={onChangeHandlerFeed} value={feedData.feedEmail} placeholder='example@gmail.com' autoComplete='off' required />
                </div>
                <div>
                    <label htmlFor="">Subject</label>
                    <input type="text" name='feedSubject' onChange={onChangeHandlerFeed} value={feedData.feedSubject} placeholder='Subject' autoComplete='off' required />
                    <p style={feedData.feedSubject.length > 100 ? { color: "red" } : {}} >{`${feedData.feedSubject.length}/100`}</p>
                </div>
                <div>
                    <label htmlFor="">Message</label>
                    <textarea rows='10' name='feedMessage' onChange={onChangeHandlerFeed} value={feedData.feedMessage} placeholder='Share your exprience us..' required></textarea>
                    <p style={feedData.feedMessage.length > 500 ? { color: "red" } : {}} >Charaters : {`${feedData.feedMessage.length}/500`}</p>
                </div>
                <button className='btn' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FeedbackFrom
