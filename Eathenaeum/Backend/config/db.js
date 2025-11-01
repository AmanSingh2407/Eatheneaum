import mongoose from "mongoose";
import 'dotenv'

const connectDB = async () => {
    try {
          await mongoose.connect(`mongodb+srv://${process.env.SECRET_DATABASE_Id}:${process.env.SECRET_DATABASE_Pass}@eathenaeum.wa5x1.mongodb.net/eathenaeum`).then(() => console.log("DB Connected")); 
    } catch (error) {
        console.log(`DB Connection Failed : ${error}`);
    }
}
 

export default connectDB;