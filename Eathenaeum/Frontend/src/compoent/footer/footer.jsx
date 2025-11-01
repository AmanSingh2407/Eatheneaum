import { Link } from 'react-router-dom'
import './footer.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storecontextfile'

const Footer = () => {

    const { resetScroll } = useContext(StoreContext)

    return (
        <div >
            <footer className='footer'>
                <div className="footer-container">
                    <div className="footer-logo-info">
                        <h3>E-Athenaeum</h3>
                        <p>At E-Athenaeum, we are committed to making knowledge accessible to everyone. Explore a vast library of digital resources, e-books, etc.. are designed to empower learners and professionals alike. Join us on a journey to expand your horizons and unlock new opportunities for growth.</p>
                    </div>
                    <div className="footer-link-box">
                        <div className="footer-link-info">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><Link to='/contact/help' onClick={resetScroll}>Help</Link></li>
                                <li><Link to='/contact/feedback' onClick={resetScroll}>Feedback</Link></li>
                            </ul>
                        </div>
                        <div className="footer-link-info">
                            <h3>Resources</h3>
                            <ul>
                                <li><Link to='/about' onClick={resetScroll}>About Us</Link></li>
                                <li><Link to="/contact/main" onClick={resetScroll}>Contact Us</Link></li>
                                <li><Link to="/contact/privacy-policy" onClick={resetScroll}>Privacy Policy</Link></li>
                                <li><Link to='/terms-condition' onClick={resetScroll}>Terms & Conditions</Link></li>
                            </ul>
                        </div>
                        <div className="footer-link-info">
                            <h3>Follow Us</h3>
                            <ul>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>© Copyright 2024. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
