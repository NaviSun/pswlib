import mongoose from "mongoose";

const { Schema, model } = mongoose;

const compnayName = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  companyDivisions: [
    {
      name: { type: String, },
      adress: { type: String,},
    },
  ],
});

export default model("companynames", compnayName);
