const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
    },
    username: {
        type: String,
        required: true,
    },

    // declare reactions with reachtionSchema inside array
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

function formatDate (date) {
    const timeElapsed = date;
    const today = new Date(timeElapsed);
    return today.toUTCString();
  }
// reaction count virtual
thoughtSchema.virtual('reactionCount')
    .get(function(){
        return `${this.reactions.length}`
    }) 

const Thoughts = model('Thought', thoughtSchema)

module.exports = Thoughts;
