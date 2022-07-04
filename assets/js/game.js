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
let questions = [];

//promise trivia database source via trivia api - https://opentdb.com/api_config.php - insert link here:
fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
.then((res) => {
  return res.json();
})
.then((loadedQuestions) => {
  questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
          question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
          formattedQuestion['choice' + (index + 1)] = choice;
      });

      return formattedQuestion;
  });

  startGame();
})

.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
  //previously 'TypeError: Failed to fetch' due to the source, however this is easily rememedied by returning a reload of game.html
  return window.location.assign("./game.html");


});

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
const SECOND = 1;

startGame = () => {
    timerCount = 20;
    questionCounter = 0;
    score = 0;
    // doing ...questions, turns it into a copy into availableQuestions array, instead of than doing availableQuestions = questions which would lead to conflicts if we adjust either variable
    availableQuestions = [ ...questions];
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

        //Ternary Syntax - correct or incorrect
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
       console.log(classToApply);

       if(classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
       }

       //Adds correctness colour class red or green
       selectedChoice.parentElement.classList.add(classToApply);

       if(classToApply !== 'correct') {
        decrementTimer(SECOND);
        selectedChoice.parentElement.classList.add(classToApply);

       }
    
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

//Decrement Timer function
decrementTimer = num => {
    timerCount -= num;
    timerElement.innerText = "-1s " + timerCount;
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
  };