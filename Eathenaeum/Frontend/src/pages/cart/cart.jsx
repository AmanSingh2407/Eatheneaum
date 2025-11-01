import { useContext, useEffect, useState } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storecontextfile'
import { MutatingDots } from 'react-loader-spinner'
import { assets } from '../../assets/assets'
import { Helmet } from 'react-helmet'

const Cart = () => {

    const { bookList, cartData, url, removeCartItem } = useContext(StoreContext);
    const [bookDetails, setBookDetails] = useState([])

    useEffect(() => {
        if (!(bookList.length == 0)) {
            setBookDetails([])
            cartData.forEach((element) => {
                bookList.map((item) => {
                    if (element == item._id) {
                        setBookDetails((prev) => [...prev, item])
                    }
                })
            })
        }
    }, [cartData, bookList])

    document.title = "Cart"

    return (
        !(bookList.length === 0) ?

            !(cartData.length === 0) ?
                <div className='cart'>
                    <Helmet>
                        <title>Cart</title>
                    </Helmet>
                    <div className="cart-box">
                        <div className='cart-box-head cart-box-design'>
                            <p>Items</p>
                            <p>Title</p>
                            <p>Organization</p>
                            <p>Price</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />
                        {
                            bookDetails.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className='cart-box-head  cart-box-item'>
                                            <img src={`${url}/images/${item.bookCoverImgName}`} alt="" />
                                            <p>{item.title}</p>
                                            <p>{item.organizationName}</p>
                                            <p>{item.price}</p>
                                            <p className='cross' onClick={() => removeCartItem(item._id)}>x</p>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* <div className="cart-pay a-flex">
                        <div className="cart-pay-code">
                            <h2>I have promocode</h2>
                            <div className="cart-pay-code-box d-flex">
                                <input type="text" name='promocode' placeholder='promocode' />
                                <button className='cart-btn'>Add</button>
                            </div>
                        </div>

                        <div className="cart-pay-payment">
                            <div className='a-flex'>
                                <p>Subtotal(Inc. tax) :</p>
                                <p>₹100</p>
                            </div>
                            <hr />
                            <div className='a-flex'>
                                <p>Promocode(-20%) :</p>
                                <p>₹30</p>
                            </div>
                            <hr />
                            <div className='a-flex'>
                                <p>Total :</p>
                                <p>₹70</p>
                            </div>
                            <button className='cart-btn'>PROCEED TO CHEAKOUT</button>
                        </div>
                    </div> */} 
                </div>
                : <div className='cart-notFound'>
                    <img src={assets.error_404} alt="" />
                    <p>Not Found</p>
                </div>
            :
            <div className='fe-loading'>
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#e0341d"
                    secondaryColor="#333"
                    radius="15"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
    )
}

export default Cart