import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categoryDevice = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

export default model('categories', categoryDevice)