import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import 'dotenv'




const PDFDataMiddl = async (req, res, next) => {

    const { token } = req.headers;
    const bookId = req.query.bookId;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code);
        req.body.userId = token_decode.id;

        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User doesn't exist" });
        }

        const bookPurchased = await user.buyBook.some((book) => book.BookId.toString() === bookId);
        if (!bookPurchased) {
            return res.status(403).json({ success: false, message: "Book not purchased" });
        }

        next(); // Proceed if everything is valid
    } catch (error) {
        console.log('Middleware Error:', error);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};




const PDFUploadMiddl = (req, res, next) => {
    const { token } = req.headers;
    const { title, description, price } = req.body;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    try {

        if (title.length > 100)
            return res.json({ success: false, message: "Title length is greater than 100" })
        if (description.length > 500)
            return res.json({ success: false, message: "Description length is greater than 500" })
        if (Number(price) > 300)
            return res.json({ success: false, message: "Price should be less than Rs 300" })

        const token_decode = jwt.verify(token, process.env.JWT_SECRET_Code)
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })

    }
}

export { PDFDataMiddl, PDFUploadMiddl };