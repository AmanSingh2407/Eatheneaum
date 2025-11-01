import BookModel from "../models/bookModel.js";
import fs from 'fs'
import adminUserModel from '../models/adminUserModel.js'
import OrgModel from "../models/organizationModel.js";
import userModel from "../models/userModel.js";



// add Book Function 
const addBook = async (req, res) => {
    const { title, description, price, userId, pageNumber } = req.body;

    const img_cover = req.files['images'][0]
    const img_index = req.files['images'][1]
    const pdfFile = req.files['pdf'][0]

    const bookList = [];
    try {

        const user = await adminUserModel.findById(userId);
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        if (!user.organization)
            return res.json({ success: false, message: "User not part of Orgnization" })

        const organization = await OrgModel.findById(user.organization)
        if (!organization)
            return res.json({ success: false, message: "Organization not exist" })

        if (!(user._id.toString() == organization.createBy.toString()))
            return res.json({ success: false, message: "User not leader" })

        await organization.bookuploade.map((id) => {
            bookList.push(id)
        })

        const addbook = new BookModel({
            title: title,
            description: description,
            price: price,
            bookCoverImgName: img_cover.filename,
            bookIndexImgName: img_index.filename,
            pdfURL: pdfFile.filename,
            createById: organization._id,
            pageNumber: pageNumber,
            organizationName: organization.organization
        })

        const addBook = await addbook.save()
        if (addBook) {
            bookList.push(addBook._id)
            await OrgModel.findByIdAndUpdate(organization._id, { bookuploade: bookList })
            return res.json({ success: true, message: "Book add in Data Base Successfully" })
        }
        else
            return res.json({ success: true, message: "Book not add in Data Base" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


// Edit Book Function 
const editBook = async (req, res) => {
    const { userId, up_title, up_description, up_oldTitle, up_oldDescription, bookId } = req.body;
    const bookData = {}
    try {
        const user = await adminUserModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not exist" })
        }
        if (up_title) {
            bookData['title'] = up_title;
        }

        if (up_description) {
            bookData['description'] = up_description;
        }

        if (!user.organization) {
            return res.json({ success: false, message: "User is not part of the organization" })
        }

        const book = await BookModel.findByIdAndUpdate(bookId, bookData)
        if (!book) {
            return res.json({ success: false, message: "Book not exist" })
        }

        if (!(book.createById.toString() === user.organization.toString())) {
            const data = {
                title: up_oldTitle,
                description: up_oldDescription
            }
            await BookModel.findByIdAndUpdate(bookId, data)
            return res.json({ success: false, message: "User not Leader" })
        }
        return res.json({ success: true, message: 'Successfully Update' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// Remove Book Function 
const removeBook = async (req, res) => {
    const { userId, id } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        const organization = await OrgModel.findById(user.organization)
        if (!organization)
            return res.json({ success: false, message: "Organization not exist" })

        console.log(organization)

        // if (organization.deleteBook > 3) { 
        // return res.json({ success: false, message: 'The organization has already deleted 3 books' })
        // } 

        if (!(userId === organization.createBy.toString())) {
            return res.json({ success: false, message: "Only Leader Delete books" })
        }

        // Filter out the member to be removed from the members list
        const newBookList = organization.bookuploade.filter(
            (id) => id.toString() !== id.toString()
        );

        console.log(newBookList.length)
        // If the new list is the same as the original, the member wasn't found
        if (newBookList.length === organization.bookuploade.length)
            return res.json({ success: false, message: "This book does not exist in the organization" })

        const book = await BookModel.findByIdAndDelete(id);
        if (!book) {
            return res.json({ success: false, message: "book not exist" })
        }

        fs.unlink(`uploads/${book.bookCoverImgName}`, () => { })
        fs.unlink(`uploads/${book.bookIndexImgName}`, () => { })

        const org = await OrgModel.findByIdAndUpdate(organization._id, { bookuploade: newBookList })
        // const org = await OrgModel.findByIdAndUpdate(organization._id, { bookuploade: newBookList, deleteBook: organization.deleteBook + 1 })
        if (!org)
            return res.json({ success: false, message: "Doesn't change" })

        res.json({ success: true, message: "Book Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// Org Book list Function 
const getOrglistBook = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        if (!user.organization)
            return res.json({ success: false, message: "Organization not exist" })


        const org = await OrgModel.findById(user.organization)
        const orgBooks = await BookModel.find({ createById: org._id })
        console.log(orgBooks)
        res.json({ success: true, data: orgBooks })

    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

// all Book list Function 
const listBook = async (req, res) => {
    try {
        const books = await BookModel.find({ verify: true })
        res.json({ success: true, data: books })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

// verify book
const bookVerify = async (req, res) => {
    const { userId, id } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "you are not Authorized" })
        if (!(user.role === process.env.SECRET_Id))
            return res.json({ success: false, message: "Error" })

        const book = await BookModel.findById(id)
        if (!book)
            return res.json({ success: false, message: "Book not exist" })

        if (book.verify) {
            await BookModel.findByIdAndUpdate(id, { verify: false })
            return res.json({ success: true, message: "book verify : false" })
        }
        else {
            await BookModel.findByIdAndUpdate(id, { verify: true })
            return res.json({ success: true, message: "book verify : true" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}


const buyBook = async (req, res) => {
    const { userId, bookId } = req.body;
    const prevData = [];
    try {
        const user = await userModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        const book = await BookModel.findById(bookId)
        if (!book)
            return res.json({ success: false, message: "Book not exist" })

        await user.buyBook.map((item) => {
            const data = {}
            if (item.BookId.toString() === bookId) {
                throw res.json({ success: false, message: "Buy this book already" })
            }
            data['BookId'] = item.BookId
            data['buyBookDate'] = new Date(item.buyBookDate);
            prevData.push(data);
        })

        if (book.price === 0) {
            const data = {};
            data['BookId'] = bookId;
            data['buyBookDate'] = new Date();
            prevData.push(data);
        } else
            return res.json({ success: false, message: "pay first" })

        const updateUser = await userModel.findByIdAndUpdate(userId, { buyBook: prevData })
        if (!updateUser)
            return res.json({ success: false, message: 'Book purchase process failed' })

        return res.json({ success: true, message: updateUser })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

export { addBook, editBook, removeBook, listBook, getOrglistBook, bookVerify, buyBook };