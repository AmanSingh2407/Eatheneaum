import mongoose, { get } from "mongoose"; 

const optSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfo',
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        require: true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp)
    }
})

const OTPModel = mongoose.model("resetPasswordVerify", optSchema);

export default OTPModel;
