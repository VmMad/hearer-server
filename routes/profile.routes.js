const { isAuthenticated } = require("../middlewares/jwt.middleware")
const User = require("../models/User.model")

const router = require("express").Router()


router.get("/test", isAuthenticated, (req, res) => {
    User
        .find()
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})
router.get("/user", isAuthenticated, (req, res) => {
    const { _id } = req.payload
    User
        .findById(_id)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.put("/edit/:id", (req, res) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, req.body, { new: true })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.json(`deleted user with id ${id}`))
        .catch(err => console.log(err))
})

router.put("/accepthelper", isAuthenticated, (req, res) => {
    const { helper_id } = req.body
    const { _id } = req.payload
    User
        .findByIdAndUpdate(_id, { $addToSet: { contacts: helper_id } }, { new: true })
        .then(() => User.findByIdAndUpdate(helper_id, { $addToSet: { contacts: _id } }))
        .then(() => res.json("Se ha añadido a tus contactos correctamente"))
        .catch(err => console.log(err))
})



module.exports = router
