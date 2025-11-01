import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    useInCollege: { type: Array },
    category: { type: Array },
    bookCoverImgName: { type: String, require: true, unique: true },
    bookIndexImgName: { type: String, require: true, unique: true },
    createById: { type: mongoose.Schema.Types.ObjectId, ref: 'organization', require: true },
    organizationName: { type: String, require: true },
    sellUnits: { type: Number, default: 0 },
    paymentUnits: { type: Number, default: 0 },
    pdfURL: { type: String, require: true },
    pageNumber: { type: Number, require: true },
    postDate: {
        type: Date,
        get: (updateDate) => updateDate.getTime(),
        default: new Date()
    },
    updateDate: {
        type: Date,
        set: (postDate) => new Date(postDate),
        get: (postDate) => postDate.getTime()
    },
    verify: { type: Boolean, default: false }
}, { minimize: false });

const BookModel = mongoose.models.bookinfo || mongoose.model("bookinfo", bookSchema);

export default BookModel;