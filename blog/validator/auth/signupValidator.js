const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = signupValidator = [
    body('username').isLength({ min: 2, max: 15 }).withMessage('Username must be between 2 to 15 words')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (user) {
                return Promise.reject('Username already used')
            }
            return true
        }).trim(),
    body('email').isEmail().withMessage('Please provide a valid email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (user) {
                return Promise.reject('Email already used')
            }
            return true
        }).normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Your password must be greater than 5'),
    body('confirmpassword').not().isEmpty().withMessage('Confirm password must not be empty')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword != req.body.password) {
                throw new Error("Password doesn't match")
            }
            return true
        })
]