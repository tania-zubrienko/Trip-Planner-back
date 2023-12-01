const { Schema, model } = require("mongoose");
const { DOCUMENT_TYPE } = require("../consts/user-consts");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    avatar: {
      type: String,
      required: [true, 'Profile image is required']
    },
    documents: [
      {
        type: {
          type: String,
          enum: DOCUMENT_TYPE
        },
        link: String
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip'
      }
    ],
    favouritePlaces: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

const User = model('User', userSchema)

module.exports = User