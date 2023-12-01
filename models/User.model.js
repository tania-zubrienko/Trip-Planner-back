const { Schema, model } = require("mongoose");
const { DOCUMENT_TYPE } = require("../consts/user-consts");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es requerido.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida.']
    },
    avatar: {
      type: String,
      required: [true, 'La imagen de perfil es requerida.']
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