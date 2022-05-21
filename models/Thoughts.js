const { Schema, model } = require('mongoose')
const userSchema = require('./User')

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: currentTime,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
    }
});


// * `createdAt`
// * Date
// * Set default value to the current timestamp
// * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
// * String
// * Required

// * `reactions` (These are like replies)
// * Array of nested documents created with the `reactionSchema`