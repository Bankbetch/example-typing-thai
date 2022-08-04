// data-name="Rectangle 70"

const dataKeywordLs1 = "ษ๐ฟหกด่าสว ฟหกด่าสว ฟหกด่าสว ฟหกด่าสว หฟหหห";
let count = 0;
let errors = 0;
let timer = 0;
let wpm = 0;
let started = false;
let intervalTimer;
let maxWpm = 0;

const start = () => {
  intervalTimer = setInterval(() => {
    timer++;
    wpm = Math.round(count / (timer / 60));
    if (wpm > maxWpm) maxWpm = wpm;
    getWpm();
    getMaxWpm();
    getAvgWpm();
  }, 1000);
};

const stop = () => {
  clearInterval(intervalTimer);
  started = false;
};

const getWpm = () => {
  document.getElementsByClassName("Speed--26-36---0-46--span2")[0].innerHTML =
    wpm;
};
const getMaxWpm = () => {
  document.getElementsByClassName(
    "Best-typing-speed--1-span2"
  )[0].innerHTML = `${maxWpm}wpm`;
};

const getAvgWpm = () => {
  document.getElementsByClassName(
    "Average-typing-speed-span2"
  )[0].innerHTML = `${wpm}wpm`;
};

const setEvent = (element, key) => {
  const div = document.createElement("div");
  if (key === " ") {
    element.classList.add("keypress-event-spacebar");
  } else {
    element.classList.add("keypress-event-active");
    div.setAttribute("id", `keypress-event`);
    element.appendChild(div);
  }
  const onKeywordKeypress = document.getElementById(`k-${count}`);
  if (onKeywordKeypress) {
    if (key === dataKeywordLs1[count]) {
      onKeywordKeypress.style.color = "rgba(0, 203, 20, 1)";
      if (errors > 0) errors--;
    } else {
      errors++;
      onKeywordKeypress.style.color = "rgba(255, 131, 16, 1)";
    }
  }
  getAccuracy();
  setTimeout(() => {
    // div.remove();
    element.classList.remove("keypress-event-active");
    if (key === " ") element.classList.remove("keypress-event-spacebar");
  }, 200);
};

const getAccuracy = () => {
  const element = document.getElementsByClassName("Accuracy--26-36---0--span2");
  element[0].innerHTML =
    Number(
      ((dataKeywordLs1.length - errors) / dataKeywordLs1.length) * 100
    ).toFixed(0) + "%";
};

const setWordList = () => {
  const keywordLs1 = document.getElementById("keyword-ls1");
  for (const index in dataKeywordLs1) {
    const span = document.createElement("span");
    span.setAttribute("id", `k-${index}`);
    span.innerHTML = dataKeywordLs1[index];
    keywordLs1.appendChild(span);
  }
};

addEventListener("keypress", (event) => {
  const key = event.key;
  let element = document.querySelectorAll(`[data-name="${key}"]`);
  console.log(element);
  if (!started) {
    start();
    started = true;
  }
  if (element.length === 1) {
    setEvent(element[0], key);
    count++;
  } else if (element.length === 2) {
    setEvent(element[1], key);
    count++;
  }
});

onload = () => {
  setWordList();
  getAccuracy();
  getWpm();
  getMaxWpm();
  getAvgWpm();
};
