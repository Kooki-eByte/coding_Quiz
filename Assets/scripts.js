// All global Const vars
const startBtn = document.querySelector("#startBtn");
const answerBtnArr = document.querySelectorAll("#ansBtnId");
const isCorrect = document.querySelector("#right-or-not");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");
const mutlipleChoiceAnswers = document.querySelector("#startPara");
const displayForm = document.querySelector("#display-highscore-form");
const scoreboardList = document.querySelector("ul");
const ansButtonDiv = document.querySelector(".answerbtns");
const paraDiv = document.querySelector(".paraDiv");
const startScreen = document.querySelector(".show");
const submitResetDiv = document.querySelector(".submit-reset-btn");

const quizQandA = [
  {
    question: "what does RGB stand for?",
    choices:
      "(A)Red, Green, Blue\r\n\r\n(B)Red, Green, Black\r\n\r\n(C)Rose, Gold, Brown\r\n\r\n(D)I dont even know lol",
    answer: "A",
  },
  {
    question: "Question 2?",
    choices: "A. ans1\r\n\r\nB. ans2\r\n\r\nC. ans3\r\n\r\nD. ans4",
    answer: "B",
  },
  {
    question: "Question 3?",
    choices: "A. ans1\r\n\r\nB. ans2\r\n\r\nC. ans3\r\n\r\nD. ans4",
    answer: "C",
  },
  {
    question: "Question 4?",
    choices: "A. ans1\r\n\r\nB. ans2\r\n\r\nC. ans3\r\n\r\nD. ans4",
    answer: "D",
  },
];

// All global let vars
let highscore = JSON.parse(localStorage.getItem("highscore"));
let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
let questionCounter = 0;
let name = JSON.parse(localStorage.getItem("name"));

// function to start the timer and have it display on screen.. Count down from 60 seconds
function timeStarter(event) {
  event.preventDefault();
  let timeLeft = 10;
  timerEl.textContent = timeLeft;

  let timeInterval = setInterval(() => {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      timerEl.textContent = "0";
      console.log("Time is done");
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}

// * updateDisplay to show the questions and choices
function updateDisplay(arr) {
  // Put question on the header
  headerTag.textContent = arr[questionCounter].question;
  mutlipleChoiceAnswers.textContent = arr[questionCounter].choices;

  console.log("DONE!!");
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
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("highscore", JSON.stringify(highscore));
    scoreboard.push({ name: name, highscore: highscore });
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    // let storedNameArr = JSON.parse(localStorage.getItem("nameArr"));
    // let storedScoreArr = JSON.parse(localStorage.getItem("scoreArr"));
    location.href = "./assets/highscore.html";
    storeArrays();
    renderScoreboard(name);
  });

  // * reset listener
  resetBtn.addEventListener("click", function (event) {
    event.preventDefault();
    location.href = "./index.html";
    console.log(highscore);
    console.log(name);
  });
}

//

// * Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  highscore = 0;
  startBtn.setAttribute("class", "hide");
  // ? start timer function
  startGame();
});

// * listen for a click for the 4 answer buttons & check if the answer was correct or not
ansButtonDiv.addEventListener("click", function (event) {
  const selectedAnswer = event.target.value;
  const answerForQuestion = quizQandA[questionCounter].answer;
  console.log(selectedAnswer);

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
  scoredboardList.innerHTML = ""; // This allows the list to update if something got deleted

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
