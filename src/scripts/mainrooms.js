
const socket = io();
const chatMessageArea = document.getElementById('chat-messages');
const sendmessageform = document.getElementById('send-message');
const userMessage = document.getElementById('message-input');
const userRoom = localStorage.getItem('roomcode');
const sender = localStorage.getItem('username');

// listen for new message
socket.on(userRoom,(msg)=>{
    const messageHolder = document.createElement('div');
    console.log(messageHolder);
    if(sender == msg.sender){
        // user sent the message
        messageHolder.classList.add("mb-4","text-right");
         const messagespan_sender = document.createElement("span");
        messagespan_sender.classList.add("bg-cyan-600","rounded-lg","px-4", "py-2","inline-block");
        messagespan_sender.textContent = msg.content;
        messageHolder.append(messagespan_sender);
    }else{
        // the other one
        messageHolder.classList.add("mb-4","text-left");
        const messagespan_receiver = document.createElement("span");
        messagespan_receiver.classList.add("bg-gray-700","rounded-lg", "px-4", "py-2", "inline-block");
        messagespan_receiver.textContent = msg.content;
        messageHolder.append(messagespan_receiver);
    }
    chatMessageArea.append(messageHolder);
    window.scrollTo(0,document.body.scrollHeight);
});

sendmessageform.addEventListener('submit',(e)=>{
e.preventDefault();
if(userMessage.value){
    socket.emit(userRoom,{sender:sender,content:userMessage.value});
    userMessage.value = '';   
}
});




