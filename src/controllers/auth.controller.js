const   jwt     = require('jsonwebtoken'),
        bcrypt  = require('bcryptjs'),
        User    = require('../models/user.model'),
        utils   = require('../utils/utils'),
        config  = require('../../config/secret');

module.exports.getToken = (req, res) => {
    var token = jwt.sign({ id: 'teste' }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    res.send(token);
}

module.exports.signin = (req, res) => {
    let bololo = {
        email: '',
        _id: ''
    }
    let user = req.body;

    if(!user.password) {
        return res.status(401).json({
            'error': 'Usuário não autenticado'
        }) 
    } 
    
    User.findOne({
        'email': user.email
    }, (error, userResult) => {
        if (error) return res.status(500).json({
            'error': utils.getErrorMessageFromModel(error)
        })

        if (!userResult) return res.status(401).json({
            'error': 'Usuário não encontrado'
        })

        if (!bcrypt.compareSync(user.password, userResult.password)) {
            return res.status(401).json({
                'error': 'Usuário não autenticado'
            })  
        }

        return res.status(200).json(userResult)
    })
}

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    jwt.verify(token, config.secret, (err) => {
      if (err) {
        return res.status(403).json({ mensagem: 'Token não válido' });
      }

      next();
    });
  };