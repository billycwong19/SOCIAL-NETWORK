const router = require('express').Router()

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts).post(createThought)
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:id/reaction').post(addReaction)

module.exports = router;