import express from 'express'
import { feedbackMessage, helpMessage } from '../controller/messageCon.js'
import { feedbackMessageMidd, helpMessageMiddleware } from '../meddleware/frontMessageAuth.js'

const messRoute = express.Router()


messRoute.post('/help', helpMessageMiddleware, helpMessage)
messRoute.post('/feedback', feedbackMessageMidd, feedbackMessage)

export default messRoute;