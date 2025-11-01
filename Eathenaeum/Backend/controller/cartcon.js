import userModel from "../models/userModel.js";

// add item in user account 
const addItem = async (req, res) => {
    const { userId, item } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user)
            return res.json({ message: false, message: "User not exist" });

        let listItem = await user.cartData;
        listItem.forEach(element => {
            if (element == item)
                throw "Product already present in Data Base"
        });
        listItem.push(item);
        await userModel.findByIdAndUpdate(userId, { cartData: listItem });
        return res.json({ success: true, message: "item Added successfully" })
    }
    catch (error) {
        console.log(error);
        return res.json({ message: false, message: error });
    }
}

// remove from user account
const removeItem = async (req, res) => {
    const item_ = [];
    const { userId, item } = req.body;
    const user = await userModel.findById(userId);
    try {
        let listItem = await user.cartData;
        for (let i in listItem) {
            if (!(listItem[i] == item)) {
                item_.push(listItem[i]);
            }
        }
        await userModel.findByIdAndUpdate(userId, { cartData: item_ });
        return res.json({ success: true, message: "remove Item" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// get item in user account
const getItem = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { removeItem, addItem, getItem };