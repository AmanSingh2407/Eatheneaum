import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './homeInfo.css'
import { StoreContext } from '../../context/storecontextfile';
import { useContext } from 'react';


const HomeInfo = () => {

    const { resetScroll } = useContext(StoreContext);

    return (
        <div className='homeInfo' >
            <div className='homeInfo-BC'>
                <h3>Benefits To Chose Us!</h3>
                <p className='homeInfo-BC-des'> An online e-learning platform website or app offers 24/7 access to a vast collection of books, articles, and
                    research materials. It eliminates the need for physical visits, saves time, and provides easy
                    search and discovery features. Users can access content from anywhere with an internet
                    connection, fostering a love for reading and learning.
                </p>
                <div className='homeInfo-BC-box'>
                    <div>
                        <img src={assets.access_user} />
                        <p>Users can access the platform anytime, anywhere, as long as they have an internet connection.</p>
                    </div>
                    <div>
                        <img src={assets.collection_book} />
                        <p>Online e-learning platform can house a much larger collection of books often including rare and out-of-print materials.</p>
                    </div>
                    <div>
                        <img src={assets.world_location} />
                        <p> Users can access the platform from anywhere in the world, making it ideal  for students, researchers, and those living in remote areas</p>
                    </div>
                    <div>
                        <img src={assets.cost_effective} />
                        <p>  Online e-learning platform can be more cost-effective for users, as they often offer free or low-cost access to resources</p>
                    </div>
                </div>
            </div>
            <div className='homeInfo-aboutUs'>
                <div>
                    <h4>ABOUT US!</h4>
                    <p className='homeInfo-aboutUs-des1'>READY TO HELP YOU WITH YOUR EXAM</p>
                    <p className='homeInfo-aboutUs-des2' >Welcome to E-Athenaeum, your ultimate destination for high-quality, student-created notes. Born from the idea that shared knowledge empowers us all, we are dedicated to transforming the way students learn and succeed in their academic journeys.</p>
                    <Link onClick={resetScroll} to='/about'>VIEW MORE</Link> 
                </div>
                <img src={assets.aboutUs_Cover} alt="" />
            </div>

        </div>
    )
}



export default HomeInfo
