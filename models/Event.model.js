const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: Date,
        schedule: String,
        assistants: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        location: {
            name: {
                type: String,
            },
            coordinates: [Number],
        },
        modality: {
            type: String,
            enum: ['Presential', 'Online', 'Hybrid']
        },
        category: {
            type: String,
            required: true,
            default: "General",

        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dntpphebk/image/upload/v1646932350/bahia_xb2smn.jpg"
        },
    },
    {
        timestamps: true,
    }
)

const Event = model("Event", eventSchema)

module.exports = Event