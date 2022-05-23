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
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
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

userSchema.virtual('friendCount')
    .get(function(){
        return `${this.username} has ${this.friends.length} ${this.friends.length === 0 ? 'friends!' : this.friends.length > 1 ? 'friends!' : 'friend!'}`
    })

// userSchema.virtual('thoughts', {
//     ref: 'Thought',
//     localField: '_id',
//     foreignField: 'thoughtText'
// })


// userSchema.virtual('currentThought')
//     .get(function(){
//         return `${this.thoughts.thoughtText}`
//     })

const User = model('user', userSchema);

module.exports = User;