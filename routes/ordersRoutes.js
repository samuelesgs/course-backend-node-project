const OrderController = require('../controllers/orderController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/orders/findByStatus/:status',  passport.authenticate('jwt', {session : false}), OrderController.findByStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status',  passport.authenticate('jwt', {session : false}), OrderController.findByClientAndStatus);

    app.post('/api/orders/create',  passport.authenticate('jwt', {session : false}), OrderController.create);

}