const Contact = require("./Contact")

exports.getAllContact = (req, res) => {
    Contact.find().then((data) => {
        res.render('index', { data, error: {} })
    }).catch((err) => {
        console.log(err);
        res.json({
            message: 'Error Occurred'
        })
    })
}

exports.getSingleContact = (req, res) => {
    let { id } = req.params
    Contact.findById(id).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
        res.json({
            message: 'Error Occurred'
        })
    })
}

exports.createContact = (req, res) => {
    let { name, phone, email, id } = req.body

    let error = {}

    if (!name) {
        error.name = 'Please Provide Your Name'
    }

    if (!phone) {
        error.phone = 'Please Provide a Phone Number'
    }

    if (!email) {
        error.email = 'Please Provide an Email'
    }

    let isError = Object.keys(error).length > 0

    if (isError) {
        Contact.find()
            .then((data) => {
                res.render('index', { data, error })
            }).catch((err) => {
                console.log(err);
                res.json({
                    message: 'Error Occurred'
                })
            })
        return
    }

    if (id) {
        Contact.findOneAndUpdate({ _id: id }, { $set: { name, email, phone } }, { new: true })
            .then(() => {
                Contact.find()
                    .then((data) => {
                        return res.render('index', { data, error: {} })
                    }).catch((err) => {
                        console.log(err);
                        return res.json({
                            message: 'Error Occurred'
                        })
                    })
            }).catch((err) => {
                console.log(err);
                res.json({
                    message: 'Error Occurred'
                })
            })
    } else {
        let contact = new Contact({
            name,
            phone,
            email
        })

        contact.save().then((data) => {
            Contact.find()
                .then((data) => {
                    return res.render('index', { data, error: {} })
                }).catch((err) => {
                    console.log(err);
                    return res.json({
                        message: 'Error Occurred'
                    })
                })
        }).catch((err) => {
            console.log(err);
            res.json({
                message: 'Error Occurred'
            })
        })
    }
}

// exports.updateContact = (req, res) => {
//     let { id } = req.params
//     let { name, email, phone } = req.body

//     Contact.findOneAndUpdate({ _id: id }, { $set: { name, email, phone } }, { new: true })
//         .then((data) => {
//             res.json(data)
//         }).catch((err) => {
//             console.log(err);
//             res.json({
//                 message: 'Error Occurred'
//             })
//         })
// }

exports.deleteContact = (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then((data) => {
                    res.render('index', { data, error: {} })
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        message: 'Error Occurred'
                    })
                })
        })
        .catch((err) => {
            res.json
        })
}