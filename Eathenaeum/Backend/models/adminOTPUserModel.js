import mongoose from "mongoose";

const adminOTPUserSchema = new mongoose.Schema({
    email: { type: String, require: true },
    otp: { type: Number, require: true },
    timestamp: {
        type: Date,
        default: Date.now(),
        require: true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp)
    },
    termCondition: { type: Boolean, require: true }
}, { minimize: false })

const adminOTPUserModel = mongoose.models.adminOTPUser || mongoose.model("adminOTPUser", adminOTPUserSchema)

export default adminOTPUserModel;