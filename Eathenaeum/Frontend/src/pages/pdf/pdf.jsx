import './pdf.css'
import { Document, Page } from 'react-pdf';
import { useState, useRef, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/storecontextfile';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Create Document Component
const MyDocument = () => {

    let { filename } = useParams();
    let pageNo = 1;
    const { url, setOffNavFoot, bookList, token } = useContext(StoreContext)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [PDFDetails, setPDFDetails] = useState("")
    const [PDFFile, setPDFFile] = useState("")

    const pdfContainerRef = useRef(null);


    useEffect(() => {
        return () => {
            if (PDFFile) {
                window.URL.revokeObjectURL(PDFFile); // Clean up the URL when the component is unmounted
            }
        };
    }, [PDFFile]);


    useEffect(() => {
        if (!PDFDetails) {
            if (bookList) {
                bookList.map((book) => {
                    if (book.pdfURL === filename) {
                        setPDFDetails(book)
                    }
                })
            }
        }
        if (bookList && token && PDFDetails) { 
            fetchPDFData(token)
        }
    }, [bookList, token, PDFDetails])

    const fetchPDFData = async (token) => {
        try {
            const res = await axios.get(`${url}${import.meta.env.VITE_APP_PDF_PATH}/${filename}?bookId=${PDFDetails._id}`, {
                headers: { token },
                responseType: 'blob',  // Ensure the response is treated as a binary file
            });

            if (res.status === 200)
                setPDFFile(res.data);

        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        setOffNavFoot(true)
      
        // Full Screen method
        document.getElementById('fullscreenButton').addEventListener('click', function () {
            const element = document.documentElement;

            if (element.requestFullscreen) {
                element.requestFullscreen().catch(err => {
                    console.error("Error attempting to enable full-screen mode:", err);
                });
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen().catch(err => {
                    console.error("Error attempting to enable full-screen mode:", err);
                });
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
                element.webkitRequestFullscreen().catch(err => {
                    console.error("Error attempting to enable full-screen mode:", err);
                });
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen().catch(err => {
                    console.error("Error attempting to enable full-screen mode:", err);
                });
            } else {
                console.error("Fullscreen API is not supported.");
            }
        });
 
    }, []);



    function exitFullscreen() {
        // Exit  Screen method
        document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }


    const handleScroll = () => {
        const pdfHeight = pdfContainerRef.current.querySelector(`canvas.react-pdf__Page__canvas`).height - 100;
        const newScrollYPosition = window.scrollY;
        const scrollValue = Math.ceil(newScrollYPosition / pdfHeight);

        if (pageNo != scrollValue && scrollValue != 0) {
            setPageNumber(scrollValue)
            pageNo = scrollValue;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const scrollToPage = (page) => {
        if (0 <= page && page <= numPages) {
            const pageElement = pdfContainerRef.current.querySelector(`.react-pdf__Page[data-page-number="${page}"]`);
            if (pageElement) {
                pageElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const onSearchPage = (event) => {
        const value = event.target.value;
        scrollToPage(Number(value));
    }
    const onChangeHandler = (event) => {
        const value = event.target.value;
        setPageNumber(value);
    }

    const ZoomIn = () => {
        if (0.4 <= scale && scale < 2.4) {
            setScale(prevScale => prevScale + 0.2);
        }
    }

    const ZoomOut = () => {
        if (0.4 < (scale).toFixed(2) && scale <= 2.4) {
            setScale(prevScale => prevScale - 0.2);
        }
    }


    /* -----------------------------    Scroll Page   ---------------------------------------------       */

    return (
        <div className='myDocument'>
            <nav className='myDocument-navbar d-flex'>
                <h3>{PDFDetails.title}</h3>
                <div className="myDocument-page-info d-flex">
                    <div className='myDocument-pdf-info d-flex'>
                        <span>Page</span>
                        <input type="text" onChange={onChangeHandler} onBlur={onSearchPage} value={pageNumber} id='inpPageNo' />
                        <span> Of</span>
                        <span>{numPages}</span>
                    </div>
                    <div className="myDocument-resize d-flex">
                        <button onClick={ZoomIn}><img src={assets.plus} /></button>
                        <p>{(scale * 100).toFixed(0)}%</p>
                        <button onClick={ZoomOut}><img src={assets.minus} /></button>
                    </div>
                </div>
                <div className='myDocument-btn d-flex' >
                    <button className='btn' onClick={exitFullscreen}>Min Screen</button>
                    <button className='btn' id="fullscreenButton">Max Screen</button>
                </div>
            </nav>
            <div className="myDocument-box" ref={pdfContainerRef}   >
                <Document file={PDFFile} onLoadSuccess={onDocumentLoadSuccess} >
                    {Array.from(
                        new Array(numPages),
                        (element, index) => (
                            <Page
                                id='pdf-viewer'
                                className="pdf-page"
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                scale={scale}
                            />
                        )
                    )}
                </Document>
            </div>

        </div>
    )

}


export default MyDocument