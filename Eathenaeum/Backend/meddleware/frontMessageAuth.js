import { checkValidEmail, checkValidName } from "./inputDataAuth.js"

const helpMessageMiddleware = (req, res, next) => {
    const { mesName, mesEmail, mesMessage } = req.body;

    try {
        const validName = checkValidName(mesName.trim());
        const validEmail = checkValidEmail(mesEmail.trim());
        const trimmedMessage = mesMessage.trim();

        if (!validName.valid) {
            throw new Error(validName.message);
        }

        if (!validEmail.valid) {
            throw new Error(validEmail.message);
        }

        if (trimmedMessage.length > 500) {
            throw new Error("Message exceeds 500 characters");
        }

        if (trimmedMessage.length < 10) {
            throw new Error("Message is less than 10 characters");
        }

        next();
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};



const feedbackMessageMidd = (req, res, next) => {
    const { feedName, feedEmail, feedSubject, feedMessage } = req.body;

    try {
        // Validate name and email
        const validName = checkValidName(feedName);
        const validEmail = checkValidEmail(feedEmail);

        if (!validName.valid) {
            throw validName.message;
        }
        if (!validEmail.valid) {
            throw validEmail.message;
        }

        // Validate subject length
        if (feedSubject.trim().length < 10 || feedSubject.trim().length > 100) {
            throw "Subject must be between 10 and 100 characters.";
        }

        // Validate message length
        if (feedMessage.trim().length < 10 || feedMessage.trim().length > 500) {
            throw "Message must be between 10 and 500 characters.";
        }

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error });
    }
};

export { helpMessageMiddleware, feedbackMessageMidd };