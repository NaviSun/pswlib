import mongoose from "mongoose";


const { Schema, model } = mongoose;
const access = new Schema({
  companyName: {
    ref: "companynames",
    type: Schema.Types.ObjectId,
  },
  companyDivisions: {
    ref: "companynames",
    type: Schema.Types.ObjectId,
  },
  accesses: {
    category: {
      ref: "categories",
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: false,
    },
    login: {
          type: String,
          required: false,
        },
    password: {
          type: String,
          required: false,
        },
        method: {
          type: String,
        },
      },     
});

export default model('accesses', access )