//variables
import questions from "./data.js";
const container = document.getElementById('container');
const viewScoreBtn = document.querySelector('#view-highscore');
const timeDisplay = document.querySelector('#time-display');
viewScoreBtn.addEventListener('click', loadScoresPage);
const sign = document.getElementById('correct-sign');

let timeLeft = 60;
let currentQuestion = 0;
let score = 0;



//execution
timeDisplay.setAttribute('style', 'display: none');
sign.setAttribute('style', 'opacity: 0');
loadFirstPage();

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
          showCorrectSign(sign);
          score++;
          loadFinalPage();
          timeLeft = 0;
        } else {
          timeLeft -= 5;
        }
        return;
      }

      if (button.innerText === questions[currentQuestion].correct) {
        showCorrectSign(sign);
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
  nameInput.setAttribute('placeholder', 'input your initials here');
  container.appendChild(nameInput);


  const finalButton1 = document.createElement('button');
  finalButton1.setAttribute('class', 'answerButtons');
  finalButton1.innerText = 'Save result';
  container.appendChild(finalButton1);
  finalButton1.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameInput.value === '') return;
    const scoresArray = getLocalStorage();
    const newRecord = {initials: nameInput.value, score: score}
    scoresArray.push(newRecord);
    localStorage.setItem('scoredata', JSON.stringify(scoresArray))
    nameInput.value = '';
    currentQuestion = 0;
    score = 0;
    loadScoresPage();
  })


  const finalButton2 = document.createElement('button');
  finalButton2.setAttribute('class', 'answerButtons');
  finalButton2.innerText = 'Take test again';
  finalButton2.setAttribute('style', 'display: block');
  container.appendChild(finalButton2);
  finalButton2.addEventListener('click', (e) => {
    e.preventDefault();
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

function loadScoresPage() {
  container.innerHTML = '';
  const scorePageTitle = document.createElement('h2');
  scorePageTitle.innerText = 'Score Rank:'
  container.appendChild(scorePageTitle);

  const rankContainer = document.createElement('div');
  rankContainer.setAttribute('style', 'height: 50%; width: 70%; overflow: scroll; border: 1.5px solid black;');
  container.appendChild(rankContainer);

  const scoresArr = getLocalStorage();
  const scoresArrhtml = scoresArr.map((record) => {
    return `<div>Person: ${record.initials} Score: ${record.score}</div>`
  }).join('');
  rankContainer.innerHTML = scoresArrhtml;

  const goBackButton = document.createElement('button');
  goBackButton.innerText = 'Go back';
  goBackButton.setAttribute('class', 'answerButtons');
  goBackButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadFirstPage();
  });
  container.appendChild(goBackButton);
}

function loadFirstPage() {
  container.innerHTML = '';
  const testTitle = document.createElement('h2');
  testTitle.innerText = 'JavaScript Quiz';
  container.appendChild(testTitle);

  const tip = document.createElement('p');
  tip.innerText = 'Click the button below to start the timed quiz';
  container.appendChild(tip);

  const startButton = document.createElement('button');
  startButton.innerText = 'Start the quiz';
  startButton.setAttribute('class', 'answerButtons');
  startButton.addEventListener('click', startTheQuiz);
  container.appendChild(startButton);
}

function showCorrectSign(sign) {
  sign.setAttribute('style', 'opacity: 1');
  setTimeout(() => {
    sign.setAttribute('style', 'opacity: 0');
  }, 500);
}


