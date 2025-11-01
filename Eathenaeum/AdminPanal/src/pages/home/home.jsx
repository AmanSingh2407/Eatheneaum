import './home.css'
import { assets } from '../../assets/assets.js'
import { useContext, useState } from 'react'
import { StoreContexts } from '../../context/contextFile.jsx'
import { MutatingDots } from 'react-loader-spinner'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Home = () => {

    const { url, orgPDFs, DateFormat, adminUser, adminToken } = useContext(StoreContexts);
    const [PDFDelete, setPDFDelete] = useState({
        id: "",
        bookName: ""
    })

    const onShowDes = (index) => {
        var description = document.getElementById(`home-pdf-bottomBox-des-${index}`)
        var arrow = document.getElementById(`arrowIcon-${index}`)
        description.classList.toggle("hidden");
        arrow.classList.toggle("rotate");
    }

    const onDelete = async () => {
        const token = adminToken;
        const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/remove`, { id: PDFDelete.id }, { headers: { token } })
        if (res.data.success) {
            toast.success(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
        else {
            toast.error(res.data.message)
        }
        setPDFDelete({ id: "", bookName: "" })
    }

  

    const openInNewTab = (path) => {
        // Construct the full URL using window.location.origin
        const fullPath = `${window.location.origin}${path}`;
        window.open(fullPath, '_blank'); // Opens the route in a new tab
    };


    return (
        <>
            {!PDFDelete.id ? <></>
                : <div className='home-delete-conf'>
                    <h4>Delete</h4>
                    <span>{PDFDelete.bookName}</span>
                    <div>
                        <button type='button' onClick={() => setPDFDelete({ id: "", bookName: "" })}>Cancel</button>
                        <button type='button' onClick={onDelete}>Ok</button>
                    </div>
                </div>}


            {adminUser.organization ?
                adminUser.organization.verify ?
                    orgPDFs ?
                        <div className='home'>
                            {
                                orgPDFs.map((book, index) => {
                                    return (
                                        <div key={index} className='home-pdf'>
                                            <div className='home-pdf-top'>
                                                <img src={`${url}/images/${book.bookCoverImgName}`} alt="Cover Image" />
                                                <div className='home-pdf-top-con'>
                                                    <h2><span>{book.title}</span><img src={book.verify ? assets.verifed : assets.noverifed} alt="" /> </h2>
                                                    <div> <span>Price</span> : <span>{book.price === 0 ? <b style={{ color: 'red' }}>Free</b> : `₹ ${book.price}`}</span> </div>
                                                    <div> <span>Total Sell</span> : <span>{book.sellUnits} Units</span> </div>
                                                    <div> <span>Payment Units</span> : <span>{book.paymentUnits} Units</span> </div>
                                                    <div> <span>Pages </span> : <span>{book.pageNumber}</span> </div>
                                                    <div> <span>PDF URl</span> : <span><Link to={`http://localhost:5173/pdf/${book.pdfURL}`} target='_blank' onClick={() => openInNewTab(`http://localhost:5173/pdf/${book.pdfURL}`)}>View</Link></span> </div>
                                                    <div className='home-pdf-top-con-date'>
                                                        <div> <span className='home-red'>Date</span> : <span>{DateFormat(book.postDate)}</span> </div>
                                                        <div> <span className='home-blue'>Update Date</span> : <span>{book.updateDate ? DateFormat(book.updateDate) : "Not updated"}</span> </div>
                                                    </div>
                                                </div>
                                                {adminUser.organization.createBy == adminUser._id ? <div className="home-pdf-top-btn">
                                                    <Link to={`/uploadpdf/${book._id}`}><button type='button' className='ad-btn-update'>Update</button></Link>
                                                    <button type='button' className='ad-btn-delete' onClick={() => { setPDFDelete({ id: book._id, bookName: book.title }); window.scrollTo(0, 0) }}>Delete</button>
                                                </div> : <></>}
                                            </div>
                                            <div className='home-pdf-bottomBox'>
                                                <div className="home-pdf-bottomBox-des-show" onClick={() => onShowDes(index)}>
                                                    <p id="text">Description</p>
                                                    <img id={`arrowIcon-${index}`} className="rotate" style={{ width: "15px" }} src={assets.arrow} alt="arrow" />
                                                </div>
                                                <div id={`home-pdf-bottomBox-des-${index}`} className="hidden home-pdf-des" name='pdf'>
                                                    {book.description}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : <div className='ad-Loading'>
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
                    : <div className='app-org-bock'>
                        <img src={assets.orgBlock} alt="" />
                        <p>Organization is not verified</p>
                    </div>
                : <div className='home-no-organization'>
                    <span>You are not currently affiliated with any organizations. To get started, please create an organization.</span>
                </div>
            }
        </>)
}

export default Home
