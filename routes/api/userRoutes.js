const router = require('express').Router()

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

// create user
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:id/friends/:friend_id').put(addFriend).delete(removeFriend)



module.exports = router;