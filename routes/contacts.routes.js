const User = require("../models/User.model")
const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/jwt.middleware")

router.get("/:username/contacts", (req, res) => {
    const { username } = req.params
    User
        .findOne({ username })
        .populate("contacts")
        .then(resp => {
            const contacts = resp.contacts.map(e => {
                return { username: e.username, email: e.email, _id: e._id }
            })
            return contacts
        })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post("/contacts/:id", isAuthenticated, (req, res) => {
    const { username } = req.payload
    const { id } = req.params
    User
        .findOneAndUpdate({ username }, { $pull: { contacts: id } })
        .then(resp => res.json(resp))
})

module.exports = router
