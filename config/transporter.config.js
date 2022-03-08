const nodemailer = require('nodemailer')



 let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'albertotejean@gmail.com',
        pass: 'UZ_7w+A@F.df_'
    }
})

module.exports = transporter