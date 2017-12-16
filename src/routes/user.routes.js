const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app
        .get('/users', userController.getUsers)
        .get('/user/:id', userController.getUser)

        .post('/user', userController.saveUser)
}