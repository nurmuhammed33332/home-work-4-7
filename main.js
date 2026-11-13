// const now = new Date();
// console.log(now);
// console.log(pad(now.getDate()));
// console.log(pad(now.getMonth() + 1)); 
// console.log(pad(now.getFullYear()));
// console.log(pad(now.getHours()));
// console.log(pad(now.getMinutes()));
// console.log(pad(now.getSeconds()));
// function pad(n) {
//     return String(n).padStart(2, '0');
// }
// console.log(pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()));
// console.log(now.toLocaleDateString(ru-RU));


function pad(n) {
  return String(n).padStart(2, '0');
}

const clock = document.getElementById("clock");
const dateEl = document.getElementById("date");
const greeting = document.getElementById("greeting");

const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];


const updateClock = () => {
    const now = new Date();
    
    clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    dateEl.textContent = `${days[now.getDay()]}, ${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const hour = now.getHours();
    greeting.textContent = hour < 12 ? "Доброе утро!" : hour < 18 ? "Хорошего дня!" : "Добрый вечер!";
};
updateClock();
setInterval(updateClock, 1000);

const newYearDays = document.getElementById("newYearDays");
function updateNewYearCountdown() {
  const now = new Date();
  const nextNewYear = new Date(now.getFullYear() + 1, 0, 1);
  newYearDays.textContent = Math.ceil((nextNewYear - now) / (1000 * 60 * 60 * 24));
}
updateNewYearCountdown();
setInterval(updateNewYearCountdown, 60 * 60 * 1000);

const timerInput = document.querySelector("#timerInput");
const timerStart = document.querySelector("#timerStart");
const timerReset = document.querySelector("#timerReset");
const timerView = document.querySelector("#timerView");
const timerMsg = document.querySelector("#timerMsg");

let timerLeft = 0; // сколько секунд осталось
let timerId = null;

function showTimer() {
  const minutes = Math.floor(timerLeft / 60);
  const seconds = timerLeft % 60;
  timerView.textContent = pad(minutes) + ":" + pad(seconds);
}

timerStart.addEventListener("click", function () {
  clearInterval(timerId); // если таймер уже шёл, останавливаем старый

  timerLeft = Number(timerInput.value);

  if (isNaN(timerLeft) || timerLeft <= 0) {
    timerMsg.textContent = "Введи число больше нуля";
    return;
  }

  timerMsg.textContent = "";
  showTimer();

  timerId = setInterval(function () {
    timerLeft--;
    showTimer();

    if (timerLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      timerMsg.textContent = "⏰ Время вышло!";
    }
  }, 1000);
});

timerReset.addEventListener("click", function () {
  clearInterval(timerId);
  timerId = null;
  timerLeft = Math.max(0, Number(timerInput.value) || 0);
  showTimer();
  timerMsg.textContent = "";
});

// Секундомер
const stopwatchView = document.getElementById("stopwatch");
const lapsList = document.getElementById("laps");
let stopwatchStartedAt = 0;
let stopwatchElapsed = 0;
let stopwatchId = null;

function showStopwatch() {
  const elapsed = stopwatchElapsed + (stopwatchId ? Date.now() - stopwatchStartedAt : 0);
  const tenths = Math.floor(elapsed / 100);
  const minutes = Math.floor(tenths / 600);
  const seconds = Math.floor((tenths % 600) / 10);
  stopwatchView.textContent = `${pad(minutes)}:${pad(seconds)}.${tenths % 10}`;
}

document.getElementById("swStart").addEventListener("click", function () {
  if (stopwatchId) return;
  stopwatchStartedAt = Date.now();
  stopwatchId = setInterval(showStopwatch, 50);
});

document.getElementById("swStop").addEventListener("click", function () {
  if (!stopwatchId) return;
  stopwatchElapsed += Date.now() - stopwatchStartedAt;
  clearInterval(stopwatchId);
  stopwatchId = null;
  showStopwatch();
});

document.getElementById("swReset").addEventListener("click", function () {
  clearInterval(stopwatchId);
  stopwatchId = null;
  stopwatchElapsed = 0;
  stopwatchView.textContent = "00:00.0";
  lapsList.replaceChildren();
});

document.getElementById("swLap").addEventListener("click", function () {
  const lap = document.createElement("li");
  lap.textContent = stopwatchView.textContent;
  lapsList.append(lap);
});

// Будильник
const alarmInput = document.getElementById("alarmInput");
const alarmMsg = document.getElementById("alarmMsg");
let alarmTime = "";
let alarmRangFor = "";

document.getElementById("alarmSet").addEventListener("click", function () {
  alarmTime = alarmInput.value;
  alarmRangFor = "";
  alarmMsg.textContent = alarmTime ? `Будильник установлен на ${alarmTime}` : "Выбери время будильника";
});

setInterval(function () {
  const now = new Date();
  const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const todayAndTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${currentTime}`;
  if (alarmTime && currentTime === alarmTime && alarmRangFor !== todayAndTime) {
    alarmMsg.textContent = "⏰ Пора!";
    alarmRangFor = todayAndTime;
  }
}, 1000);

