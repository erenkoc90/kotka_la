const game = document.querySelector(".game");
let eightArray = [];
let sixteenArray = [];
let arrayClickedBoxes = [];
let score = 0;

let isTimeUp = false;
let isGameWon = false;
const scoreText = document.getElementById("score-value");
const scoreH3 = document.querySelector("#score");
const timeText = document.getElementById("time-value");
const winScreen = document.querySelector(".win-screen");
const loseScreen = document.querySelector(".lose-screen");
const scoreTimeScreen = document.querySelector("#st-container");
const replayScreen = document.querySelector(".replay-screen");
replayScreen.addEventListener("click", () => {
  location.reload();
});
// Class Box for box constructor
class Box {
  flip() {
    this.isCardFlipped = !this.isCardFlipped;
    if (this.isCardFlipped == false) {
      this.img.style.display = "none";
      this.backSide.style.display = "block";
    }
    if (this.isCardFlipped == true) {
      this.img.style.display = "block";
      this.backSide.style.display = "none";
    }
  }

  compare() {
    if (arrayClickedBoxes.length == 2) {
      if (arrayClickedBoxes[0].imgSrc == arrayClickedBoxes[1].imgSrc) {
        this.isCardPaired = true;
      } else {
        this.isCardPaired = false;
      }
    } else {
      return;
    }
  }
  constructor(imgSrc) {
    this.imgSrc = imgSrc;
    this.isCardFlipped = false;
    this.isCardPaired = false;
    this.element = document.createElement("div");
    this.backSide = document.createElement("div");
    this.img = document.createElement("img");
    this.element.classList.add("box");
    this.backSide.classList.add("box-closed");
    this.img.src = imgSrc;

    this.element.appendChild(this.backSide);
    this.element.appendChild(this.img);
    if (this.isCardFlipped == false) {
      this.img.style.display = "none";
      this.backSide.style.display = "block";
    }

    this.element.addEventListener("click", () => {
      scoreText.style.animation = "";
      if (this.isCardPaired == true) {
        return;
      }
      if (isTimeUp == true) {
        return;
      }
      if (arrayClickedBoxes.length == 2) {
        return;
      }
      if (arrayClickedBoxes.length < 2) {
        this.flip();
        if (this.isCardFlipped == true) {
          arrayClickedBoxes.push(this);
        }
        if (this.isCardFlipped == false) {
          arrayClickedBoxes.splice(arrayClickedBoxes.indexOf(this), 1);
        }
      }
      if (arrayClickedBoxes.length == 2) {
        this.compare();
        if (this.isCardPaired == true) {
          scoreUpper();
          arrayClickedBoxes[0].element.classList.add("box-paired");
          arrayClickedBoxes[1].element.classList.add("box-paired");
          arrayClickedBoxes[0].element.style.animation =
            "openUp 1.5s ease-in-out forwards";
          arrayClickedBoxes[1].element.style.animation =
            "openUp 1.5s ease-in-out forwards";
          arrayClickedBoxes[0].element.classList.remove("box");
          arrayClickedBoxes[1].element.classList.remove("box");
          arrayClickedBoxes[0].isCardPaired = true;
          arrayClickedBoxes[1].isCardPaired = true;
          arrayClickedBoxes = [];
          //checkWin();
          return;
        } else {
          console.log("TRY AGAIN!");
          arrayClickedBoxes[0].element.style.animation =
            "paired 0.7s ease-in-out forwards";
          arrayClickedBoxes[1].element.style.animation =
            "paired 0.7s ease-in-out forwards";
          arrayClickedBoxes[0].element.addEventListener(
            "animationend",
            () => {
              console.log("ANIMATION END TETIKLENDI");
              arrayClickedBoxes[0].element.style.animation = "";
              arrayClickedBoxes[1].element.style.animation = "";
              arrayClickedBoxes[0].flip();
              arrayClickedBoxes[1].flip();
              arrayClickedBoxes = [];
            },
            { once: true }
          );
        }
      }
    });

    game.appendChild(this.element);
  }
}

// Arrays
let arraySrc = [
  "imgGame/kotka1.png",
  "imgGame/kotka2.png",
  "imgGame/kotka4.png",
  "imgGame/kotka5.png",
  "imgGame/tigergif1.gif",
  "imgGame/tigerWalking.gif",
  "imgGame/tigerTalking1.gif",
  "imgGame/tigergif2.gif",
  "imgGame/vatsan1_1.png",
  "imgGame/vatsan6.gif",
  "imgGame/vatsan3_1.png",
  "imgGame/vatsan1_4.png",
  "imgGame/vatsan5_1.png",
  "imgGame/vatsan2_1.png",
  "imgGame/tiger4.png",
  "imgGame/tiger3.png",
  "imgGame/tiger2.png",
  "imgGame/tiger1.png",
  "imgGame/kotkagif.gif",
  "imgGame/kotkaRotation.gif",
  "imgGame/kotkaIdea.gif",
  "imgGame/kotkagif1.gif",
  "imgGame/vatsangif1.gif",
  "imgGame/vatsangif2.gif",
];

// FUNCTIONS

function randomIndexNumber(arrayName) {
  return Math.floor(Math.random() * arrayName.length);
}

function randomEight() {
  for (let i = 1; i <= 8; i++) {
    let a = arraySrc.splice(randomIndexNumber(arraySrc), 1);
    eightArray.push(a[0]);
  }
}

function shuffle(arrayName) {
  for (let i = arrayName.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = arrayName[i];
    arrayName[i] = arrayName[j];
    arrayName[j] = k;
  }
}

function loadBoard() {
  startTimer(60);
  for (let i = 0; i < sixteenArray.length; i++) {
    setTimeout(() => {
      new Box(sixteenArray[i]);
    }, i * 25);
  }
}

function checkWin() {
  if (parseInt(scoreText.innerText) == 80) {
    isGameWon = true;
    game.style.display = "none";
    replayScreen.style.display = "flex";
    winScreen.style.display = "block";
    scoreTimeScreen.style.display = "none";
    isTimeUp = false;
  }
}

function startTimer(time) {
  let counter = setInterval(timer, 1000);
  function timer() {
    if (isGameWon == true) {
      return;
    }
    timeText.innerText = time;
    time--;
    timeText.innerText = time;
    if (time == 0) {
      isTimeUp = true;
      game.style.display = "none";
      replayScreen.style.display = "flex";
      loseScreen.style.display = "block";
      scoreTimeScreen.style.display = "none";
      clearInterval(counter);
      return;
    }
  }
}

function scoreUpper() {
  scoreH3.style.animation = "";
  let counter = setInterval(e, 30);
  let currentScore = parseInt(scoreText.innerText);
  let goalScore = currentScore + 10;
  function e() {
    currentScore += 1;
    scoreText.innerText = currentScore;

    if (currentScore == goalScore) {
      clearInterval(counter);
      scoreText.innerText = currentScore;
      scoreH3.style.animation = "scoreUp 0.5s ease-in-out forwards";
      score = currentScore;
      checkWin();
      return;
    }
  }
}

randomEight();
sixteenArray = eightArray.concat(eightArray);

shuffle(sixteenArray);

loadBoard();
