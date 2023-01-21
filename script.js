//variables
import questions from "./data.js";
const container = document.getElementById('container');
const startButton = document.getElementById('start');
const viewScoreBtn = document.querySelector('#view-highscore');
const timeDisplay = document.querySelector('#time-display');
startButton.addEventListener('click', startTheQuiz);

let timeLeft = 60;
let currentQuestion = 0;
let score = 0;



//execution
timeDisplay.setAttribute('style', 'opacity: 0');

//functions

function startTheQuiz() {
  timeLeft = 60;
  viewScoreBtn.setAttribute('style', 'display: none');
  timeDisplay.setAttribute('style', 'display: default');
  timeDisplay.innerText = `Time left: ${timeLeft}`;
  let timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.innerText = `Time left: ${timeLeft}`;
    } else {
      timeDisplay.innerText = `Test finished`;
      clearInterval(timeInterval);
      loadFinalPage();
    }
  }, 1000);

  renderQuestion();
}


function renderQuestion() {

  container.innerHTML = '';
  const questionHeader = document.createElement('h2');
  questionHeader.innerText = `Question No.: ${currentQuestion + 1}`;
  container.appendChild(questionHeader);
  const questionBody = document.createElement('p');
  questionBody.innerText = questions[currentQuestion].question;
  container.appendChild(questionBody);

  const answersArr = creatArray(questions, currentQuestion);
  answersArr.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.setAttribute('style', 'display: block');
    button.setAttribute('class', 'answerButtons');
    container.appendChild(button);
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if(currentQuestion === questions.length - 1) {
        const gotFinalOneCorrect = e.target.innerText === questions[currentQuestion].correct;
        if(gotFinalOneCorrect) {
          score++;
          loadFinalPage();
          timeLeft = 0;
        } 
        return;
      }

      if (button.innerText === questions[currentQuestion].correct) {
        currentQuestion++;
        score++;
        renderQuestion();
      } else {
        timeLeft -= 5;
      }
  })
  });

}


function loadFinalPage() {
  container.innerHTML = '';
  viewScoreBtn.setAttribute('style', 'display: default');
  const finalPageTitle = document.createElement('h2');
  finalPageTitle.innerText = `Quiz over, your score is ${score}`;
  container.appendChild(finalPageTitle);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'input your name here');
  container.appendChild(nameInput);


  const finalButton1 = document.createElement('button');
  finalButton1.setAttribute('class', 'answerButtons');
  finalButton1.innerText = 'Save result';
  container.appendChild(finalButton1);
  finalButton1.addEventListener('click', () => {
    if (nameInput.value === '') return;
    const scoresArray = getLocalStorage();
    const newRecord = {initials: nameInput.value, score: score}
    scoresArray.push(newRecord);
    localStorage.setItem('scoredata', JSON.stringify(scoresArray));
  })


  const finalButton2 = document.createElement('button');
  finalButton2.setAttribute('class', 'answerButtons');
  finalButton2.innerText = 'Take test again';
  finalButton2.setAttribute('style', 'display: block');
  container.appendChild(finalButton2);
  finalButton2.addEventListener('click', () => {
    score = 0;
    currentQuestion = 0;
    startTheQuiz();
  })
}


function creatArray(objArr, currentQuestion) {
  const arr = [];
  if(objArr[currentQuestion].a) arr.push(objArr[currentQuestion].a);
  if(objArr[currentQuestion].b) arr.push(objArr[currentQuestion].b);
  if(objArr[currentQuestion].c) arr.push(objArr[currentQuestion].c);
  if(objArr[currentQuestion].d) arr.push(objArr[currentQuestion].d);
  return arr;
}

function getLocalStorage() {
  return localStorage.getItem('scoredata') === null ? [] : JSON.parse(localStorage.getItem('scoredata'));
}


