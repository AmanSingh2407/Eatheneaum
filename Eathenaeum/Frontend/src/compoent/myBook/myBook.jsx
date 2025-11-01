import './myBook.css'
import { MutatingDots } from 'react-loader-spinner'
import { useContext } from 'react'
import { StoreContext } from '../../context/storecontextfile'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import DemoSyllabus from '../demoSyllabus/demoSyllabus'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

const MyBook = () => {

    const { url, userInfo, bookList, setOffNavFoot, resetFunction } = useContext(StoreContext)
    const [demoShow, setDemoShow] = useState("")

    const findBookDetails = (id) => {
        return bookList.find(element => element._id === id) || null;
    };

    const checkValidity = (time) => {
        const date = new Date(time)
        const today = new Date()
        const timeDifference = today.getTime() - date.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);

        let month = ((6 * 28) - Math.abs(dayDifference)) / 28;
        return Math.ceil(month);
    }

    function loadePage() {
        setOffNavFoot(false)
        resetFunction()
    }

    loadePage()

    return (
        !(Object.keys(userInfo).length === 0) ?
            !(userInfo.buyBook.length === 0) ?
                <>
                    {demoShow ? <DemoSyllabus setDemoShow={setDemoShow} demoShow={demoShow} /> : <></>}
                    <div className='myBook'>
                        <Helmet>
                            <title>My Book</title>
                        </Helmet>
                        <h2>My Book Collection </h2>
                        <p className='myBook-main-para'>Each book card includes a badge indicating its access validity period, such as `&quot;`Valid: 6 Month`&quot;` suggesting time-limited access to the content. there are buttons labeled `&quot;`Index`&quot;` and `&quot;`Open,`&quot;` allowing users to view the table of contents or open the book for reading.</p>
                        <hr />
                        <div className='myBook-cards'>
                            {
                                userInfo.buyBook.map((item, index) => {
                                    const book = findBookDetails(item.BookId);
                                    if (book) {
                                        return (
                                            <div key={index} className='myBook-card'>
                                                <div className='myBook-card-img'>
                                                    <img src={`${url}/images/${book.bookCoverImgName}`} alt="book" />
                                                </div>
                                                <div className='myBook-card-info'>
                                                    <h5>{book.title}</h5>
                                                    <div className='myBook-card-info-btn'>
                                                        <button className='btn' type='button' onClick={() => setDemoShow(book.bookIndexImgName)} >Index</button>
                                                        <button className='btn' type='button'><Link to={`/pdf/${book.pdfURL}`}>Open</Link></button>
                                                    </div>
                                                </div>
                                                <div className='myBook-validity'>
                                                    <span>Valid : {checkValidity(item.buyBookDate)} Months</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                </>
                : <div className='cart-notFound'>
                    <img src={assets.error_404} alt="" />
                    <p>Not Found</p>
                </div>
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

export default MyBook
