const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'helper', 'moderator', 'admin'],
      default: 'user'
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number]
    },
    image: {
      type: String,
      default: "https://res-console.cloudinary.com/dntpphebk/thumbnails/v1/image/upload/v1646844092/MjczNDM0MjU1XzEyNDMzNDk2MDYxNTM5MjJfODcyMTI1NTg4Mjk3NTg4NjE3NV9uLndlYnBfbG1ocjNh/preview"
    },
    studies: String,
    specialties: String,
    age: Number,
    contacts: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      isHelper: Boolean
    }],
    imageUrl: String,
    profileBackground: String,
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User