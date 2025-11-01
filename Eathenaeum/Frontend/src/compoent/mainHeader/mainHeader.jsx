import { assets } from '../../assets/assets'
import './mainHeader.css'

const MainHeader = () => {
    return (
        <div className='header'>
            <div className="header-container">
                <div className="header-content">
                    <h1>Latest <br /> Streamlined <br /> For All</h1>
                    <p>A unified learning space without boundaries-where knowledge transcends language, academia and industry unite to shape the future.</p>
                    <a href="#" className="button">E-learning platform</a>
                </div>
                <div className="header-image-container">
                    <img src={assets.header_image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default MainHeader
