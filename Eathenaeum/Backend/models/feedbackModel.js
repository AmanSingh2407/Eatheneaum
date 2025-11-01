import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({ 
    name: { type: String },
    email: { type: String, require: true },
    subject: { type: String },
    message: { type: String },
    timestamp: {
        type: Date,
        default: Date.now(),
        require: true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp)
    },
    response: { type: Boolean, default: false }
})

const feedbackModel = mongoose.models.feedbackmessage || mongoose.model('feedbackmessage', feedbackSchema)

export default feedbackModel;