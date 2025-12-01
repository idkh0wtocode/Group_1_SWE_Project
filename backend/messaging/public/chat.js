//Source: https://dev.to/abelroy/create-a-simple-html-website-with-postgres-database-5agp
//Source: https://www.slingacademy.com/article/postgresql-upsert-update-if-exists-insert-if-not/



var socket = io.connect('http://localhost:5000/');
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    sender = document.getElementById('sender'),
    receiver = document.getElementById('receiver'),
    peoplebtn = document.getElementById('sendPeople');


btn.addEventListener('click', function(){

    const parameters = new URLSearchParams(window.location.search);
    var receiverParam = parameters.get('receiver');
    var senderParam = parameters.get('sender');

    socket.emit('chatSend',{
        message:message.value,
        senderID:senderParam,
        receiverID: receiverParam
    })

});

window.addEventListener('DOMContentLoaded', async function(){
    const parameters = new URLSearchParams(window.location.search);
    var receiverParam = parameters.get('receiver');
    var senderParam = parameters.get('sender');
    const previousMessages = await fetch(`http://127.0.0.1:8000/messages/${senderParam}/${receiverParam}`);
    const data = await previousMessages.json();
    console.log(data);

    for (let i = 0; i<data.length; i++) {
        socket.emit('chatRetrieve',{
            senderID:data[i].senderID,
            message:data[i].content
        })
    }
})
/*
peoplebtn.addEventListener('click', async function(){

    const parameters = new URLSearchParams(window.location.search);
    var receiverParam = parameters.get('receiver');
    var senderParam = parameters.get('sender');
    const previousMessages = await fetch(`http://127.0.0.1:8000/messages/${senderParam}/${receiverParam}`);
    const data = await previousMessages.json();
    console.log(data);

    for (let i = 0; i<data.length; i++) {
        socket.emit('chatRetrieve',{
            senderID:data[i].senderID,
            message:data[i].content
        })
    }
});
*/
message.addEventListener('keypress', function(){
    const parameters = new URLSearchParams(window.location.search);
    var senderParam = parameters.get('sender');
    socket.emit('typing', senderParam)
});

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.senderID + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
})