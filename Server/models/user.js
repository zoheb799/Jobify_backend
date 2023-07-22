import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide your name'],
        minlength: 4,
        maxlength: 21,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'provide your email'],
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email',
        },
        unique: true,

    },
    password: {
        type: String,
        required: [true, 'provide your password'],
        minlength: 6,
        select :false,

    },
    lastName: {
        type: String,


        trim: true,
        default: 'my lastName',
    },
    location: {
        type: String,


        trim: true,
        maxlength: 20,
        default: 'mycity'
    },
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.createJWT = function() {
    return jwt.sign({userId:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', userSchema)