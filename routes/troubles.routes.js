const router = require("express").Router()
const Trouble = require("./../models/Post.model")
const { isAuthenticated } = require('../middlewares/jwt.middleware')


router.get("/", (req, res) => {
    const queries = Object.entries(req.query).map(elm => ({ [elm[0]]: elm[1] }))

    const lastQuery = queries.filter(e => {
        return Object.values(e) != ""
    })

    Trouble
        .find(lastQuery.length !== 0 ? { $and: lastQuery } : null)
        .populate('helpers')
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/autosearch", isAuthenticated, (req, res) => {

    const queries = Object.entries(req.query).map(elm => ({ [elm[0]]: elm[1] }))

    const lastQuery = queries.filter(e => {
        return Object.values(e) != ""
    })
    const realQuery = lastQuery.map((elm) => {
        let key = Object.keys(elm)
        let value = Object.values(elm)
        return { [key]: new RegExp('^' + value, 'i') }
    })
    Trouble
        .find(realQuery.length !== 0 ? { $and: realQuery } : null)
        .populate("helpers")
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post("/", (req, res) => {
    Trouble
        .create(req.body)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/myTrouble", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    Trouble
        .find({ owner: _id })
        .sort({ $natural: -1 })
        .limit(1)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))

})
router.put("/deleteFromHelperOffers", isAuthenticated, (req, res) => {
    const { _id } = req.payload
    const { idHelper } = req.body
    Trouble
        .updateMany({ owner: _id }, { $pull: { helpers: idHelper } }, { new: true })
        .then(() => Trouble.find().populate('helpers'))
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.put(`/:id`, (req, res) => {
    const { id } = req.params
    Trouble
        .findByIdAndUpdate(id, req.body, { new: true })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.delete(`/:id/`, (req, res) => {
    const { id } = req.params
    Trouble
        .findByIdAndDelete(id)
        .then(() => res.json("successfully eliminated a post"))
        .catch(err => console.log(err))
})

router.put("/:id/offerhelp", isAuthenticated, (req, res) => {
    const { id } = req.params
    const { _id } = req.payload
    Trouble
        .findByIdAndUpdate(id, { $addToSet: { helpers: _id } })
        .then(() => Trouble.find().populate('helpers'))
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})



module.exports = router