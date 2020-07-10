// ! Holding all the vars and DOMs
const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector(".show");
const timerEl = document.querySelector("#countdown");
const headerTag = document.querySelector("#startHead");

let scoreboard = [{ name: "Bob", highscore: 0 }];

const quizQandA = {
  question1: {
    question: "Whats the '+' operator?",
    correctAnswerInd: 2,
  },
  question2: {
    question: "what is my name?",
    correctAnswerInd: 3,
  },
  question3: {
    question: "what symbol do we use for jQuery?",
    correctAnswerInd: 4,
  },
  question4: {
    question: "What year was javascript made?",
    correctAnswerInd: 1,
  },
};

let score = 0;

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
function updateDisplay(questions) {
  headerTag.textContent = questions.question1.question;
}

// * The start and end game functions
function startGame() {
  timeStarter(event);
  // ? display the question and mutliple choice buttons function
  updateDisplay(quizQandA);
}

function endGame() {
  headerTag.textContent = "Game Over";
}

// ! Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  startBtn.setAttribute("class", "hide");
  // ? start timer function
  startGame();
});

// ? checking answer, going to next question, eventlistener for answer, and a function to update the display
