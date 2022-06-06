const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.get)

module.exports = router