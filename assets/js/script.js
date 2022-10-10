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

// Event listeners to start the game
startButton.addEventListener('click', start);

// this code gives all possible answers an EventListener
const givenAnswer = document.getElementsByClassName('answerGiven');

// global variable for all functions to check, whether the user chose to gamble
var special = false;

/*
 Eventlistener for page reload...
 - gets the user back to the start page / instructions
 - hides the gamearea and displays the instructions page 
*/
instructions.addEventListener("load", function() {
    instructions.style.display = "flex";
    gamearea.style.display = "none";
});

/**
 * gets called when the user clicks on start button.
 * hides the instructions page.
 * displays the gamearena.
 * calls the pickQuestion function.
 */
function start(){
    instructions.style.display = "none";
    gamearea.style.display = "flex";
    pickQuestion();
}

/**
 * displays the question container.
 * gives all options a white background and black color.
 * genereates a random index from the catalog.
 * calls the displayQuestion function with the random index as an argument.
 */
function pickQuestion(){
    questionContainer.style.display = "flex";
    riskContainer.style.display = "none";

    for (let answer of givenAnswer){
        answer.style.backgroundColor = "white";
        answer.style.color = "black";
    }
    let questionIndex = Math.floor(Math.random() * catalog.length);
    displayQuestion(questionIndex);
}


/**
 * gets called everytime by the pickQuestion function with the questionIndex as parameter.
 * grabs the question and options from the random object in the catalog.
 * assigns them to the according places in the HTML file.
 * stores the question index in the attribute data-index.
 * creates an event listener for all options.
 */
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

/**
 * gets called when a user clicks an option.
 * captures the answer given by the user by catching the data-type attribute attached to the clicked event.
 * gives visual feedback with style change (option logged in).
 * calls checkAnswer function.
 */
function captureAnswer(e){
    let finalAnswer = e.target.getAttribute('data-type');
    e.target.style.backgroundColor = '#129cb8';
    e.target.style.color = 'white';
    checkAnswer(finalAnswer);
}

/**
 * gets called by captureAnswer and receives the given answer as an argument.
 * first removes all click events from options to prevent multiple answers.
 * then grabs the current question index.
 * delays further action by 1.5 seconds for better UX and tension building.
 * it compares the given answer and correct answer from the catalog. 
 * checks if the global special variable is set to false. 
 * if set to false and answers match, the incrementScore function is called with the given answer as an argument.
 * if they do not match, the decrementScore function is called with the given answer as an argument.
 * if the special variable is true, it calls doubleScore instead of incrementScore and deleteScore instead of decrementScore.
 */
function checkAnswer(answerGiven){
    for (let answer of givenAnswer){
        answer.removeEventListener('click', captureAnswer);
    }

    let currentQuestionIndex = question.getAttribute("data-index");

    setTimeout(() => {
    if(special === false){
        return answerGiven == catalog[currentQuestionIndex].correct ? incrementScore(answerGiven) : decrementScore(answerGiven);
    } else {
        return answerGiven == catalog[currentQuestionIndex].correct ? doubleScore(answerGiven) : deleteScore(answerGiven);
    }
    }, "1500");
}

/**
 * gets called after a right answer is given and special is set to false.
 * increments the score by 1.
 * translates the data-type attribute to the correct answer id.
 * colors the correct answer for visual feedback.
 * calls incrementAttempts function.
 */
function incrementScore(answerGiven){
    let correctAnswerId = parseInt(answerGiven)+1;
    let correctAnswer = `answer${correctAnswerId}`;
    document.getElementById(correctAnswer).style.backgroundColor = '#00eb90';
    document.getElementById(correctAnswer).style.color = 'black';
    incrementAttempts();
    return ++score.innerHTML;
}

/**
 * gets called after a false answer is given and special is set to false.
 * decrements the score by 1 if the score is not 0.
 * translates the data-type attribute to the false answer id.
 * colors the incorrect answer for visual feedback.
 * gets the current question index.
 * gets the correct answer from the catalog and increments it by 1 to inject it as an answer id.
 * the right answer get colored green for visual feedback.
 * calls incrementAttempts function
 */
