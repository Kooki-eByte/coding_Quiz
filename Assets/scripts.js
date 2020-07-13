// All global Const vars
const startBtn = document.querySelector("#startBtn");
const answerBtnArr = document.querySelectorAll("#ansBtnId");
const isCorrect = document.querySelector("#right-or-not");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");
const mutlipleChoiceAnswers = document.querySelector("#startPara");
const displayForm = document.querySelector("#display-highscore-form");
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
let scoreboard = [{ name: "Bob", highscore: 0 }];
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
    scoreboard.push(localStorage.setItem("name", JSON.stringify(name)));
    scoreboard.push(
      localStorage.setItem("highscore", JSON.stringify(highscore))
    );
    console.log(scoreboard);
  });

  // * reset listener
}

//

// * Have a event listener for the start game button
startBtn.addEventListener("click", () => {
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

// * listen for a click in the submit button so that when it is pressed it will grab the value of the name in the form and set the item
