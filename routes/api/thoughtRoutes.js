const router = require('express').Router()
// import request and response routes for thoughts 
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController')
// setting routes to DB
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:id/reaction').post(addReaction).delete(removeReaction)
router.route('/:id/reaction/:reactionId').delete(removeReaction)

module.exports = router;