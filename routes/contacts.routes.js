const User = require("../models/User.model")
const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/jwt.middleware")

router.get("/mycontacts", isAuthenticated, (req, res) => {
    const { _id } = req.payload
    User
        .findOne({ _id })
        .populate("contacts")
        .then(resp => {
            const contacts = resp.contacts.map(e => {
                return { username: e.username, email: e.email, _id: e._id, role: e.role }
            })
            return contacts
        })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post("/contacts/:id/delete", isAuthenticated, (req, res) => {
    const { _id } = req.payload
    const { id } = req.params
    User
        .findOneAndUpdate({ _id }, { $pull: { contacts: id } }, { new: true })
        .populate("contacts")
        .then(resp => resp)
        .then(({ contacts }) => res.json(contacts))
        .then(() => User.findOneAndUpdate({ _id: id }, { $pull: { contacts: _id } }, { new: true }))
        .catch(err => console.log(err))
})

module.exports = router
