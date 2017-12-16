const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.route('/signin')
        .post(authController.signin)
}