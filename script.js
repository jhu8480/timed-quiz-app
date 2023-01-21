//variables
import questions from "./data.js";
const container = document.getElementById('container');
const startButton = document.getElementById('start');
const viewScoreBtn = document.querySelector('#view-highscore');

const timeDisplay = document.querySelector('#time-display');
startButton.addEventListener('click', startTheQuiz);

let timeLeft = 60;
let currentQuestion = 0;




//execution
timeDisplay.setAttribute('style', 'opacity: 0');

//functions

function startTheQuiz() {
  timeDisplay.setAttribute('style', 'display: default');
  timeDisplay.innerText = `Time left: 60`;
  let timeInterval = setInterval(() => {
    if (timeLeft > -1) {
      timeLeft--;
      timeDisplay.innerText = `Time left: ${timeLeft}`;
    } else {
      clearInterval(timeInterval);
    }
  }, 1000);

  renderQuestion();
}

function renderQuestion() {
  container.innerHTML = 
    `<h2>Question ${currentQuestion + 1}</h2>
    <p>${questions[currentQuestion].question}</p>
    <ul>
      <li>
      <input type="radio" id="a" name="choice">
      <label for="a">${questions[currentQuestion].a}<label>
      </li>
      <li>
      <input type="radio" id="b" name="choice">
      <label for="a">${questions[currentQuestion].b}<label>
      </li>
      <li>
      <input type="radio" id="c" name="choice">
      <label for="a">${questions[currentQuestion].c}<label>
      </li>
      <li>
      <input type="radio" id="d" name="choice">
      <label for="a">${questions[currentQuestion].d}<label>
      </li>
    </ul>
    <button id="submit-question">Submit</button>`;
    const submitButton = document.querySelector('#submit-question');
    submitButton.addEventListener('click', nextQuestion);
}

function nextQuestion() {
  if (currentQuestion == questions.length - 1) return;

  currentQuestion++;
  renderQuestion();
}