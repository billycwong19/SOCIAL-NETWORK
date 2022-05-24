const { Thought, User, Reaction } = require('../models')

module.exports= {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .populate({ path: 'reactions', select: '-__v'})
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
    },
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No Thought exists!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    // removeReaction(req, res) {
    //     Thought.findOneAndUpdate(
    //       { _id: req.params.id },
    //       { $pull: { reactions: { reaction_id: req.body.reaction_id}}},
    //       { runValidators: true, new: true })
    //       .then((thought) =>
    //             !thought ? res.status(404).json({ message: 'No thought found!' })
    //                 : res.json({ message: 'Friend has been removed from User!'}))
    //       .catch((err) => res.status(500).json(err));
    // },
    
}