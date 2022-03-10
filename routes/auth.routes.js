const express = require("express")
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const jwt = require('jsonwebtoken')
const { formatError } = require("mongoose")
const mongoose = require("mongoose")

const router = express.Router()
const saltRounds = 10

router.get("/tester", (req, res) => {
    User
        .find()
        .then(resp => res.json(resp))
})

router.post('/signup', (req, res, next) => {
    const { username, password, email } = req.body

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Provide email, password and name" })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' })
        return
    }

    if (password.length < 6) {
        res.status(400).json({ message: 'Password must have at least 6 characters ' })
        return
    }
    User
        .findOne({ $or: [{ username }, { email }] })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, password: hashedPassword, email })
        })

})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res.status(401).json({ message: "This user does not exists!" })
            }

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, username, role, image } = foundUser

                const payload = { _id, email, username, role, image }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('validated-form', { errorMessage: formatError(error) })
            } else {
                next(error)
            }
        })
})

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})



module.exports = router