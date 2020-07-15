// All global Const vars
const startBtn = document.querySelector("#startBtn");
const answerBtnArr = document.querySelectorAll("#ansBtnId");
const isCorrect = document.querySelector("#right-or-not");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");
const mutlipleChoiceAnswers = document.querySelector("#startPara");
const displayForm = document.querySelector("#display-highscore-form");
const viewHighScore = document.querySelector("#viewHS");
const scoreboardList = document.querySelector("ul");
const ansButtonDiv = document.querySelector(".answerbtns");
const paraDiv = document.querySelector(".paraDiv");
const startScreen = document.querySelector(".show");
const submitResetDiv = document.querySelector(".submit-reset-btn");

const quizQandA = [
  {
    question:
      "1. What is the HTML tag under which one can write the JavaScript code?",
    choices:
      "(A) <javascript>\r\n\r\n(B) <scripted>\r\n\r\n(C) <script>\r\n\r\n(D) <js>",
    answer: "C",
  },
  {
    question:
      "2. What is the correct syntax for referring to an external script called “geek.js”?",
    choices:
      "A. <script src=”geek.js”>\r\n\r\nB. <script href=”geek.js”>\r\n\r\nC. <script ref=”geek.js”>\r\n\r\nD.<script name=”geek.js”>",
    answer: "A",
  },
  {
    question:
      "3. What is the syntax for creating a function in JavaScript named as Geekfunc?",
    choices:
      "A. function = Geekfunc()\r\n\r\nB. function Geekfunc()\r\n\r\nC. function := Geekfunc()\r\n\r\nD. function : Geekfunc()",
    answer: "B",
  },
  {
    question: "4. How is the function called in JavaScript?",
    choices:
      "A.  call Geekfunc();\r\n\r\nB. call function GeekFunc();\r\n\r\nC. Geekfunc();\r\n\r\nD. function Geekfunc();",
    answer: "C",
  },
  {
    question: "5. How is the function called in JavaScript?",
    choices:
      "A.  call Geekfunc();\r\n\r\nB. call function GeekFunc();\r\n\r\nC. Geekfunc();\r\n\r\nD. function Geekfunc();",
    answer: "C",
  },
  {
    question:
      "6. How to write an ‘if’ statement for executing some code. If 'i' is NOT equal to 5?",
    choices:
      "A. if(i<>5)\r\n\r\nB. if i<>5\r\n\r\nC. if(i!=5)\r\n\r\nD. if i!=5",
    answer: "C",
  },
  {
    question: "7. How to initialize an array in JavaScript?",
    choices:
      "A.  var Geeks= ‘Geek1’, ‘Geek2’, ‘Geek3’\r\n\r\nB. var Geeks=(1:Geek1, 2:Geek2, 3:Geek3)\r\n\r\nC. var Geeks=(1=Geek1, 2=Geek2, 3=Geek3)\r\n\r\nD. var Geeks=[“Geek1”, “Geek2”, “Geek3”]",
    answer: "D",
  },
  {
    question:
      "8. What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
    choices:
      "A. strip()\r\n\r\nB. trim()\r\n\r\nC. stripped()\r\n\r\nD. trimmed()",
    answer: "B",
  },
];

// All global let vars
let highscore = JSON.parse(localStorage.getItem("highscore"));
let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
let questionCounter = 0;
let name = JSON.parse(localStorage.getItem("name"));
let scoreboardArr = [];
isDone = false;
// function to start the timer and have it display on screen.. Count down from 60 seconds
function timeStarter(event) {
  event.preventDefault();
  var timeLeft = 60;
  timerEl.textContent = timeLeft;

  let timeInterval = setInterval(() => {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      timerEl.textContent = "0";
      console.log("Time is done");
      clearInterval(timeInterval);
      if (isDone === false) {
        isDone = true;
        endGame();
      }
    }
  }, 1000);
}

