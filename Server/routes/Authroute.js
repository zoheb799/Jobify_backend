 import express from 'express'
 const router = express.Router()
 import {register,login,updateUser} from '../controllers/Authcontroller.js'
 import UnAuthenticatedError from '../middleware/auth.js'

 router.route('/register').post(register)
 router.route('/login').post(login)
 router.route('/updateUser').patch(UnAuthenticatedError,updateUser)

 export default router

 