import { useContext } from 'react';
import './bookCart.css';
import { StoreContext } from '../../context/storecontextfile';
import { Link } from 'react-router-dom';
import propType from 'prop-types'

const BookCart = ({ item }) => {

    const { url, resetFunction } = useContext(StoreContext);

    return (
        <div className='bookCart'>
            <Link to={`/product/${item._id}`} className="bookCart-card" onClick={resetFunction}>
                <div className="bookCart-card-img">
                    <img src={`${url}/images/${item.bookCoverImgName}`} alt="book photo" />
                    <div className="bookCart-card-img-overlayer">
                        <p href="#">Open Book</p>
                    </div>
                </div>
                <div className="bookCart-card-details" >
                    <h2>{item.title.length < 80 ? item.title : `${item.title.slice(0 , 80)}...` }</h2>
                    {/* <p><span><b className='bookCart-card-details-price'>{item.price === 0 ? <span className='bookCart-free-book'>Free</span> : `₹${item.price}`}</b></span></p> */}
                </div>
            </Link>
        </div>
    )
}

BookCart.propTypes = {
    // key: propType.number,
    item: propType.object
}

export default BookCart;
