const router = require('express').Router()

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser
} = require('../../controllers/userController')

// create user
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser)

module.exports = router;