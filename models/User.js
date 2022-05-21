const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts')

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
    thoughts: [thoughtsSchema],
    friends: [userSchema]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount')
    .get(function(){
        return `${this.username} has ${this.friends.length} friends!`
    })

const User = model('user', userSchema);

module.exports = User;