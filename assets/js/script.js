let startButton = document.getElementById("play");
let instructions = document.getElementById('instructions');
let gamearea = document.getElementById('gamearea');

startButton.addEventListener('click', start());

function start(){
    instructions.style.display = "none";
    gamearea.style.display = "block";
}