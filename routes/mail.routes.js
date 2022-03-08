const router = require("express").Router()

const transporter = require('../config/transporter.config');
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.post('/send',isAuthenticated, (req, res) => {

    const { email, subject, message } = req.body


    transporter.sendMail({
        from: 'albertotejean@gmail.com',
        to: email,
        subject,
        text: message,
        html: '<b>' + message + '</b>'
    })
        .then(info => res.json(info))
        .catch(error => console.log(error))

})

module.exports = router;

