import mongoose, { mongo } from "mongoose";

const userShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowerCase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characteres'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        upperCase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
})

//pre mongoose
                            // Pluralizar
export default mongoose.model('user', userShema)