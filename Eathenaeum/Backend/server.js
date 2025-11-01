import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js';
import bookRouter from './routes/bookRouter.js';
import cartRoute from './routes/cartRouter.js';
import adminUser from './routes/adminUserRouter.js';
import messRoute from './routes/messageRouter.js';
import orgRouter from './routes/organizationRouter.js';
import {PDFDataMiddl} from './meddleware/PDFAuth.js';
import rateLimit from 'express-rate-limit'


// app config
const app = express()
const port = 8000;

// Middleware 
app.use(express.json())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // Limit each IP to 100 requests per windowMs
});

app.use(cors({}))
app.use(limiter);
app.set('trust proxy', '127.0.0.1');

// DB Connection
connectDB();

// app endPoint 
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

app.use('/view-pdf', PDFDataMiddl, express.static('uploads/pdfs'));
app.use('/images', express.static('uploads/images'));
app.use('/profile/image', express.static('uploads/profile_front'));
app.use('/api/cart', cartRoute);
app.use('/api/message', messRoute)

// adminUser
app.use('/api/admin/user', adminUser)
app.use('/admin/profile/image', express.static('uploads/profile_admin'));

//Organization
app.use('/api/admin/organization', orgRouter)

app.get('/', (req, res) => {
    res.send("Hello i am amit singh.")
})

app.listen(port, (req, res) => {
    console.log(`server Stated on http://localhost:${port}`)
})