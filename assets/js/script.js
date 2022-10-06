// Import of the catalog
import {catalog} from './catalog.js';

// Basic assignments

let startButton = document.getElementById("play");
let instructions = document.getElementById('instructions');
let gamearea = document.getElementById('gamearea');

// Event listeners
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
    pickQuestion();
}

function pickQuestion(){
    let questionIndex = Math.floor(Math.random() * catalog.length);
    return displayQuestion(questionIndex);
}

function displayQuestion(index){
    let question = document.getElementById('question');
    let answer1 = document.getElementById('answer1');
    let answer2 = document.getElementById('answer2');
    let answer3 = document.getElementById('answer3');

    question.innerHTML = catalog[index].question;
    answer1.innerHTML = catalog[index].answers[0];
    answer2.innerHTML = catalog[index].answers[1];
    answer3.innerHTML = catalog[index].answers[2];

}

