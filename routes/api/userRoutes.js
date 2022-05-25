const router = require('express').Router()
// importing request and response routes for User
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

// setting routes to DB
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:id/friends/:friend_id').put(addFriend).delete(removeFriend)



module.exports = router;