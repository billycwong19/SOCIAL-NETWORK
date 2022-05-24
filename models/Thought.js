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
    },
    id: false,
});

thoughtSchema.virtual('reactionCount')
    .get(function(){
        return `${this.reactions.length}`
    })


// userSchema.get(function(currentTime){
//     return `${this.createdAt.getMonth() + 1}/${this.createdAt.getDate()}/${this.createdAt.getFullYear()} ${this.createdAt.getHours() > 12 ? this.createdAt.getHours() - 12 : this.createdAt.getHours()}:${String(this.createdAt.getMinutes()).padStart(2, '0')} ${this.createdAt.getHours() >= 12 ? 'PM' : 'AM'}`;
// })

const Thoughts = model('Thought', thoughtSchema)

module.exports = Thoughts;
