const bcrypt = require('bcrypt')
const User = require("../models/User")

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create a new user' })
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password, confirmpassword } = req.body

    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username, email, password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('User created successfully', createdUser)
        res.render('pages/auth/signup', { title: 'Create a new user' })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: 'Log in your account' })
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body

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

        res.render('pages/auth/login', { title: 'Log in your account' })

    } catch (error) {
        console.log(error);
    }
}


exports.logoutController = (req, res, next) => {

}