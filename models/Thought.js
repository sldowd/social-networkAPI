const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // btw 1 & 280 char
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: 
    }
)