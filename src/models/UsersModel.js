const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultIamgePath } = require("../secret");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, //.....ashiq.... empty string remove
      maxlength: [20, "Name can not be more than 20 characters"],
      minlength: [3, "Name should be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Please fill a valid email address",
      },
      // validate: [validator.isEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"],
      set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)), //bcrypt hashing
    },
    image: {
      type: String,
      default: defaultIamgePath,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports =  User ;