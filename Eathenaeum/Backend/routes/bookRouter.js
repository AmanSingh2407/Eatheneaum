import express from 'express';
import multer from 'multer';
import { addBook, removeBook, editBook, listBook, getOrglistBook, bookVerify, buyBook } from '../controller/bookcon.js';
import { queryTokenMiddl, tokenMiddl } from '../meddleware/tokenAuth.js';
import { PDFUploadMiddl } from '../meddleware/PDFAuth.js';


const bookRouter = express.Router();

// Define storage configurations for both images and PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';
        if (file.mimetype.startsWith('image/')) {
            folder = 'uploads/images';
        } else if (file.mimetype === 'application/pdf') {
            folder = 'uploads/pdfs';
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File filter to validate the type of files uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only image files and PDFs are allowed!'), false);
    }
};

// Multer configuration with combined storage and limits
const upload = multer({
    storage: storage,
    limits: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            return { fileSize: 1 * 1024 * 1024 }; // 1MB limit for images
        } else if (file.mimetype === 'application/pdf') {
            return { fileSize: 30 * 1024 * 1024 }; // 30MB limit for PDFs
        }
        cb(new Error('Invalid file type'), false);
    },
    fileFilter: fileFilter
});



// Route for adding a book with both images and PDF
bookRouter.post('/add', upload.fields([
    { name: 'images', maxCount: 2 },
    { name: 'pdf', maxCount: 1 }
]), PDFUploadMiddl, addBook);

bookRouter.post('/edit', tokenMiddl, editBook);
bookRouter.post('/remove', tokenMiddl, removeBook);

bookRouter.get('/org-books-list', queryTokenMiddl, getOrglistBook);
bookRouter.post('/buy', tokenMiddl, buyBook);

bookRouter.get('/list', listBook);
bookRouter.post('/book-verify', tokenMiddl, bookVerify);

export default bookRouter;
