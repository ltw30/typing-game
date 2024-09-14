//사용변수
const GAME_TIME = 10;
let score = 0;
let time = 9;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

function init() {
  getWords();
  wordInput.addEventListener("input", checkMatch);
}
//단어 불러오기
function getWords() {
  words = ["Hello", "Banana", "Apple", "Cherry"];
}
init();

wordInput.addEventListener("input", checkMatch);

//단어체크일치
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;

    const randomIndex = Math.floor(Math.random() * wordDisplay.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}

//게임실행
function run() {
  isPlaying = true;
  time = GAME_TIME;
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("게임중");
}
