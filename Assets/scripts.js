// ! Holding all the vars and DOMs
const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector(".show");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");
const mutlipleChoiceAnswers = document.querySelector("#startPara");
const ansButtonDiv = document.querySelector(".answerbtns");
const answerBtnArr = document.querySelectorAll("#ansBtnId");
const paraDiv = document.querySelector(".paraDiv");

let score = 0;
let scoreboard = [{ name: "Bob", highscore: 0 }];

const quizQandA = [
  {
    question: "Question 1?",
    choices: "A. ans1\nB. ans2\nC. ans3\nD. ans4",
    answer: "A",
  },
  {
    question: "Question 2?",
    choices: "A. ans1\nB. ans2\nC. ans3\nD. ans4",
    answer: "B",
  },
  {
    question: "Question 3?",
    choices: "A. ans1\n\n\nB. ans2\nC. ans3\nD. ans4",
    answer: "C",
  },
  {
    question: "Question 4?",
    choices: "A. ans1\n\n\nB. ans2\nC. ans3\nD. ans4",
    answer: "D",
  },
];

// ! function to start the timer and have it display on screen.. Count down from 60 seconds
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
  for (let i = 0; i < arr.length; i++) {
    // Put question on the header
    headerTag.textContent = arr[i].question;
    mutlipleChoiceAnswers.textContent = arr[i].choices;
    // Run function to return the value of the answer given -- This will also pop a correct or not in the DOM
    let response = checkAnswer();
  }
}

function checkAnswer() {}

// * The start and end game functions
function startGame() {
  timeStarter(event);
  ansButtonDiv.classList.replace("hide", "show");
  updateDisplay(quizQandA);
  // ? display the question and mutliple choice buttons function
}

function endGame() {
  headerTag.textContent = "Game Over";
}

// Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  startBtn.setAttribute("class", "hide");
  // ? start timer function
  startGame();
});

ansButtonDiv.addEventListener("click", (event) => {
  // Get the value from the buttons
  let value = event.target.value;
  console.log(value);
});
