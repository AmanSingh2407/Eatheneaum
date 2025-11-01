import mongoose from 'mongoose'

const orgSchema = new mongoose.Schema({
    organization: { type: String, require: true },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'adminUser', require: true },
    members: { type: Array, require: true },
    message: { type: String },
    createdDate: {
        type: Date,
        default: new Date(),
        get: (date) => date.getTime()
    },
    UpdatedDate: {
        type: Date,
        set: (date) => new Date(date),
        get: (date) => date.getTime()
    },
    deleteBook: { type: Number, default: 0 },
    bankName: { type: String },
    IFSCCode: { type: String },
    bankAccount: { type: Number },
    paymentsDetails: { type: Array },
    bookuploade: { type: Array },
    verify: { type: Boolean, default: false },
    termCondition: { type: Boolean, require: true }
})

const OrgModel = mongoose.models.Organizations || mongoose.model("organization", orgSchema);

export default OrgModel;