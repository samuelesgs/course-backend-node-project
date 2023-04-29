const CategoriesControllers = require('../controllers/categoriesController');
const passport = require('passport')


module.exports = (app, upload) => {
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session : false}), CategoriesControllers.getAll);

    app.post('/api/categories/create', passport.authenticate('jwt', {session : false}), upload.array('image', 1), CategoriesControllers.create);
    /*app.post('/api/categories/login' , UsersControllers.login);

    app.put('/api/categories/update', passport.authenticate('jwt', {session : false}), upload.array('image', 1), UsersControllers.update)
    app.put('/api/categories/updateWithoutImage', passport.authenticate('jwt', {session : false}), UsersControllers.updateWithoutImage)*/
}