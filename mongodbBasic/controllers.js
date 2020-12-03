const Contact = require("./Contact")

exports.getAllContact = (req, res) => {
    Contact.find().then((data) => {
        res.json(data)
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
    let { name, phone, email } = req.body
    let contact = new Contact({
        name,
        phone,
        email
    })

    contact.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
        res.json({
            message: 'Error Occurred'
        })
    })
}

exports.updateContact = (req, res) => {
    let { id } = req.params
    let { name, email, phone } = req.body

    Contact.findOneAndUpdate({ _id: id }, { $set: { name, email, phone } }, { new: true })
        .then((data) => {
            res.json(data)
        }).catch((err) => {
            console.log(err);
            res.json({
                message: 'Error Occurred'
            })
        })
}

exports.deleteContact = (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json
        })
}