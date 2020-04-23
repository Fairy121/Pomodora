// work seconds
let minutes = 25;
let seconds = 59;

// break seconds
let breakTime = 5;
let breakSeconds = 59;

let session = 1;
let breakSession = 1;
let workSession = 1;
let isPaused = false;
let workPlaying = true;
let type = "Work";

let answer = document.querySelector(".answer");
let btn = document.querySelectorAll(".btn");
let playBtn = document.querySelector(".playBtn");
let pauseBtn = document.querySelector(".pauseBtn");
let resetBtn = document.querySelector(".resetBtn");
let container = document.querySelector(".container");

let sessionType = document.querySelector(".sessionType");

let workCounter;
let breakCounter;
// Check if the work timer is done and if it is  , go to break timer

function timerStyling(bg, btnCol, btnCol2, answerCol, type) {
  this.bg = bg;

  this.btnCol = btnCol;
  this.btnCol2 = btnCol2;
  this.answerCol = answerCol;
  this.type = type;

  this.styleSession = function() {
    let stylingParts = [container, pauseBtn, playBtn, answer, sessionType];
    let styles = [
      this.bg,
      this.btnCol,
      this.btnCol2,
      this.answerCol,
      this.type
    ];
    for (var i = 0; i < stylingParts.length; i++) {
      stylingParts[i].style.cssText = styles[i];
    }
  };
}
// #1ea69f

let workStyling = new timerStyling(
  "background-color:#181036;",
  "color:#5f4fa8;",
  "color:#5f4fa8;",
  "color:#9367a1;",
  "color:#9367a1;"
);
let breakStyling = new timerStyling(
  "background-color:#5cdbd1 ",
  "color:#53bdb4",
  "color:#53bdb4",
  "color:#1ea69f",
  "color:#5bb0ac"
);
function checkPlay() {
  if (workPlaying) {
    workCounter = setInterval(() => {
      Work(workCounter);
    }, 1000);
  } else {
    breakCounter = setInterval(() => {
      Break(breakCounter);
    }, 1000);
  }
}

checkPlay();

playBtn.addEventListener("click", () => {
  checkPlay();
});
pauseBtn.addEventListener("click", () => {
  workPlaying ? clearInterval(workCounter) : clearInterval(breakCounter);
});

function Work(x) {
  sessionType.innerHTML = "Work " + "0" + workSession;

  workStyling.styleSession();

  if (seconds > 0) {
    seconds--;
  }
  // this is when we go down a minute
  if (seconds == 0 && minutes != 0) {
    minutes--;
    seconds = 5;
  }

  answer.innerHTML = leadingZeros(minutes) + ":" + leadingZeros(seconds);
  // this is when we switch to break and then back
  if (minutes == 0 && seconds == 0) {
    answer.innerHTML = leadingZeros(minutes) + ":" + leadingZeros(seconds);
    clearInterval(x);
    minutes = 1;
    seconds = 5;
    workSession++;
    // since I wanted it to end on work session I
    // made it last for 4 sessions here

    if (workSession < 5) {
      workPlaying = false;
      resetBtn.style.display = "none";
      checkPlay();
    } else {
      resetBtn.style.display = "block";
      resetBtn.addEventListener("click", () => {
        workPlaying = true;
        workSession = 1;
        breakSession = 1;
        checkPlay();
      });
    }
  }
}

function Break(x) {
  sessionType.innerHTML = "Break " + "0" + breakSession;
  breakStyling.styleSession();

  if (breakSeconds > 0) {
    breakSeconds--;
  }
  if (breakSeconds == 0 && breakTime != 0) {
    breakTime--;
    breakSeconds = 5;
  }
  answer.innerHTML = leadingZeros(breakTime) + ":" + leadingZeros(breakSeconds);

  if (breakTime == 0 && breakSeconds == 0) {
    answer.innerHTML =
      leadingZeros(breakTime) + ":" + leadingZeros(breakSeconds);
    breakTime = 1;
    breakSeconds = 5;
    breakSession++;
    clearInterval(x);
    workPlaying = true;

    checkPlay();
  }
}
// this function adds a zero
resetBtn.addEventListener("click", () => {
  console.log(workPlaying);
});
function leadingZeros(y) {
  if (y < 10) {
    y = "0" + y;
  }
  return y;
}
