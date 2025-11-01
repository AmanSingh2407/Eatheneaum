import mongoose from 'mongoose'

const helpSchema = new mongoose.Schema({ 
    name: { type: String },
    email: { type: String, require: true },
    message: { type: String },
    timestamp: {
        type: Date,
        default: Date.now(),
        require: true,
        get: (timestamp) => timestamp.getTime()
    },
    response: { type: Boolean, default: false }
})


const helpModel = mongoose.models.helpmessage || mongoose.model('helpmessage', helpSchema)

export default helpModel;