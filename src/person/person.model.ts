import * as mongoose from 'mongoose';

export const personSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Id is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    }
}, { timestamps: true });