import './contactPage.css'
import { useParams } from 'react-router-dom'
import FeedbackFrom from '../../compoent/feedbackFrom/feedbackFrom'
import PropTypes from 'prop-types'
import Contact from '../../compoent/contact/contact'
import JoinFrom from '../../compoent/joinFrom/joinFrom'
import Help from '../../compoent/help/help' 

const Page = ({ page }) => {
    if (page == 'main') {
        return <Contact />
    }
    else if (page == 'feedback') {
        return <FeedbackFrom />
    }
    else if (page == 'join') {
        return <JoinFrom />
    }
    else if (page == 'help') {
        return <Help />
    }
    else{
        return <Contact />
    }
}


const ContactPage = () => {

    const { page } = useParams()

    document.title = "Contact Us"

    return (
        <div className='contactPage'> 
            <Page page={page} />
        </div>
    )
}

Page.propTypes = {
    page: PropTypes.string
}


export default ContactPage;
