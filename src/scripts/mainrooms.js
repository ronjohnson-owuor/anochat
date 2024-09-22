
const socket = io();
const chatMessageArea = document.getElementById('chat-messages');
const sendmessageform = document.getElementById('send-message');
const userMessage = document.getElementById('message-input');
const userRoom = localStorage.getItem('roomcode');
const sender = localStorage.getItem('username');
const senderAvatar = localStorage.getItem('avatar');
const exit = document.getElementById("exit");

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
            "from-cyan-600", 
            "to-teal-400", 
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
        img.classList.add("w-[50px]","h-[50px]","rounded-[100vh]","object-cover","cursor-pointer");
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
            "from-gray-700", 
            "to-gray-900", 
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
        img.classList.add("w-[50px]","h-[50px]","rounded-[100vh]","object-cover","cursor-pointer");
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



