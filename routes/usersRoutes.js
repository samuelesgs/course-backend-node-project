const UsersControllers = require('../controllers/userController');
const passport = require('passport')


module.exports = (app, upload) => {
    app.get('/api/users/getAll', UsersControllers.getAll);

    app.post('/api/users/create' , UsersControllers.register);
    app.post('/api/users/login' , UsersControllers.login);

    app.put('/api/users/update', passport.authenticate('jwt', {session : false}), upload.array('image', 1), UsersControllers.update)
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session : false}), UsersControllers.updateWithoutImage)
}