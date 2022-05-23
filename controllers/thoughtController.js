const { Thought, User } = require('../models')

module.exports= {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json('No a single thought found!'))
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { thoughts: thought._id } },
              { runValidators: true, new: true }
            );
          })
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought created, but found no user with that ID' })
              : res.json('Thought Created!')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body.thoughtText },
        { runValidators: true, new: true })
        .then((thought) => 
            !thought ? res.status(404).json({ message: 'Not a single thought found!'})
            : res.status(200).json({ message: 'Updated Thought!' }, thought))
        .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res){
      Thought.findOneAndDelete({ _id: req.params.id })
      .then((user) => 
            !user ? res.status(404).json({ message: 'Not a single thought found!'})
            : res.json({ message: 'Thought has been deleted!'}))
            .catch((err) => res.status(500).json(err))
    }
    
}