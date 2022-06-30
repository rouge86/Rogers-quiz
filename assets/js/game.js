const question = document.getElementById("question");
/* Notice get ElementsByClassName selects multiple id classes. ps. you just added getid snippet as a short get for getElementById try it.
Also adding Array.from allows you to add customer properties:
Any custom class in html that is prefixed with 'data' will become a property of that node. See Console dataset: DOMStringMap {number: '1'} this is customisable */
const choices = Array.from(document.getElementsByClassName("choice-text"));
//console.log(choices)
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
var timerElement = document.getElementById("timer-count");


let currentQuestion = {};

//Timer Variables
var timer;
var timerCount;

//This will let you create an delay
let acceptingAnswer = false;

//Score counter
var winCounter = 0;
var loseCounter = 0;
let score = 10;
let questionCounter = 0;

// Copy of full Q set, take Qs out of available array, so you can always find new Q for user
let availableQuestions = [];

// Array of objects
let questions = [
    
    /* Hardcoded Qs for debugging
    {
        question: "inside which HTML element do we put the Javascript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },

    {
        question: "What is the correct syntax for referring to an external script called 'xx.js'?",
        choice1: "<script href='xx.js'>",
        choice2: "<script name='xx.js'>",
        choice3: "<script src='xx.js'>",
        choice4: "<script file='xx.js'>",
        answer: 3
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    */
];

//promise
fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
    .then( res => {
    return res.json();
})
    .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [ ...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice;
        });

        return formattedQuestion;
    });
    //questions = loadedQuestions;
    startGame();
})

//error scenario, part of promise
.catch((err) => {
    console.error(err);
});

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    timerCount = 10;
    questionCounter = 0;
    score = 0;
    // doing ...questions, turns it into a copy into availableQuestions array, instead of than doing availableQuestions = questions which would lead to conflicts if we adjust either variable
    availableQuestions = [ ...questions];
    //console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    startTimer()

};

// Arrow syntax for ES6, more concise, if you just have a single parameter just type it without the ()
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //Local Storage
        localStorage.setItem('mostRecentScore', score);

        //go to end page
        return window.location.assign("./end.html");
    }
    //Start the counter when game start, increments it to 1
    questionCounter ++;
    questionCounterText.innerHTML = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    //Loads appropriate choices from dataset
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    //Take out questions we've already used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        //test target console.log(e.target);
        if(!acceptingAnswer) return;
        
        acceptingAnswer = false; 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //Ternary Syntax 
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
       console.log(classToApply);

       if(classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
       }

       //Adds correctness colour class red or green
       selectedChoice.parentElement.classList.add(classToApply);

    
       //Removes colour class 
       setTimeout(() =>{
        selectedChoice.parentElement.classList.remove(classToApply);
        //console.log(selectedAnswer == currentQuestion.answer);
        getNewQuestion();
       }, 1000);
    });
});

//Increment Score function
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./end.html");

      }
    }, 1000);
  }
/* Not sure if this is applicable yet
// The winGame function is called when the win condition is met
function winGame() {
    winCounter++
    setWins()
  }
  
  // The loseGame function is called when timer reaches 0
  function loseGame() {
    loseCounter++
    setLosses()
  }
  

// Updates win count on screen and sets win count to client storage
function setWins() {
    score.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
  }
  
  // Updates lose count on screen and sets lose count to client storage
  function setLosses() {
    score.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
  }
  

// These functions are used by init
function getWins() {
    // Get stored value from client storage, if it exists
    var storedWins = localStorage.getItem("winCount");
    // If stored value doesn't exist, set counter to 0
    if (storedWins === null) {
      winCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      winCounter = storedWins;
    }
    //Render win count to page
    win.textContent = winCounter;
  }
  
  function getlosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
      loseCounter = 0;
    } else {
      loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
  } */