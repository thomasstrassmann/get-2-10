// Import of the catalog
import {catalog} from './catalog.js';

// Basic assignments from DOM Elements to variables

let startButton = document.getElementById('play');
let instructions = document.getElementById('instructions');
let gamearea = document.getElementById('gamearea');
let score = document.getElementById('score');
let attempts = document.getElementById('attempts');
let question = document.getElementById('question');
let questionContainer = document.getElementById('question-container');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let congratulation = document.getElementById('congratulation');
let riskContainer = document.getElementById('risk-container');
let yes = document.getElementById('yes');
let no = document.getElementById('no');

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
    questionContainer.style.display = "block";
    riskContainer.style.display = "none";

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
    if(score.innerHTML == 10){
        congratulation.innerHTML = "<p>Awesome job. You did it! You are a real quiz master, well done!</p>"
    } else if(attempts.innerHTML % 5 == 0){
        deleteQuestion();
        riskIt();
    } else {
        deleteQuestion();
        pickNextQuestion();
    }
    
}

function deleteQuestion(){
    let questionToDelete = question.getAttribute('data-index');
    catalog.splice(questionToDelete, 1);
}

function pickNextQuestion(){
    setTimeout(()=>{
        pickQuestion();
    }, "2500");   
}

function riskIt(){
    setTimeout(()=>{    
        questionContainer.style.display = "none";
        riskContainer.style.display = "block";
    }, "2500");
    
    yes.addEventListener('click', gamble);
    no.addEventListener('click', pickQuestion);
}

function gamble(){
    questionContainer.style.display = "block";
    riskContainer.style.display = "none";
    special = true;
    pickQuestion();
}

function doubleScore(answerGiven){
    score.innerHTML = parseInt(score.innerHTML) * 2;

    let correctAnswerId = parseInt(answerGiven)+1;
    let correctAnswer = `answer${correctAnswerId}`
    document.getElementById(correctAnswer).style.backgroundColor = '#00eb90';

    special = false;
    incrementAttempts();
}

function deleteScore(answerGiven){
    score.innerHTML = 0;

    let falseAnswerId = parseInt(answerGiven)+1;
    let falseAnswer = `answer${falseAnswerId}`;
    document.getElementById(falseAnswer).style.backgroundColor = '#ed403b';

    let answerIndex = question.getAttribute("data-index");
    let rightAnswerNum = catalog[answerIndex].correct + 1;
    let rightAnswer = `answer${rightAnswerNum}`;
    document.getElementById(rightAnswer).style.backgroundColor = '#00eb90';

    special = false;
    incrementAttempts();
}