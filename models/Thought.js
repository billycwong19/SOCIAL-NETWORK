const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')

// const formatDate = (date) => {
//     const current = date
//     return `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()} ${current.getHours() > 12 ? current.getHours() - 12 : current.getHours()}:${String(current.getMinutes()).padStart(2, '0')} ${current.getHours() >= 12 ? 'PM' : 'AM'}`;
// }

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

thoughtSchema.virtual('reactionCount')
    .get(function(){
        return `${this.reactions.length}`
    }) 

const Thoughts = model('Thought', thoughtSchema)

module.exports = Thoughts;
