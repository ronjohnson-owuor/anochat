const join = document.getElementById('joinButton');
let username = document.getElementById('username');
let  code = document.getElementById('code');

// TODO: join previous room chat;

 const joinRoom = (e) =>{
    e.preventDefault();
    localStorage.setItem("username",username.value);
    localStorage.setItem("roomcode",code.value);
    location.href = `/rooms?code=${code.value}`;
}
join.addEventListener('click',joinRoom);
