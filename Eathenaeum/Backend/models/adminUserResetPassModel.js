import mongoose from "mongoose";

const adminUserResetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminuser',
        require: true
    },
    otp: { type: Number, require: true },
    timestamp : {  
        type: Date,
        default: Date.now(),
        require: true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp)
    }
})

const adminUserResetModel = mongoose.models.adminUserReset || mongoose.model('adminUserReset', adminUserResetSchema)

export default adminUserResetModel;