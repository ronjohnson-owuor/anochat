const joinroomButton = document.getElementById('joinroom');
const join = document.getElementById('joinButton');

joinroomButton.addEventListener('click', ()=>{
    window.location.href="/joinroom";
});

// redirect back home
const redirectHome = () => {
    window.location.href = "/";
}