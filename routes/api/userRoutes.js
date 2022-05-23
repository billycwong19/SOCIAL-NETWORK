const router = require('express').Router()

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/userController')

// create user
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:id/friends/:friend_id').put(addFriend)


module.exports = router;