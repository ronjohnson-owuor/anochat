const join = document.getElementById('joinButton');
let username = document.getElementById('username');
const avatar_list = document.getElementById("avatar_list");
let  code = document.getElementById('code');

// TODO: join previous room chat;

 const joinRoom = (e) =>{
    e.preventDefault();
    localStorage.setItem("username",username.value);
    localStorage.setItem("roomcode",code.value);
    location.href = `/rooms?code=${code.value}`;
}
join.addEventListener('click',joinRoom);


let avatars = [
    "../../avatars/avatar1.jpg",
    "../../avatars/avatar2.png",
    "../../avatars/avatar3.jpg",
    "../../avatars/avatar4.jpg",
    "../../avatars/avatar5.jpg",
    "../../avatars/avatar6.png",
    "../../avatars/avatar7.png",
    "../../avatars/avatar8.png",
    "../../avatars/avatar9.png",
    "../../avatars/avatar10.jpg",
    "../../avatars/avatar11.png",
    "../../avatars/avatar12.jpg"
]

avatars.map(eachavatar =>{
 let img = document.createElement("img");
 img.src = eachavatar;
 img.classList.add("w-[50px]","h-[50px]","rounded-[100vh]","object-cover","cursor-pointer");
 img.addEventListener("click",()=>{
    let allImages = document.querySelectorAll("#avatar_list img");
    allImages.forEach(images =>images.classList.remove("border","border-cyan-500","border-4"));
    img.classList.add("border","border-cyan-500","border-4");
    localStorage.setItem("avatar",img.src);
 });
 avatar_list.appendChild(img);
});
