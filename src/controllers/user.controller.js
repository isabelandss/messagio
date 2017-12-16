const   User = require("../models/user.model")

module.exports.getUsers = (req, res) => {
    User.find({}, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports.getUser = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports.saveUser = (req, res) => {
    User.create(req.body, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}