// * updateDisplay to show the questions and choices
function updateDisplay(arr) {
  // Put question on the header
  if (questionCounter < arr.length) {
    headerTag.textContent = arr[questionCounter].question;
    mutlipleChoiceAnswers.textContent = arr[questionCounter].choices;
  } else {
    isDone = true;
    endGame();
  }
}

// * The start and end game functions
function startGame() {
  timeStarter(event);
  ansButtonDiv.classList.replace("hide", "show");
  updateDisplay(quizQandA);
}

function endGame() {
  headerTag.textContent = "Game Over";
  mutlipleChoiceAnswers.textContent = "Nice Job! you scored : " + highscore;
  ansButtonDiv.classList.replace("show", "hide");
  isCorrect.textContent = "";
  displayHighscoreForm();
}

// function to display text form and submit and reset button to display as well as getItem in local storage -- called by endGame() --- displayForm
function displayHighscoreForm() {
  const newInput = document.createElement("input");
  const newSubmit = document.createElement("button");
  const resetBtn = document.createElement("button");
  // form name
  newInput.setAttribute("type", "text");
  newInput.setAttribute("placeholder", "Insert name here");
  newInput.setAttribute("value", "");

  // submit button
  newSubmit.setAttribute("type", "button");
  newSubmit.setAttribute("class", "btn btn-dark");
  newSubmit.setAttribute("id", "startBtn");
  newSubmit.setAttribute("style", "margin-right: 10px");
  newSubmit.textContent = "Submit";

  // reset button
  resetBtn.setAttribute("type", "button");
  resetBtn.setAttribute("class", "btn btn-dark");
  resetBtn.setAttribute("id", "startBtn");
  resetBtn.setAttribute("style", "margin-left: 10px");
  resetBtn.textContent = "Reset";

  // append it to the form parent
  displayForm.appendChild(newInput);
  submitResetDiv.appendChild(newSubmit);
  submitResetDiv.appendChild(resetBtn);

  // * submit listener
  newSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    let name = newInput.value.trim();
    console.log("displayHighscoreForm -> name", name);
  });

  // * reset listener
  resetBtn.addEventListener("click", function (event) {
    event.preventDefault();
    isDone = false;
    location.href = "./index.html";
  });
}

//

// * Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  highscore = 0;
  startBtn.setAttribute("class", "hide");
  // Have var assign to local storage
  if (scoreboard !== null) {
    scoreboardArr = scoreboard;
  }
  // start the game
  startGame();
});

// * listen for a click for the 4 answer buttons & check if the answer was correct or not
ansButtonDiv.addEventListener("click", function (event) {
  const selectedAnswer = event.target.value;
  const answerForQuestion = quizQandA[questionCounter].answer;
  //   console.log(selectedAnswer);

  if (selectedAnswer === answerForQuestion) {
    highscore += 5;
    isCorrect.textContent = "Correct!";
    isCorrect.setAttribute("style", "color: green");
    questionCounter++;
    updateDisplay(quizQandA);
  } else {
    isCorrect.textContent = "Incorrect!";
    isCorrect.setAttribute("style", "color: red");
    questionCounter++;
    updateDisplay(quizQandA);
  }
});

// Highscore section page
function storeArrays() {
  //   localStorage.setItem("nameArr", JSON.stringify(nameArr));
  //   localStorage.setItem("scoreArr", JSON.stringify(scoreArr));
  console.log(nameArr);
  console.log(scoreArr);
}

function renderScoreboard() {
  // Clear todoList element and update todoCountSpan
  // scoredboard.innerHTML = ""; // This allows the list to update if something got deleted
  scoredboard.innerHTML = "";
  // Render a new li for each todo
  for (let i = 0; i < scoreboard.length; i++) {
    let nameLi = document.createElement("li");
    nameLi.textContent = scoreboard[i].name + " : " + scoreboard[i].highscore;
    nameLi.setAttribute("data-index"), i;

    let button = document.createElement("button");
    button.textContent = "Delete";

    nameLi.appendChild(button);
    scoreboardList.appendChild(nameLi);
  }
}
