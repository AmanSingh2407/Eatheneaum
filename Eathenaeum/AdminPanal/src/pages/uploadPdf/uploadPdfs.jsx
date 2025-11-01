import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './uploadPdfs.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContexts } from '../../context/contextFile';
import { useParams } from 'react-router-dom';
import UpdateBook from '../../components/updatebook/updateBook';

const UploadPdf = () => {

    const { task } = useParams()

    const { url, adminToken, validateImage, adminUser } = useContext(StoreContexts)
    const [imgCover, setImgCover] = useState("")
    const [imgIndex, setImgIndex] = useState("")


    const [dataPDF, setDataPDF] = useState({
        PDFtitle: "",
        PDFdescription: "",
        PDFprice: "",
        PDFPageNumber: "",
        pdf: ""
    })

    const onChangeHandlerPdf = (event) => {
        const name = event.target.name;
        let value;
        if (name === 'pdf') {
            value = event.target.files[0];
        } else
            value = event.target.value;

        setDataPDF((data) => ({ ...data, [name]: value })) 
    }

    const onSubmitPdf = async (event) => {
        event.preventDefault()
        const token = adminToken;

        Object.keys(dataPDF).forEach((key) => {
            if (!(key === 'pdf')) {
                dataPDF[key] = dataPDF[key].toString().toLowerCase().trim();
            }
        })
        if (dataPDF.PDFtitle.length > 100)
            return toast.error("Title length is greater than 100")
        if (dataPDF.PDFdescription.length > 500)
            return toast.error("Description length is greater than 500")
        if (dataPDF.PDFprice > 300)
            return toast.error("Price should be less than Rs 300")

        const imgCoverValid = validateImage(imgCover);
        const imgIndexValid = validateImage(imgIndex);
        if (!imgCoverValid.valid)
            return toast.error(imgCoverValid.message)
        if (!imgIndexValid.valid)
            return toast.error(imgIndexValid.message)
        const pdfFormData = new FormData()
        pdfFormData.append("title", dataPDF.PDFtitle);
        pdfFormData.append("description", dataPDF.PDFdescription);
        pdfFormData.append("price", Number(dataPDF.PDFprice))
        pdfFormData.append("pageNumber", Number(dataPDF.PDFPageNumber))
        pdfFormData.append("images", imgCover)
        pdfFormData.append("images", imgIndex)
        pdfFormData.append("pdf", dataPDF.pdf)

        const res = await axios.post(`${url}${import.meta.env.VITE_APP_BOOKS_PATH}/add`, pdfFormData, { headers: { token } })
        if (res.data.success) {
            setDataPDF({
                PDFtitle: "",
                PDFdescription: "",
                PDFprice: "",
                PDFPageNumber: ""
            })
            window.location.reload()
            toast.success(res.data.message);
        }
        else
            toast.error(res.data.message)

    }

    return (
        task === 'add' ?
            adminUser.organization.verify ?
                <div className='uploadpdf' onSubmit={onSubmitPdf}>
                    {/* <div className="uploadpdf-left a-flex">
                        // img upload
                    </div> */}
                    <div className="uploadpdf-right">
                        <h2>PDF Upload Form</h2>
                        <form>
                            <div className='uploadpdf-right-input'>
                                <label htmlFor="">Title ( only book name )</label>
                                <input className='form-input' onChange={onChangeHandlerPdf} value={dataPDF.PDFtitle} type="text" placeholder='Enter book title' name='PDFtitle' required />
                                <p style={dataPDF.PDFtitle.length > 100 ? { color: "red" } : {}} >{dataPDF.PDFtitle.length}/100</p>
                            </div>
                            <div className='uploadpdf-right-input'>
                                <label htmlFor="">Description (only book details)</label>
                                <textarea className='form-input' onChange={onChangeHandlerPdf} value={dataPDF.PDFdescription} name="PDFdescription" rows='10' placeholder='Enter Description' required></textarea>
                                <p style={dataPDF.PDFdescription.length > 500 ? { color: "red" } : {}}>{dataPDF.PDFdescription.length}/500</p>
                            </div>
                            <div className='d-flex gap-10 '>
                                <div className="uploadpdf-form-price">
                                    <label htmlFor="book-price">Price (in rupee):</label>
                                    <input className='form-input' onChange={onChangeHandlerPdf} value={dataPDF.PDFprice} type="number" name="PDFprice" id='book-price' placeholder='Price' required />
                                </div>
                                <div className="uploadpdf-form-price">
                                    <label htmlFor="book-pageNumber">Pages (in PDF):</label>
                                    <input className='form-input' onChange={onChangeHandlerPdf} value={dataPDF.PDFPageNumber} type="number" name="PDFPageNumber" id='book-pageNumber' placeholder='Total Pages' required />
                                </div>
                            </div>
                            <div className='uploadpdf-form-Img '>
                                <div className="add-img-upload">
                                    <p>Upload Book Cover Image</p>
                                    <label htmlFor="PDF-ImgCover">
                                        <img className='upload_cover' src={imgCover ? URL.createObjectURL(imgCover) : assets.upload_area} alt="" />
                                        <p style={{ color: "blue" }}>{imgCover.name}</p>
                                    </label>
                                    <input onChange={(e) => setImgCover(e.target.files[0])} type="file" id='PDF-ImgCover' accept='image/*' hidden required />
                                </div>
                                <div className="add-img-upload">
                                    <p>Upload Book Index Image</p>
                                    <label htmlFor="PDF-ImgIndex">
                                        <img className='upload_cover' src={imgIndex ? URL.createObjectURL(imgIndex) : assets.upload_area} alt="" />
                                        <p style={{ color: "blue" }}>{imgIndex.name}</p>
                                    </label>
                                    <input onChange={(e) => setImgIndex(e.target.files[0])} type="file" id='PDF-ImgIndex' accept='image/*' hidden required />
                                </div>
                            </div>
                            <div className='uploadpdf-form-pdf'>
                                <label htmlFor="book-pdf">Upload PDF</label>
                                <input onChange={onChangeHandlerPdf} type="file" name="pdf" id='book-pdf' accept='application/pdf' />
                            </div>
                            <button className='upload-pdf-btn' type='submit'>Upload</button>
                        </form>
                    </div>
                </div>
                : <div className='app-org-bock'>
                    <img src={assets.orgBlock} alt="" />
                    <p>Organization is not verified</p>
                </div>

            : <UpdateBook bookId={task} />
    )
}

export default UploadPdf;
