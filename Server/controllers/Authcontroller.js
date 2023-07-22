import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError,UnAuthenticatedError} from '../errors/index.js'




const register = async (req, res)=> {
    const { name,email,password} = req.body 
    if(!name || !email|| !password){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:'please provide all details' })
    }
    const userAlreadyExist = await User.findOne({email})
    if(userAlreadyExist) {
        res.status(400).json({ msg : "user already exist"})
    }

    const user = await User.create({name,email,password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{email:user.email,lastname:user.lastName,location:user.location,name:user.name}, token,location:user.location,})
   } 

   const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }
  
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
   
    user.password = undefined;
  
    
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  };
const updateUser = async (req, res)=> {
  const {email,name, lastName,location} = req.body
  if(!email || !name || !lastName || !location) {
    res.status(401).json({ msg : "please provide all values"})
  }
  const user = await User.findOne({_id:req.user.userId })
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
await user.save()

const token = user.createJWT()
res.status(StatusCodes.OK).json({ user, token, location: user.location, });
    
};

export { register,login,updateUser}

