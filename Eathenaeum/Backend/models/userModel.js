import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profileName: { type: String, default: 'profile_pic.jpg' },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    dob: {
        type: Date,
        set: (dob) => new Date(dob),
        get: (dob) => dob.getTime()
    },
    college: { type: String },
    course: { type: String },
    department: { type: String },
    termCondition: { type: Boolean, require: true },
    cartData: { type: Array },
    buyBook: [
        {
            BookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bookinfo'
            },
            buyBookDate: {
                type: Date,
                set: (dob) => new Date(dob),
                get: (dob) => dob.getTime()
            }
        }
    ],
    role: { type: String }
}, { minimize: false })

const userModel = mongoose.models.userinfo || mongoose.model("userinfo", userSchema);

export default userModel;   