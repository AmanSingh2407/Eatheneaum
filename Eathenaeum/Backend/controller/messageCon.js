import feedbackModel from "../models/feedbackModel.js";
import helpModel from "../models/heplModel.js"; 


const helpMessage = async (req, res) => {
    const { mesName, mesEmail, mesMessage } = req.body;
    try {

        const newMess = new helpModel({
            name: mesName,
            email: mesEmail,
            message: mesMessage
        })

        await newMess.save()
        res.json({ success: true, message: "Successfully Send!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Message not send" })
    }
}


const feedbackMessage = async (req, res) => {
    const { feedName, feedEmail, feedSubject, feedMessage } = req.body;
    try {

        const newMess = new feedbackModel({
            name: feedName,
            email: feedEmail,
            subject: feedSubject,
            message: feedMessage
        })

        const mess = await newMess.save()
        res.json({ success: true, message: "Successfully Send!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Message not send" })
    }
}

export { helpMessage, feedbackMessage }