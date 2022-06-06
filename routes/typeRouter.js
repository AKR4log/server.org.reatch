const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.get)

module.exports = router