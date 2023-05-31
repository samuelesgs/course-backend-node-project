const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer')
const serviceAccount = require('./serviceAccountKey.json')
const admin = require('firebase-admin')

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage : multer.memoryStorage()
})

/*
    RUTAS
*/

const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const order = require('./routes/ordersRoutes');


const port = process.env.PORT || 3000;
app.use(logger('dev'))
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.disable('x-powered-by');
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// llamando a las rutas
users(app, upload);
categories(app, upload);
address(app);
products(app, upload);
order(app);

server.listen(3000, '192.168.100.13' || 'localhost', function() {
    console.log('Aplicacion de node js ' +port+ ' iniciada...');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app : app,
    server : server
};