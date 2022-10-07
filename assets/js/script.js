// Import of the catalog
import {catalog} from './catalog.js';

// Basic assignments from DOM Elements to variables

let startButton = document.getElementById('play');
let instructions = document.getElementById('instructions');
let gamearea = document.getElementById('gamearea');
let score = document.getElementById('score');
let attempts = document.getElementById('attempts');
let question = document.getElementById('question');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let congratulation = document.getElementById('congratulation');

// Event listeners
startButton.addEventListener('click', start);

// this code gives all poosible answers an EventListener
const givenAnswer = document.getElementsByClassName('answerGiven');



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
    for (let answer of givenAnswer){
        answer.style.backgroundColor = "white";
        answer.style.color = "black";
    }
    let questionIndex = Math.floor(Math.random() * catalog.length);
    displayQuestion(questionIndex);
}

function displayQuestion(index){
    question.innerHTML = catalog[index].question;
    answer1.innerHTML = catalog[index].answers[0];
    answer2.innerHTML = catalog[index].answers[1];
    answer3.innerHTML = catalog[index].answers[2];
    question.setAttribute('data-index',index);

    for (let answer of givenAnswer){
        answer.addEventListener('click', captureAnswer);
    }
}

function captureAnswer(e){
    let finalAnswer = e.target.getAttribute('data-type');
    e.target.style.backgroundColor = '#129cb8';
    e.target.style.color = 'white';
    checkAnswer(finalAnswer);
}


function checkAnswer(answerGiven){
    for (let answer of givenAnswer){
        answer.removeEventListener('click', captureAnswer);
    }

    let currentQuestionIndex = question.getAttribute("data-index");

    setTimeout(() => {
    if(special === false){
        answerGiven == catalog[currentQuestionIndex].correct ? incrementScore(answerGiven) : decrementScore(answerGiven);
    } else {
        answerGiven == catalog[currentQuestionIndex].correct ? doubleScore(answerGiven) : deleteScore(answerGiven);
    }
    }, "1500");
}

function incrementScore(answerGiven){
    ++score.innerHTML;
    let correctAnswerId = parseInt(answerGiven)+1;
    let correctAnswer = `answer${correctAnswerId}`
    document.getElementById(correctAnswer).style.backgroundColor = '#00eb90';
    incrementAttempts();
}

function decrementScore(answerGiven){
    score.innerHTML == 0 ? score.innerHTML = 0 : --score.innerHTML;

    let falseAnswerId = parseInt(answerGiven)+1;
    let falseAnswer = `answer${falseAnswerId}`;
    document.getElementById(falseAnswer).style.backgroundColor = '#ed403b';

    let answerIndex = question.getAttribute("data-index");
    let rightAnswerNum = catalog[answerIndex].correct + 1;
    let rightAnswer = `answer${rightAnswerNum}`;
    document.getElementById(rightAnswer).style.backgroundColor = '#00eb90';

    incrementAttempts();
}

function incrementAttempts(){
    ++attempts.innerHTML;
    checkScore();
}

function checkScore(){
    if(score == 10){
        congratulation.innerHTML = "<p>Awesome job. You did it! You are a real quiz master, well done!</p>"
    } else if(attempts % 5 == 0){
        riskIt();
    } else {
        deleteQuestion();
    }
    
}

function deleteQuestion(){
    let questionToDelete = question.getAttribute('data-index');
    catalog.splice(questionToDelete, 1);
    setTimeout(()=>{
        pickQuestion();
    }, "2500");   
}