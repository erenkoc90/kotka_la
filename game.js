const game = document.querySelector(".game");
let eightArray = [];
let sixteenArray = [];
let arrayClickedBoxes = [];
let score = 0;
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time-value");
const winScreen = document.querySelector(".win-screen");

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
    // if (this.isCardFlipped == true) {
    //   this.img.style.display = "block";
    //   this.backSide.style.display = "none";
    // }
    this.element.addEventListener("click", () => {
      if (this.isCardPaired == true) {
        return;
      }
      if (arrayClickedBoxes.length == 2) {
        return;
      }
      if (arrayClickedBoxes.length < 2) {
        this.flip();
        if (this.isCardFlipped == true) {
          arrayClickedBoxes.push(this);
          console.log(arrayClickedBoxes);
        }
        if (this.isCardFlipped == false) {
          arrayClickedBoxes.splice(arrayClickedBoxes.indexOf(this), 1);
          console.log(arrayClickedBoxes);
        }
      }
      if (arrayClickedBoxes.length == 2) {
        this.compare();
        if (this.isCardPaired == true) {
          console.log("PAIRED");
          score++;
          scoreText.innerText = score;
          console.log("SCORE: " + score);
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
          checkWin();
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
  "imgGame/vatsan1.png",
  "imgGame/vatsan6.gif",
  "imgGame/vatsan3.png",
  "imgGame/vatsan4.png",
  "imgGame/vatsan5.png",
  "imgGame/tiger4.png",
  "imgGame/tiger3.png",
  "imgGame/tiger2.png",
  "imgGame/tiger1.png",
  "imgGame/kotkagif.gif",
  "imgGame/kotkaRotation.gif",
  "imgGame/vatsanRotation.gif",
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
  for (let i = 0; i < sixteenArray.length; i++) {
    setTimeout(() => {
      new Box(sixteenArray[i]);
    }, i * 25);
  }
}

function checkWin() {
  if (score == 8) {
    winScreen.style.display = "block";
  }
}

function startTimer(time) {
  let counter = setInterval(timer, 1000);
  function timer() {
    timeText.innerText = time;
    time--;
    timeText.innerText = time;
    if (time == 0) {
      clearInterval(counter);
      return;
    }
  }
}

function scoreCounter() {}

randomEight();
sixteenArray = eightArray.concat(eightArray);
//console.log([...sixteenArray]);

shuffle(sixteenArray);
//console.log([...sixteenArray]);
//console.log(sixteenArray[0]);

loadBoard();
startTimer(100);
