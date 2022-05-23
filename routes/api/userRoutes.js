const router = require('express').Router()

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

// create user
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)


module.exports = router;