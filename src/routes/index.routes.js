module.exports = (app) => {

    // User routes
    require('./user.routes')(app)

    // Auth routes
    require('./auth.routes')(app)
}