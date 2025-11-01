import express from 'express'
import { addItem, removeItem, getItem } from '../controller/cartcon.js';
import { tokenMiddl } from '../meddleware/tokenAuth.js';


const cartRoute = express.Router();

cartRoute.post('/add', tokenMiddl , addItem);
cartRoute.post('/remove', tokenMiddl , removeItem);
cartRoute.post('/list', tokenMiddl , getItem);

export default cartRoute;