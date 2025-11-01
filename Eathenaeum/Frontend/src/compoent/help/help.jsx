import { useContext, useState } from 'react'
import './help.css'
import { StoreContext } from '../../context/storecontextfile'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

const Help = () => {

  const { isValidName, isValidEmail, url } = useContext(StoreContext)
  const [helpData, setHelpData] = useState({
    mesName: "",
    mesEmail: "",
    mesMessage: ""
  })


  const onEventHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHelpData((prev) => ({ ...prev, [name]: value }))

  }

  const onHelp = async (event) => {
    event.preventDefault()
    Object.keys(helpData).forEach((key) => {
      helpData[key] = helpData[key].toString().toLowerCase().trim();
    })

    if (helpData.mesName.length > 60)
      return toast.error("Name should be less than 60 character")
    if (helpData.mesEmail.length > 100)
      return toast.error("Email should be less than 100 character")
    if (helpData.mesMessage.length > 500)
      return toast.error("Message should be less than 500 character")

    if (!isValidName(helpData.mesName) || !isValidEmail(helpData.mesEmail))
      return
    const res = await axios.post(url + '/api/message/help', helpData)
    if (res.data.success) {
      toast.success(res.data.message)
      setHelpData({
        mesName: "",
        mesEmail: "",
        mesMessage: ""
      })
    } else {
      toast.error(res.data.message)
    }
  } 

  return (
    <div className='help'>
      <Helmet>
        <title>Help</title>
      </Helmet>
      <div className='help-form'>
        <form onSubmit={onHelp} >
          <h2>Having any Problem?</h2>
          <div className='help-form-inputBox'>
            <label htmlFor="">Name</label>
            <input type="text" name="mesName" id="help-name" onChange={onEventHandler} value={helpData.name} placeholder='Enter your full name' autoComplete='off' required />
          </div>
          <div className='help-form-inputBox'>
            <label htmlFor="">Email</label>
            <input type="email" name="mesEmail" id="help-email" onChange={onEventHandler} value={helpData.mesEmail} placeholder='Enter your email' autoComplete='off' required />
          </div>
          <div className='help-form-inputBox'>
            <label htmlFor="">Message</label>
            <textarea name="mesMessage" id="help-message" cols="30" rows="10" onChange={onEventHandler} value={helpData.mesMessage} placeholder='Enter your problem' required></textarea>
            <p style={helpData.mesMessage.length > 500 ? { color: "red" } : {}} >Charaters : {`${helpData.mesMessage.length}/500`}</p>
          </div>
          <div className='help-form-btn'>
            <button className='btn' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Help
