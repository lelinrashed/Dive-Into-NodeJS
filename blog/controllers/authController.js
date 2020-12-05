const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require("../models/User")
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create a new user', error: {}, value: {} })
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', { title: 'Create a new user', error: errors.mapped(), value: { username, email, password } })
    }

    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username, email, password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('User created successfully', createdUser)
        res.render('pages/auth/signup', { title: 'Create a new user', error: {}, value: {} })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: 'Log in your account', error: {}, value: {} })
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/auth/login', { title: 'Log in your account', error: errors.mapped(), value: { email } })
    }

    try {
        let user = await User.findOne({
            email
        })

        if (!user) {
            return res.json({ message: 'Invalid Credential' })
        }

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.json({ message: 'Invalid Credential' })
        }

        console.log('Successfully signin', user);

        res.render('pages/auth/login', { title: 'Log in your account', error: {}, value: {} })

    } catch (error) {
        console.log(error);
        next(error)
    }
}


exports.logoutController = (req, res, next) => {

}