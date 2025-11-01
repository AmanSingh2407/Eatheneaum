import './productpage.css'
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/storecontextfile';
import BookCart from '../../compoent/bookdisplay/bookCart';
import DemoSyllabus from '../../compoent/demoSyllabus/demoSyllabus';
import { MutatingDots } from 'react-loader-spinner'
import axios from 'axios';
import { toast } from 'react-toastify';


const Product = () => {

  const [bookDetails, setBookDetails] = useState({})
  const [demoShow, setDemoShow] = useState("")
  const { bookList, url, addTOCart, token, userInfo, setOffNavFoot, resetFunction } = useContext(StoreContext);
  const { id } = useParams();


  const onBuyBook = async (Id, state) => {
    if (state === 'Buy') {
      const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/buy`, { bookId: Id }, { headers: { token } })
      if (res.data.success) {
        toast.success("Successfuly Buy")
        window.location.reload()
      } else
        toast.error(res.data.message)
    } else
      toast.error("already buy")
  }


  useEffect(() => {
    if (!(bookList.length == "")) {
      setOffNavFoot(false)
      resetFunction()
      bookList.map((item) => {
        if (id == item._id) {
          document.title = item.title.charAt(0).toUpperCase() + item.title.slice(1)
          setBookDetails(item)
        }
      })
    }
  }, [id, bookList, resetFunction, setOffNavFoot])


  const cheakBuyBook = (id) => {
    var mess = 'Buy';
    if (Object.keys(userInfo).length > 0) {
      userInfo.buyBook.map((book) => {
        if (book.BookId === id)
          mess = "Open"
      })
    }
    return mess
  }



  const openInNewTab = (path) => {
    // Construct the full URL using window.location.origin
    const fullPath = `${window.location.origin}${path}`;
    window.open(fullPath, '_blank'); // Opens the route in a new tab
  };




  return (
    id && !(bookList.length === 0) ?
      <>
        {demoShow ? <DemoSyllabus setDemoShow={setDemoShow} demoShow={demoShow} /> : <></>}
        <div className='product' >

          <div className='product-link'>
            <div className="product-link-image">
              <img src={`${url}/images/${bookDetails.bookCoverImgName}`} />
            </div>
            <div className='product-link-details'>
              <h2 className='product-title'>{bookDetails.title}</h2>
              <p className='product-description'>{bookDetails.description}</p>
              <p className=''>{bookDetails.pageNumber} Pages </p>
              <p className='product-price'> Organization : {bookDetails.organizationName}</p>
              <p className='product-price'> Price :  <b> {bookDetails.price === 0 ? <span className='product-free' >Free</span> : <span style={{ color: 'blue' }}>₹{bookDetails.price}</span>} </b></p>
              <div className="product-link-details-btn">

                <button className='btn' onClick={() => setDemoShow(bookDetails.bookIndexImgName)}>Index</button>
                <button className='btn' onClick={() => addTOCart(bookDetails._id)}>Cart</button>
                {cheakBuyBook(id) === 'Open' ?
                  <Link to={`/pdf/${bookDetails.pdfURL}`} target="_blank" onClick={() => openInNewTab(`/pdf/${bookDetails.pdfURL}`)} style={{ color: '#ffff' }}><button className='btn'>Open</button></Link>
                  : <button className='btn' onClick={() => { onBuyBook(id, cheakBuyBook(id)) }}>Buy</button>
                }

              </div>
            </div>
          </div>

          {/* -------------- Related Products ----------- */}
          <div className="product-related">
            <h2 className='product-related-main-h2'>Related Books</h2>
            <div className="product-related-books">
              {bookList.map((item, index) => {
                return <BookCart key={index} item={item} />
              })}
            </div>
          </div>

        </div>
      </>
      : <div className='fe-loading'>
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

export default Product 
