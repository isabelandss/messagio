const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/user')
        .get(userController.getUsers)
        .post(userController.saveUser);

    app.route('/user/:id')
        .get(userController.getUser)
}