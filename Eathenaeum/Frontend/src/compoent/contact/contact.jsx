import './contact.css'
import { contactInfo } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/storecontextfile'
import { Helmet } from 'react-helmet'

const Contact = () => {

    const { resetScroll } = useContext(StoreContext)

    return (
        <div className="contact">
            <Helmet>
                <title>Contact</title>
            </Helmet>
            <h2 className='contact-main-h2'>Want to Get in Touch?</h2>
            <p className='contact-main-p' >We are happy to hear from you.Whats on your minds</p>
            <hr />
            <div className="contact-options">
                {
                    contactInfo.map((item, index) => {
                        return (
                            <div key={index} className="contact-option">
                                <img src={item.logo_icon} width="100" alt="" />
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <Link onClick={resetScroll} to={`/contact/${item.link}`} > Visit </Link>
                            </div>
                        )
                    })}

            </div>
        </div>
    )
}

export default Contact;
