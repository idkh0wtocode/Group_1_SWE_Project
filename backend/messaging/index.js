var express = require('express');
var socket = require('socket.io');
var axios = require('axios');
const bodyParser = require('body-parser');

var app = express();
var server = app.listen(5000, function(){
    console.log('Listening on port 5000');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/messages/:senderID/:receiverID', async (req,res) =>{
    const {senderID, receiverID} = req.params;
    console.log(senderID);
    console.log(receiverID);
    const query = await axios.get(`http://127.0.0.1:8000/messages/${senderID}/${receiverID}/`);
    res.json(query.data);

});


app.use(express.static('public'));     

var io = socket(server);

io.on('connection', async function(socket){
    console.log('connected');

    socket.on('chatSend', async function(data){
        io.sockets.emit('chat', data);

        const query = await axios.post('http://127.0.0.1:8000/messages/send/',{
            senderID: data.senderID,
            receiverID: data.receiverID,
            content: data.message
        })


        console.log("WORKS");
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data.senderID);
    });

    socket.on('chatRetrieve', function(data){

        io.sockets.emit('chat', data);
    });
})

