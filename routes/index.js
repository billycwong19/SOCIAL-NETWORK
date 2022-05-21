const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => res.send(`Looks like you're in the wrong place!`))

module.exports = router;