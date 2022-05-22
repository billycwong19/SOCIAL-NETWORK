const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// userSchema.get(function(currentTime){
//     return `${this.createdAt.getMonth() + 1}/${this.createdAt.getDate()}/${this.createdAt.getFullYear()} ${this.createdAt.getHours() > 12 ? this.createdAt.getHours() - 12 : this.createdAt.getHours()}:${String(this.createdAt.getMinutes()).padStart(2, '0')} ${this.createdAt.getHours() >= 12 ? 'PM' : 'AM'}`;
// })

// * `createdAt`
// * Date
// * Set default value to the current timestamp
// * Use a getter method to format the timestamp on query

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;

