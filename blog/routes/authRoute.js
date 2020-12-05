const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController')
const router = require('express').Router()
const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')


router.get('/signup', signupGetController)
router.post('/signup', signupValidator, signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginValidator, loginPostController)

router.get('/logout', logoutController)

module.exports = router