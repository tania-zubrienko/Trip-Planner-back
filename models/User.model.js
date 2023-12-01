const { Schema, model } = require("mongoose");
const { DOCUMENT_TYPE } = require("../consts/user-consts");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, name, email, avatar } = this
  const payload = { _id, name, email, avatar }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (userPassword) {
  console.log(userPassword, this.password)
  return bcrypt.compareSync(userPassword, this.password)
}

const User = model('User', userSchema)

module.exports = User

