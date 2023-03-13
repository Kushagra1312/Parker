const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spotSchema = new Schema(
    {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        title: {
            type: String,
            required: "Title is required",
        },
        content: {
            type: String,
            required: "Content is required",
            maxlength: 10000,
        },
        location: {
            type: String,
        },
        price: {
            type: Number,
            required: "Price is required",
            trim: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
        slots: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Spot", spotSchema);
