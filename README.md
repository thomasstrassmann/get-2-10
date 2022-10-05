# Get-2-10
## A quiz for everyone


![](./assets")

[Click here for the full website access]()



## Table of contents
1. [Introduction](#introduction) 
2. [Preparation - UX and UXD](#preparation)
3. [Features](#features)
4. [Testing](#testing)
5. [Deployment](#deployment) 
6. [Credits / attributes](#credits) 



## Introduction 
This quiz game tests the general knowledge of the users with really hard questions and thus presents a challenge for all passionate guessers. The goal of the game is to reach 10 correct answers with as few attempts as possible. Hence the name, Get 2 10. 
The user always receives randomly asked questions from any subject area. If he answers correctly, he receives a point. If he answers incorrectly, he loses one. 
An exciting trick of the game is: After every fifth question, a player can play "all or nothing". If he answers correctly, he receives double the points. If he answers incorrectly, he loses all points and has to start over. So the minimum number of questions a player needs to reach the 10 points is 6 (5x 1 point, 1x 5 points).  
Sounds simple? Well, it depends on the questions.... 

## Preparation - UX and UXD
In terms of user experience, the focus should be on a varied challenge as well as fun. The users must not only score points with broad general knowledge, but also with a sure instinct as to when it makes sense to gamble and when it is better not to take any risks. The game is aimed at a wide audience. Anyone who likes quizzes should love this game.


The **UXD - User Experience Design** was declared and described in advance and includes the 5 panels *strategy, scope, structure, skeleton and surface*. 

### Strategy 
The game itself, as well as the questions, do not imply opinions, but only ask for knowledge. Therefore, it is intended for each person and is culturally appropriate. 

What makes this game special is the severity and whimsicality of the questions. No jokers help here, only your own brain. There is also a special feature that allows users to gamble for your score after every fifth question. 

To structure the content and make the data retrievable, there are different types, further explained in the scope section. 

What remains is the realization that the interface and the rules of the game should be self-explanatory for the user.

---
### Scope 
What is feasible? 

The question catalog is stored in an external JavaScript file. The catalog includes an array that contains objects (questions & answers), like so: 

let catalog = [
{question: “As of 2022, what is the most expensive painting in the world?”,

answers: [“Nu couché - Amedeo Modigliani”, “Les femmes d´Alger - Pablo Picasso”, “Salvator Mundi - Leonardo da Vinci”],

correct : 2

 },

{question: “...?”,

answers: [“...”, “...”, “…”],

correct : 0

 }]


This allows the game logic to access the correct data at any time. 

In terms of technology, HTML, CSS and two JavaScript files are used. One contains, as already formulated, the question catalog, the other the functions, in order to increase readability and maintainability of the code, as well as to separate the purposes. 

The required functions will look like this: 

pickQuestion(){
* starts when DOM is loaded or score has been increased or decreased (new question)
* let questionIndex = math.random * catalog.length (get a random question out of the catalog)
* return questionIndex
* calls displayQuestion(questionIndex)
}

displayQuestion(questionIndex){
* get all the required DOM elements and stores it in variables - question, answer1, answer2, answer3
* take the question from the catalog using the questionIndex and insert the values into the variables	

}


checkAnswer(){
* gets called after click event on one of the three answers
* checks if the global variable special is set to true
* compares data-type (1,2 or 3 of HTML file) with the value of the correct-key in the catalog
* if the two values match, it displays a green effect and calls incrementScore. Unless the special variable equals true, in which case it calls the doubleScore function. 
* if the two values do not match, it displays a red effect on the answer and calls the decrementScore function. Unless the special variable equals true, in which case it calls the deleteScore function. 
* setTimeout function for better UX and building up tension.

}

deleteQuestion(){
* deletes the current questions from the catalog to prevent duplicate questions

}

incrementScore(){
* gets the current score from the DOM and adds 1
* calls incrementAttempts and checkScore function

}

decrementScore(){
* gets the current score from the DOM and subtracts 1
* calls incrementAttempts and checkScore function

}

doubleScore(){
* takes the current score from the DOM and multplies it by 2.
* calls incrementAttempts and checkScore function
}

deleteScore(){
* sets back the current score in the DOM.
* calls incrementAttempts and checkScore function
}

incrementAttempts(){
* adds 1 to the attempts displayed on the HTML page after 
}

checkScore(){
* gets called after every increment / decrement and doubleScore / deleteScore function, depending on the scenario.
* checks if score = 10. If so, it displays a congratulation paragraph.
* calls deleteQuestion function
* sets the global special variable to false
* checks if attempts = (5 || 10 || 15...). If so, it calls the riskIt function. Otherwise, it calls pickQuestion.

}


riskIt(){
* asks user if he or she wants to play all or nothing.
* If answered yes: A global variable named special is set to true and calls pickQuestion.
* If answered no: pickQuestion gets called and the cycle starts all over.
}


What is not feasible? 

Due to time constraints, there will be limitations on: 
- the number of questions (not more than 50)!
- the design. No animations.


--- 
### Structure 



**Index page** 



---
### Skeleton 
To get a visual idea of the already mentioned content, a blueprint or wireframe model was made. There are corresponding wireframe models for each HTML page. For the sake of completeness, it should be mentioned here that the wireframes are not binding and ideas and conceptions of the website may change during the development phase.

You can click [here](./assets/wireframes/) to take a look at the wireframes.

---
### Surface

The color palette considered is composed of an orange tone of the bass from the hero image, with the application of other compound colors. Adobe's Color Wheel was used for this purpose. The colors are also located in the link above. 

Google Fonts was used for the typography. The font ... is used for important texts and headlines, the font ... is used for descriptive paragraphs. For the icons in the footer, the fontawesome page was a reliable source.

A website logo was created with the Adobe Creative Cloud, Adobe Express to be exact. The website logo is also part of the [](./assets/).



## Features






### Features for the future 
The following features would be ideas for further development...
* 
* 
* 



## Testing 

The page and its functionality was tested manually. This was done primarily using Chrome DevTools (Lighthouse), as well as the website http://www.responsinator.com/. These were especially helpful to check layout, design and structure. 

Furthermore, the W3C Validator (jigsaw) was used to ensure that all HTML pages and the CSS file are valid. Hardly any errors were found. 

To test accessibility and SEO, Lighthouse was used. 

![Lighthouse report](./assets/  "Lighthouse report")



## Deployment 

This page is hosted via GitHub Pages, which is easily doable via the settings. In the future this webpage could also run under a custom url. 

[You can access the website right here]()


## Credits

During the construction of this website some sources and pages were very helpful and without it, it would have been much harder, so thanks to every source down below! 
A listing of the sources is done here by categorization: 



**Images:**


**Code:** 

