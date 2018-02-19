const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/secret');

module.exports.saveUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  
    let createdUser = await User.create(req.body);

    createdUser = await User.findOneAndUpdate({ 
      _id: createdUser._id 
    }, {
      $set: {
        token: jwt.sign({ _id: createdUser._id }, config.secret, {
          expiresIn: 86400
        })
      }
    });
    
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
}


module.exports.getUsers = async (req, res) => {
  try {
    const userList = await User.find({});

    if (!userList) {
      return res.status(204).json({ data: userList });
    }

    return res.status(200).json({ data: userList });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'User is necessary.' });
    }

    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(204).json({ data: foundUser });
    }

    return res.status(200).json({ data: foundUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};