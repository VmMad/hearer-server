const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/jwt.middleware")
const Events = require("./../models/Event.model")

router.get("/", isAuthenticated, (req, res) => {
    const { page, title } = req.query

    // Revisar poravor linea 11 y 53

    Events
        .find(title ? { title: new RegExp('^' + title, 'i') } : null)
        .limit(10)
        .skip(page ? page * 10 : 0)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post("/", (req, res) => {
    Events
        .create(req.body)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.put(`/:id/`, (req, res) => {
    const { id } = req.params
    Events
        .findByIdAndUpdate(id, req.body, { new: true })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.delete(`/:id`, (req, res) => {
    const { id } = req.params
    Events
        .findByIdAndDelete(id)
        .then(() => res.json("successfully eliminated an event"))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    Events
        .findById(id)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/category/:category", isAuthenticated, (req, res) => {
    const { category } = req.params
    const { page } = req.query
    Events
        .find(category !== "all" ? { category: new RegExp('^' + category, 'i') } : null)
        .limit(10)
        .skip(page ? page * 10 : 0)
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.get("/categories/all", isAuthenticated, (req, res) => {
    Events
        .find()
        .select("category")
        .then(resp => {
            const allCategories = resp.map(({ category }) => category)
            const uniqueCategories = new Set(allCategories)
            res.json([...uniqueCategories])
        })
        .catch(err => console.log(err))
})

router.put(`/:id/attend`, (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    Events
        .findByIdAndUpdate(id, { $push: { assistants: userId } }, { new: true })
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

module.exports = router
