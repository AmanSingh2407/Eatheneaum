import mongoose from "mongoose";

const paddUserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    otp: { type: Number, require: true },
    termCondition: { type: Boolean, require: true },
    timestamp:
    {
        type: Date,
        require: true,
        default: Date.now(),
        set: (timestamp) => new Date(timestamp),
        get: (timestamp) => timestamp.getTime()
    }
}, { minimize: false })

const paddUserModel = mongoose.models.paddUserinfo || mongoose.model("paddUserinfo", paddUserSchema);

export default paddUserModel;   