// Import of the catalog
import {catalog} from './catalog.js';

// Basic assignments from DOM Elements to variables

let startButton = document.getElementById('play');
let instructions = document.getElementById('instructions');

let gamearea = document.getElementById('gamearea');
let score = document.getElementById('score');
let attmepts = document.getElementById('attempts');
let question = document.getElementById('question');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');

// Event listeners
startButton.addEventListener('click', start);

// this code gives all answers an EventListener
const givenAnswer = document.getElementsByClassName('answerGiven');
for (let answer of givenAnswer){
    answer.addEventListener('click', captureAnswer);
}


// global variable
var special = false;


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
    question.innerHTML = catalog[index].question;
    answer1.innerHTML = catalog[index].answers[0];
    answer2.innerHTML = catalog[index].answers[1];
    answer3.innerHTML = catalog[index].answers[2];
    question.setAttribute('data-index',index);
}

function captureAnswer(e){
    let finalAnswer = e.target.getAttribute('data-type');
    checkAnswer(finalAnswer);
}


function checkAnswer(answerGiven){
    let currentQuestionIndex = question.getAttribute("data-index");
    if(special === false){
        answerGiven == catalog[currentQuestionIndex].correct ? incrementScore() : decrementScore();
    } else {
        answerGiven == catalog[currentQuestionIndex].correct ? doubleScore() : deleteScore();
    }
}

function incrementScore() {

}
