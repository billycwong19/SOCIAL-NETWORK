const { Thoughts } = require('../models')

module.exports= {
    createThought(req,res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    getAllThoughts(req, res) {
        Thoughts.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    }
}