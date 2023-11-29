const { Schema, model } = require("mongoose")

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
      type: String
    },
    documents: {
      type: [String],
      default: []
    },
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