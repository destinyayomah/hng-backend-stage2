import * as mongoose from 'mongoose';

export const personSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
        required: [true, "Name is required"]
    }
}, { timestamps: true });