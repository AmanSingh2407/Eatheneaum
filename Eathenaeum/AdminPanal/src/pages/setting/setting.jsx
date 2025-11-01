 
import './setting.css' 

const Setting = () => {
 

    return (
        <div className='setting'>
            <div className='setting-box'>
                <p>Become a Member option</p>
                <label className="setting-box-switch">
                    <input type="checkbox" />
                    <span className="setting-box-slider setting-box-round"></span>
                </label>
            </div> 
        </div>
    )
}

export default Setting
