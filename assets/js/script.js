let startButton = document.getElementById("play");
let instructions = document.getElementById('instructions');
let gamearea = document.getElementById('gamearea');
startButton.addEventListener('click', start);


/** 
 * Eventlistener for page reload
 * It gets the user back to the start page / instructions
 * resets the score
 */
instructions.addEventListener("load", function() {
    instructions.style.display = "block";
    gamearea.style.display = "none";
    // setting the score back
})


function start(){
    instructions.style.display = "none";
    gamearea.style.display = "block";
}