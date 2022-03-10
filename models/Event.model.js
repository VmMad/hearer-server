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

        }
    },
    {
        timestamps: true,
    }
)

const Event = model("Event", eventSchema)

module.exports = Event