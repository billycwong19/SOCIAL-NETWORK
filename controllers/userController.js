const { User, Thought } = require('../models');

// various requests for retrieving data for users
module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(404).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            // populate method for friends and thoughts
            .populate({ path: 'thoughts', select: '-__v'})
            .populate({ path: 'friends', select: '-__v'})
            .then( async (user) =>
                !user ? res.status(404).json({ message: 'No user with that ID found!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate (
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => 
                !user ? res.status(404).json({ message: 'No User with that ID found!'})
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id})
            .then((user) => 
                !user ? res.status(404).json({ message: 'No User with that ID found!'})
                    : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json({ message: 'User and User Thoughts now deleted. Goodbye!' }))
            .catch((err) => res.status(500).json(err))       
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id},
            { $addToSet: {friends: req.params.friend_id }},
            { runValidators: true, new: true })
            .then(() => res.json({ message: 'Friend added to User!' }))
            .catch((err) => res.status(500).json(err))
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friend_id }},
          { runValidators: true, new: true })
          .then((user) =>
                !user ? res.status(404).json({ message: 'No User with this ID!' })
                    : res.json({ message: 'Friend has been removed from User!'}))
          .catch((err) => res.status(500).json(err));
      },  
}