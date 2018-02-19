const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../../config/secret');

module.exports.signin = async (req, res) => {
	try {
		if (!req.body.password) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await User.findOne({
			email: req.body.email
		});

		if (!user) {
			return res.status(204).json({ message: 'User not found' });
		}

		if (await !bcrypt.compare(req.body.password, user.password)) {
			return res.status(401).json({ message: 'Unauthorized'})
		}

		if (!jwt.verify(user.token, config.secret)) {
			User.findOneAndUpdate({ 
				email: user.email 
			}, {
				$set: {
					token: jwt.sign({ _id: user._id }, config.secret, {
						expiresIn: 86400
					})
				}
			});
		}

		return res.status(200).json({ message: 'User logged successfully' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
