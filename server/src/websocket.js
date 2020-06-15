const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');
const { Connection } = require('mongoose');


let io;
const connections = [];


exports.setupWebsocket = (server) => {
    //console.log('foi aeeeeeeeee');
    io = socketio(server);
    

     io.on('connection', socket => {
        //console.log(socket.id); 
        //console.log(socket.handshake.query);

        /**setTimeout(() => {
           socket.emit('message', 'Hello Omnistack');
        }, 3000);*/

        //recebemos os dados do front para verificar se temos um novo deve cadastrado

        const {latitude, longitude, techs} = socket.handshake.query;

         //guardando as conexões
        connections.push({
           id: socket.id,
           coordinates: {
              latitude: Number(latitude),
              longitude: Number(longitude),
           },
           techs: parseStringAsArray(techs),
        });


        
    
    
      });
};



exports.findConnections = (coordinates, techs) => {
   return connections.filter(connection => {
      return calculateDistance(coordinates, Connection.coordinates) < 10
       && connection.techs.sone(item => techs.includes(item))
   })
}

exports.sendMessage = (to, message, data) => {
   to.forEach(connection => {
      io.to(connection.id).emit(message, data);
   })
}