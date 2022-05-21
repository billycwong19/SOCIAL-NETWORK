const router = require('express').Router()

const {
    createUser,
} = require('../../controllers/userController')

// create user
router.route('/').post(createUser)

module.exports = router;