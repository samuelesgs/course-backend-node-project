const OrderController = require('../controllers/orderController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/orders/findByStatus/:status',  passport.authenticate('jwt', {session : false}), OrderController.findByStatus);

    app.post('/api/orders/create',  passport.authenticate('jwt', {session : false}), OrderController.create);

}