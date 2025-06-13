import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        match: [/^\+?[\d\s-]{10,}$/, 'Invalid phone number format']
    }
}, { timestamps: true });

export default model('User', userSchema);