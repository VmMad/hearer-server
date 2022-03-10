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
      default: "https://res.cloudinary.com/dntpphebk/image/upload/v1646728217/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-removebg-preview_gkvvm1.png"
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