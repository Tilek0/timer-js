const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let blockRestartTime = false;

const createTimerAnimator = () => {
  return (timer) => {
    let timeOut = setInterval(function () {
      blockRestartTime = true;

      const seconds = Math.trunc(timer % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const minutes = Math.trunc((timer / 60) % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const hour = Math.trunc((timer / 60 / 60) % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      if (timer <= 0) {
        clearInterval(timeOut);
        blockRestartTime = false;
        timerEl.innerHTML = "00:00:00";
        alert("Время закончилось");
      } else {
        let strTimer = `${hour}:${minutes}:${seconds} - ${getHourNameFromSeconds(
          timer
        )}, ${minutes} минут, ${seconds} секунд`;
        timerEl.innerHTML = strTimer;
      }
      --timer;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  let inputValue = inputEl.value;
  inputValue = inputValue.replace(/\D/g, "");
  inputEl.value = inputValue;
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  if (!blockRestartTime) animateTimer(seconds);

  inputEl.value = "";
});

function getHourNameFromSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const normalizedHours = ((hours % 25) + 25) % 25;

  const hourNames = [
    "ноль часов",
    "один час",
    "два часа",
    "три часа",
    "четыре часа",
    "пять часов",
    "шесть часов",
    "семь часов",
    "восемь часов",
    "девять часов",
    "десять часов",
    "одиннадцать часов",
    "полдень",
    "тринадцать часов",
    "четырнадцать час",
    "пятнадцать часов",
    "шеснадцать часов",
    "семнадцать часов",
    "восемнадцать часов",
    "девятнадцать часов",
    "двадцать часов",
    "двадцать один часов",
    "двадцать два часа",
    "двадцать три часа",
    "один день",
  ];

  return hourNames[normalizedHours];
}
