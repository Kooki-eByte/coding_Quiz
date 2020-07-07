// ! Holding all the vars and DOMs
const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector(".show");
const timerEl = document.querySelector("#countdown");

let scoreboard = [{ name: "Bob", highscore: 0 }];

const quizQandA = {
  questions: ["Whats the '+' operator"],
  answers: ["1", "2", "3", "4"],
  correctAnswerInd: 2,
};

let score = 0;

// ! function to start the timer and have it display on screen.. Count down from 60 seconds
function timeStarter(event) {
  event.preventDefault();
  let timeLeft = 60;
  timerEl.textContent = "Time: " + timeLeft;

  let timeInterval = setInterval(() => {
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = "0";
      console.log("Time is done");
      clearInterval(timeInterval);
    }
  }, 1000);
}

// ! updateDisplay to show the game
function updateDisplay(questionsObj) {
  console.log(questionsObj.questions[0]);
}

function startGame() {
  timeStarter(event);
  // ? display the question and mutliple choice buttons function
  updateDisplay(quizQandA);
}

// ! Have a event listener for the start game button
startBtn.addEventListener("click", () => {
  startScreen.setAttribute("class", "hide");
  // ? start timer function
  startGame();
});

// ? checking answer, going to next question, eventlistener for answer, and a function to update the display
