import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './demoSyllabus.css'
import PropTypes from 'prop-types'
import { StoreContext } from '../../context/storecontextfile';

const DemoSyllabus = ({ setDemoShow, demoShow }) => {

    const { url } = useContext(StoreContext)

    return (
        <div className='demoSyllabus'>
            <div className='demoSyllabus-container'>
                <div className='demoSyllabus-container-header'>
                    <h2>Syllabus</h2>
                    <img src={assets.close_btn} alt="Index Page" onClick={() => setDemoShow("")} />
                </div>
                <hr /> 
                <img src={`${url}/images/${demoShow}`} alt="Syllabus" />
            </div>
        </div>
    )
}

DemoSyllabus.propTypes = {
    setDemoShow: PropTypes.func,
    demoShow: PropTypes.string
}

export default DemoSyllabus;
