module.exports = (io) => {
    const namespace = io.of('/orders/delivery');

    namespace.on('connection', function(socket) {
        console.log('Usuario conectado a socket /orders/delivery');
        socket.on('position', function(data) {
            console.log('Se emitio', JSON.parse(data));
            const dataParse = JSON.parse(data); // DEBE ENVIARLA EL CLIENTE(ID, LAT, LNG)
            namespace.emit(`position/${dataParse.id_order}`, {id_order : dataParse.id_order, lat: dataParse.lat, lng : dataParse.lng}); // data emitida a kotlin
        });
        socket.on('disconnect', function(data) {
            console.log('Usuario desconectado de socket');
        });
    });
}