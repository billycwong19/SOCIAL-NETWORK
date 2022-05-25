const { Schema, model, Types } = require('mongoose')

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
        get: formatDate
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
  }
);

// date formatter
function formatDate (date) {
    const timeElapsed = date;
    const today = new Date(timeElapsed);
    return today.toUTCString();
}

const Reaction = model('Reaction', reactionSchema);
// exports schema instead of model
module.exports = reactionSchema;

