const   User    = require("../models/user.model"),
        jwt     = require('jsonwebtoken'),
        bcrypt  = require('bcryptjs'),
        config  = require('../../config/secret'),
        utils   = require('../utils/utils')

module.exports.saveUser = (req, res) => {
    let newUser = req.body;
    
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    
    User.create(req.body, (err, data) => {
        if (err) return res.status(500).json(utils.getErrorMessageFromModel(err))

        let generatedToken = jwt.sign({ _id: data._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        User.findOneAndUpdate({ _id: data._id }, 
            {
                $set: {
                    token: generatedToken
                }
            }, (error, success) => {
                if (error) return res.status(500).json(utils.getErrorMessageFromModel(error))

                return res.status(200).json(success)
        })
    })
}


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