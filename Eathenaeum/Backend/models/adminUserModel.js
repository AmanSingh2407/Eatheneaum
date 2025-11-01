import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    frontUser: { type: mongoose.Schema.Types.ObjectId, ref: 'userinfo', require: true },
    profilePhoto: { type: String, default: "profile_pic.jpg" },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: Number, require: true },
    gender: { type: String, require: true },
    dob: {
        type: Date,
        set: (dob) => new Date(dob),
        get: (dob) => dob.getTime()
    },
    role: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    date: {
        type: Date,
        default: new Date(),
        get: (date) => date.getTime()
    },
    college: { type: String, require: true },
    course: { type: String, require: true },
    department: { type: String, require: true },
    status: { type: String, require: true },
    password: { type: String, require: true },
    verify: { type: Boolean, default: false },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'organization' },
    termCondition: { type: Boolean, require: true }
}, { minimize: false })

const adminUserModel = mongoose.models.adminUser || mongoose.model("adminUser", adminUserSchema);

export default adminUserModel;