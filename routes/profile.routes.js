const { isAuthenticated } = require("../middlewares/jwt.middleware")
const User = require("../models/User.model")

const router = require("express").Router()


router.get("/test", isAuthenticated, (req, res) => {
    User
        .find()
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .select("-password")
        .then(resp => {
            console.log(resp)
            res.json(resp)
        })
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

router.put("/edit/:id/accepthelper", (req, res) => {
    const { helperid } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { $push: { contacts: helperid } }, { new: true })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})



module.exports = router
