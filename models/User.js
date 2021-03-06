const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        max_length: 24,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            // email validator regex
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    // referenced models
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});
//virtual to return friendCount
userSchema.virtual('friendCount')
    .get(function(){
        return `${this.username} has ${this.friends.length} ${this.friends.length === 0 ? 'friends!' : this.friends.length > 1 ? 'friends!' : 'friend!'}`
    })

const User = model('User', userSchema);

module.exports = User;