function decrementScore(answerGiven){
    let falseAnswerId = parseInt(answerGiven)+1;
    let falseAnswer = `answer${falseAnswerId}`;
    document.getElementById(falseAnswer).style.backgroundColor = '#ed403b';
    document.getElementById(falseAnswer).style.color = 'black';

    let answerIndex = question.getAttribute("data-index");
    let rightAnswerNum = catalog[answerIndex].correct + 1;
    let rightAnswer = `answer${rightAnswerNum}`;
    document.getElementById(rightAnswer).style.backgroundColor = '#00eb90';
    incrementAttempts();
    return score.innerHTML == 0 ? score.innerHTML = 0 : --score.innerHTML;
}


/**
 * gets called after a right answer is given and special is set to true.
 * multiplies the score by 2.
 * translates the data-type attribute to the correct answer id.
 * colors the correct answer for visual feedback.
 * sets special to false again, so that the next question is normal again.
 * calls incrementAttempts function.
 */
 function doubleScore(answerGiven){
    score.innerHTML = parseInt(score.innerHTML) * 2;

    let correctAnswerId = parseInt(answerGiven)+1;
    let correctAnswer = `answer${correctAnswerId}`;
    document.getElementById(correctAnswer).style.backgroundColor = '#00eb90';
    document.getElementById(correctAnswer).style.color = 'black';

    special = false;
    incrementAttempts();
}

/**
 * gets called after a false answer is given and special is set to true.
 * sets the score to 0.
 * translates the data-type attribute to the false answer id.
 * colors the incorrect answer for visual feedback.
 * gets the current question index.
 * gets the correct answer from the catalog and increments it by 1 to inject it as an answer id.
 * the right answer get colored green for visual feedback.
 * sets special to false again, so that the next question is normal again.
 * calls incrementAttempts function
 */
function deleteScore(answerGiven){
    score.innerHTML = 0;

    let falseAnswerId = parseInt(answerGiven)+1;
    let falseAnswer = `answer${falseAnswerId}`;
    document.getElementById(falseAnswer).style.backgroundColor = '#ed403b';

    let answerIndex = question.getAttribute("data-index");
    let rightAnswerNum = catalog[answerIndex].correct + 1;
    let rightAnswer = `answer${rightAnswerNum}`;
    document.getElementById(rightAnswer).style.backgroundColor = '#00eb90';
    document.getElementById(falseAnswer).style.color = 'black';

    special = false;
    incrementAttempts();
}

/**
 * gets called by all increment and decrement functions.
 * increases the attempts by 1.
 * calls the checkScore function.
 */
function incrementAttempts(){
    ++attempts.innerHTML;
    checkScore();
}

/**
 * gets called by the incrementAttempts function.
 * if the answer is greater or equal to 10, the congratulation is displayed.
 * if the attempts are divisible by 5, it calls deleteQUestion and riskIt.
 * else it calls deleteQuestion and pickNextQuestion.
 */
function checkScore(){
    if(score.innerHTML >= 10){
        congratulation.innerHTML = "<p>Awesome job. You did it! You are a real quiz master, well done!</p>";
    } else if(attempts.innerHTML % 5 == 0){
        deleteQuestion();
        riskIt();
    } else {
        deleteQuestion();
        pickNextQuestion();
    }
    
}

/**
 * gets called by checkScore.
 * deletes the current question from the catalog.
 */
function deleteQuestion(){
    let questionToDelete = question.getAttribute('data-index');
    catalog.splice(questionToDelete, 1);
}

/**
 * gets called by checkScore or riskIt, if the user has less than 2 points.
 * calls the pickQuestion function with a delay of 2.5 seconds for better UX.
 */
function pickNextQuestion(){
    setTimeout(()=>{
        pickQuestion();
    }, "2500");   
}

/**
 * gets called by checkScore function if the attempts are devisible by 5.
 * checks if the score is greater than 1.
 * if not pickNextQuestion gets called.
 * if so, the riskContainer displays as block element and the question container disappears after 2.5 seconds.
 * adds eventlisteneres to the options yes and no.
 */
function riskIt(){
    if(score.innerHTML <= 1){
        pickNextQuestion();
    } else {
    setTimeout(()=>{    
        questionContainer.style.display = "none";
        riskContainer.style.display = "block";
    }, "2500");
    
    yes.addEventListener('click', gamble);
    no.addEventListener('click', pickQuestion);
    }
}

/**
 * gets called, when the user wants to gamble for double points.
 * the riskContainer disappears and the questionContainer pops up.
 * sets the global special variable to true.
 * calls pickQuestion.
 */
function gamble(){
    questionContainer.style.display = "flex";
    riskContainer.style.display = "none";
    special = true;
    pickQuestion();
}