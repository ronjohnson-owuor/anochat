
const socket = io();
const chatMessageArea = document.getElementById('chat-messages');
const sendmessageform = document.getElementById('send-message');
const userMessage = document.getElementById('message-input');
const userRoom = localStorage.getItem('roomcode');
const sender = localStorage.getItem('username');
const senderAvatar = localStorage.getItem('avatar');
const exit = document.getElementById("exit");
const users = document.getElementById('users');

// listen for new message
socket.on(userRoom,(msg)=>{
    const messageHolder = document.createElement('div');
    console.log(messageHolder);
    if(sender == msg.sender){
        // user sent the message
        messageHolder.classList.add("mb-4","flex","justify-end");
        const messageContainer = document.createElement("div");
        const profileHolder = document.createElement("div");
        const textHolder = document.createElement("div");

        messageContainer.classList.add(
            "bg-gradient-to-r", 
            "from-gray-800", 
            "to-gray-900", 
            "border",
            "border-gray-700",
            "text-right",
            "rounded-lg",
            "px-4",
            "py-2",
            "inline-block",
            "flex",
            "items-start",
            "gap-3",
            "justify-end",
            "my-4",
            "w-full",
            "sm:w-[50%]"
          );
          
        profileHolder.classList.add("w-[50px]","p-2");
        textHolder.classList.add("w-[80%]","mx-4");


        let img = document.createElement("img");
        img.src = msg.avatar;
        img.classList.add("w-[50px]","h-[100%]","rounded-[100vh]","object-cover","cursor-pointer");
        profileHolder.append(img);

        let senderName = document.createElement("p");
        senderName.classList.add("font-bold","text-white","text-md");
        senderName.textContent= msg.sender;

        // actual message
        let message = document.createElement("p");
        message.classList.add("text-black","text-sm","mt-2");
        message.textContent= msg.content;

        textHolder.append(senderName);
        textHolder.append(message);
        messageContainer.append(textHolder);
        messageContainer.append(profileHolder);

        messageHolder.append(messageContainer);
        
    }else{
        // the other one
        messageHolder.classList.add("mb-4","flex","justify-start");
        const messageContainer = document.createElement("div");
        const profileHolder = document.createElement("div");
        const textHolder = document.createElement("div");

        messageContainer.classList.add(
            "bg-gradient-to-r", 
            "from-gray-800", 
            "to-gray-900", 
            "border",
            "border-gray-300",
            "text-left",
            "rounded-lg",
            "px-4",
            "py-2",
            "inline-block",
            "flex",
            "items-start",
            "gap-3",
            "justify-start",
            "flex-row-reverse",
            "my-4",
            "w-full",
            "sm:w-[50%]"
          );
          
        profileHolder.classList.add("w-[50px]","p-2");
        textHolder.classList.add("w-[80%]","mx-4");


        let img = document.createElement("img");
        img.src = msg.avatar;
        img.classList.add("w-[50px]","h-[100%]","rounded-[100vh]","object-cover","cursor-pointer");
        profileHolder.append(img);

        let senderName = document.createElement("p");
        senderName.classList.add("font-bold","text-white","text-md");
        senderName.textContent= msg.sender;

        // actual message
        let message = document.createElement("p");
        message.classList.add("text-black","text-sm","mt-2");
        message.textContent= msg.content;

        textHolder.append(senderName);
        textHolder.append(message);
        messageContainer.append(textHolder);
        messageContainer.append(profileHolder);

        messageHolder.append(messageContainer);
    }
    chatMessageArea.append(messageHolder);
    window.scrollTo(0,document.body.scrollHeight);
});

sendmessageform.addEventListener('submit',(e)=>{
e.preventDefault();
if(userMessage.value){
    socket.emit(userRoom,{avatar: senderAvatar,sender:sender,content:userMessage.value});
    userMessage.value = '';   
}
});


// command to exit room
const exitRoom = () =>{
    location.href= "/joinroom";
}
exit.addEventListener('click',exitRoom);


// get total number of users in a room
socket.on('usercount',(data)=>{
    if(data.roomcode == userRoom){
        users.textContent = `${data.users} active`;
        // display message if user exit or enter
        displayMessage(data.type);
        return;
    }
});



const displayMessage = (type) => {          
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add("w-full", "h-[40px]", "text-center","text-white", "my-10", "rounded-[20px]", "flex", "items-center", "justify-center");
    let textspan = document.createElement('span');
    const text = type == 0 ?" 🎯 someone entered the chat room"  : "🏃 someone exited the chat room";
    textspan.textContent = text;
    wrapperDiv.append(textspan);
    if(type == 0){
        wrapperDiv.classList.add('bg-green-400');
        wrapperDiv.classList.remove('bg-red-400');
    }

    if(type == 1) {
        wrapperDiv.classList.remove('bg-green-400');
        wrapperDiv.classList.add('bg-red-400');

    }
    chatMessageArea.append(wrapperDiv);
}


