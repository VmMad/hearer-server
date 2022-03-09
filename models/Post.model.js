const { Schema, model } = require("mongoose")

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        ownername: { type: String, required: true },

        helpers: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        category: {
            type: String,
            required: true,
            default: "General"
        },
        image: String
    },
    {
        timestamps: true,
    }
)

const Trouble = model("Post", postSchema)

module.exports = Trouble