import { useContext } from 'react'
import { assets } from '../../assets/assets'
import './pdfReq.css'
import { StoreContexts } from '../../context/contextFile'
import { MutatingDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const PDFRequeste = () => {

    const { url, orgPDFs, orgs, DateFormat, adminToken, bookVerify, adminUser, homeRerender } = useContext(StoreContexts)

    const showMoreDetails = (index) => {
        document.getElementById(`pdfReq-rotate-${index}`).classList.toggle('rotate')
        document.getElementById(`moreinfo-pdf-${index}`).classList.toggle('hidden')
    }

    const openInNewTab = (path) => {
        // Construct the full URL using window.location.origin
        const fullPath = `${window.location.origin}${path}`;
        window.open(fullPath, '_blank'); // Opens the route in a new tab
      };
    
    

    return (
        orgPDFs && orgs ?
            (adminUser.role === import.meta.env.VITE_APP_SECRET_ID) ?
                <div className='userReq'>
                    <h2 className='userReq-h2'>PDF List</h2>
                    <div className='userReq-head PDFReq-table'>
                        <p>Cover</p>
                        <p>Title</p>
                        <p>Created By</p>
                        <p>Price</p>
                        <p>Upload Date</p>
                        <p>Verifed</p>
                    </div>

                    {
                        orgPDFs.map((book, index) => {
                            return (
                                <div key={index} className='userReq-box'>
                                    <div className='userReq-box-user PDFReq-table'>
                                        <img className='PDFBox-img' src={`${url}/images/${book.bookCoverImgName}`} alt="Profile Image" />
                                        <p>{book.title}</p>
                                        <p>{book.organizationName}</p>
                                        <p>₹{book.price}</p>
                                        <p>{DateFormat(book.postDate)}</p>
                                        {
                                            book.verify ?
                                                <button type='button' id='userReq-green' onClick={() => bookVerify(adminToken, book._id)}><img src={assets.accept} alt="accept" /></button>
                                                : <button type='button' id='userReq-red' onClick={() => bookVerify(adminToken, book._id)}><img src={assets.reject} alt="reject" /></button>
                                        }
                                    </div>
                                    <div className='userReq-box-details'>
                                        <div className="userReq-box-details-view" onClick={() => showMoreDetails(index)} >
                                            <p id="text">More Details</p>
                                            <img id={`pdfReq-rotate-${index}`} className="rotate" style={{ width: "15px" }} src={assets.arrow} alt="arrow" />
                                        </div>
                                        <div id={`moreinfo-pdf-${index}`} className="userReq-more-details hidden" name='pdf'>
                                            <div>
                                                <h3>Details</h3>
                                                <div className='userReq-more-details-show'>
                                                    <div> <span className='userReq-bold'>PDF Link</span>  <span>:</span>   <span> <Link to={`http://localhost:5173/pdf/${book.pdfURL}`} target='_blank' onClick={()=> openInNewTab(`http://localhost:5173/pdf/${book.pdfURL}`)}>View</Link></span>     </div>
                                                    <div> <span className='userReq-bold'>Price</span>  <span>:</span>   <span>₹{book.price}</span>     </div>
                                                    <div> <span className='userReq-bold'>Date</span>  <span>:</span>   <span>{DateFormat(book.postDate)}</span>     </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3>Description</h3>
                                                <div className='userReq-more-details-show'>
                                                    {book.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                : homeRerender()
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
    )
}

export default PDFRequeste
