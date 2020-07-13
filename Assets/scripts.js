// ! Holding all the vars and DOMs
const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector(".show");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");
const mutlipleChoiceAnswers = document.querySelector("#startPara");
const ansButtonDiv = document.querySelector(".answerbtns");
const answerBtnArr = document.querySelectorAll("#ansBtnId");
const paraDiv = document.querySelector(".paraDiv");
const isCorrect = document.querySelector("#right-or-not");

let score = 0;
let scoreboard = [{ name: "Bob", highscore: 0 }];
let questionCounter = 0;

const quizQandA = [
  {
    question: "what does RGB stand for?",
    choices:
      "(A)Red, Green, Blue (B)Red, Green, Black (C)Rose, Gold, Brown (D)I dont even know lol",
    answer: "A",
  },
  {
    question: "Question 2?",
    choices: "A. ans1   B. ans2     C. ans3     D. ans4",
    answer: "B",
  },
  {
    question: "Question 3?",
    choices: "A. ans1   B. ans2     C. ans3     D. ans4",
    answer: "C",
  },
  {
    question: "Question 4?",
    choices: "A. ans1   B. ans2     C. ans3     D. ans4",
    answer: "D",
  },
];

// function to start the timer and have it display on screen.. Count down from 60 seconds
function timeStarter(event) {
  event.preventDefault();
  let timeLeft = 60;
  timerEl.textContent = timeLeft;

  let timeInterval = setInterval(() => {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = "0";
      console.log("Time is done");
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}

// * updateDisplay to show the game
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
  mutlipleChoiceAnswers.textContent = "Nice Job! you scored : " + score;
  ansButtonDiv.classList.replace("show", "hide");
  isCorrect.textContent = "";
}

// Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  startBtn.setAttribute("class", "hide");
  // ? start timer function
  startGame();
});

// listen for a click for the 4 answer buttons & check if the answer was correct or not
ansButtonDiv.addEventListener("click", function (event) {
  const selectedAnswer = event.target.value;
  const answerForQuestion = quizQandA[questionCounter].answer;
  console.log(selectedAnswer);

  if (selectedAnswer === answerForQuestion) {
    score += 5;
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
