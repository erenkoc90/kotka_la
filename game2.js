const char1 = document.getElementById("char1");
const enemy = document.getElementById("enemy");

let allObstacles = [];
let score = 0;

let game2 = document.querySelector(".game2");
const gameContainer = document.querySelector(".game_container");
const gameOverScreen = document.querySelector("#game-over");
const gameOverText = document.querySelector("#textGameOver");
const gameWonScreen = document.querySelector("#game-won");
const gameWonText = document.querySelector("#textGameWon");
const playAgainText = document.querySelector("#textPlayAgain");
const playAgainTextWon = document.querySelector("#textPlayAgainWon");
const scoreText = document.getElementById("score-value");
const scoreH3 = document.querySelector("#score");
const timeText = document.getElementById("time-value");
const slidingBackground = document.querySelector(".sliding-background");
const tigerWalkNorth = document.getElementById("tigerWalkNorth");
const tigerWalkSouth = document.getElementById("tigerWalkSouth");
const tigerWon = document.getElementById("tigerWon");

let isGameOver = false;
let isGameWon = false;

function randomPosition() {
  return Math.random() * 580 + "px";
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

function checkWin() {
  if (parseInt(scoreText.innerText) >= 300) {
    isGameWon = true;
    tigerWon.style.display = "block";
    tigerWalkNorth.remove();
    tigerWalkSouth.remove();
    // gameWonScreen.style.display = "block";
    gameWonScreen.classList.remove("game-won-screen");
    gameWonScreen.classList.add("gameWonBG");
    enemy.classList.add("enemyLost");
    enemy.addEventListener(
      "animationend",
      () => {
        enemy.remove();
      },
      { once: true }
    );

    console.log("you won!");
  }
}

function startTimer(time) {
  let counter = setInterval(timer, 1000);
  function timer() {
    if (isGameOver == true) {
      return;
    }
    timeText.innerText = time;
    time--;
    timeText.innerText = time;
    if (time == 0) {
      isGameOver = true;
      char1.classList.add("enemyCatchChar");
      enemy.classList.add("enemyCatch");
      gameOverScreen.classList.remove("game-over-screen");
      gameOverScreen.classList.add("gameOverBG");
      // slidingBackground.style.display = "none";
      allObstacles.forEach((obstacle) => {
        obstacle.div.remove();
      });
      allObstacles = [];
      clearInterval(counter);
      return;
    }
    if (isGameWon) {
      allObstacles.forEach((obstacle) => {
        obstacle.div.remove();
      });
      allObstacles = [];
      clearInterval(counter);
      return;
    }
  }
}

//GAME OVER SCREEN
gameOverText.addEventListener("mouseenter", () => {
  gameOverText.classList.add("gameOverUnshown");
  gameOverText.classList.remove("gameOverShown");
  playAgainText.classList.remove("gameOverUnshown");
  playAgainText.classList.add("gameOverShown");
  playAgainText.classList.add("gameOverBGHover");
  gameOverScreen.classList.add("gameOverBGHover");
});
playAgainText.addEventListener("mouseleave", () => {
  playAgainText.classList.add("gameOverUnshown");
  playAgainText.classList.remove("gameOverShown");
  gameOverText.classList.remove("gameOverUnshown");
  gameOverText.classList.add("gameOverShown");
});
playAgainText.addEventListener("click", () => {
  location.reload();
});

//GAME WON SCREEN
gameWonText.addEventListener("mouseenter", () => {
  gameWonText.classList.add("gameWonUnshown");
  gameWonText.classList.remove("gameWonShown");
  playAgainTextWon.classList.remove("gameWonUnshown");
  playAgainTextWon.classList.add("gameWonShown");
  playAgainTextWon.classList.add("gameWonBGHover");
  gameWonScreen.classList.add("gameWonBGHover");
});
playAgainTextWon.addEventListener("mouseleave", () => {
  playAgainTextWon.classList.add("gameWonUnshown");
  playAgainTextWon.classList.remove("gameWonShown");
  gameWonText.classList.remove("gameWonUnshown");
  gameWonText.classList.add("gameWonShown");
});
playAgainText.addEventListener("click", () => {
  location.reload();
});
playAgainTextWon.addEventListener("click", () => {
  location.reload();
});

class Obstacle {
  constructor() {
    this.div = document.createElement("div");
    this.div.classList.add("obstacle");
    this.img = document.createElement("img");
    this.img.src = arrayObstacleImg[randomIndexNumber(arrayObstacleImg)];
    this.div.style.top = randomPosition();
    this.div.style.right = randomPosition();
    this.div.appendChild(this.img);
    allObstacles.push(this);
    game2.insertAdjacentElement("beforeend", this.div);
  }
  checkCollisionObstacle() {
    const char1Position = char1.getBoundingClientRect();
    const obstaclePosition = this.div.getBoundingClientRect();
    const enemyPosition = enemy.getBoundingClientRect();

    if (
      char1Position.right > obstaclePosition.left &&
      char1Position.left < obstaclePosition.right &&
      char1Position.bottom > obstaclePosition.top &&
      char1Position.top < obstaclePosition.bottom
    ) {
      console.log("CARPISMA OLDU!!!");
      scoreUpper();
      this.div.classList.add("collision-animation");
      this.div.addEventListener(
        "animationend",
        () => {
          this.div.remove();
          new Obstacle();
        },
        { once: true }
      );
    }
    if (allObstacles.length >= 32) {
      allObstacles.forEach((obstacle) => {
        obstacle.div.remove();
      });
      allObstacles = [];
      loadObstacle(2);
    }
  }
}

function checkCollisionEnemy() {
  const obstaclePosition = this.div.getBoundingClientRect();
  const enemyPosition = enemy.getBoundingClientRect();

  if (
    enemyPosition.right > obstaclePosition.left &&
    enemyPosition.left < obstaclePosition.right &&
    enemyPosition.bottom > obstaclePosition.top &&
    enemyPosition.top < obstaclePosition.bottom
  ) {
    console.log("CARPISMA OLDU!!!");
    this.div.classList.add("collision-animation");
    this.div.addEventListener(
      "animationend",
      () => {
        this.div.remove();
        new Obstacle();
      },
      { once: true }
    );
  }
  if (allObstacles.length >= 32) {
    allObstacles.forEach((obstacle) => {
      obstacle.div.remove();
    });
    allObstacles = [];
    loadObstacle(2);
  }
}

function checkEnemyCatch() {
  const char1Position = char1.getBoundingClientRect();
  const enemyPosition = enemy.getBoundingClientRect();
  if (isGameOver) {
    return;
  }
  if (
    enemyPosition.right > char1Position.left + 60 &&
    enemyPosition.left < char1Position.right - 60 &&
    enemyPosition.bottom > char1Position.top + 60 &&
    enemyPosition.top < char1Position.bottom - 60
  ) {
    isGameOver = true;
    console.log("GAME OVER!!!");
    char1.classList.add("enemyCatchChar");
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const char1Position = char1.getBoundingClientRect();
  const gameContainer = document.querySelector(".game_container");
  const gameContainerPosition = gameContainer.getBoundingClientRect();

  switch (key) {
    case "w":
      if (char1Position.top - 15 > gameContainerPosition.top) {
        tigerWalkNorth.style.display = "block";
        tigerWalkSouth.style.display = "none";
        char1.style.top = char1.offsetTop - 30 + "px";
      }
      break;
    case "s":
      if (char1Position.bottom + 50 < gameContainerPosition.bottom) {
        tigerWalkNorth.style.display = "none";
        tigerWalkSouth.style.display = "block";
        char1.style.top = char1.offsetTop + 30 + "px";
      }
      break;
    case "a":
      if (char1Position.left > gameContainerPosition.left) {
        char1.style.left = char1.offsetLeft - 30 + "px";
      }
      break;
    case "d":
      if (char1Position.right < gameContainerPosition.right) {
        char1.style.left = char1.offsetLeft + 30 + "px";
      }
      break;
  }
  allObstacles.forEach((obstacle) => {
    obstacle.checkCollisionObstacle();
  });
});

function randomIndexNumber(arrayName) {
  return Math.floor(Math.random() * arrayName.length);
}

function shuffle(arrayName) {
  for (let i = arrayName.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = arrayName[i];
    arrayName[i] = arrayName[j];
    arrayName[j] = k;
  }
}

let arrayObstacleImg = [
  "imgGame2/obj/pilow1.png",
  "imgGame2/obj/pillow2.png",
  "imgGame2/obj/ball1.png",
  "imgGame2/obj/needle1.png",
  "imgGame2/obj/needle2.png",
  "imgGame2/obj/scissors2.png",
  "imgGame2/obj/scissors.png",
  "imgGame2/obj/yuksuk1.png",
  "imgGame2/obj/needle3.png",
  "imgGame2/obj/needlecushion1.png",
  "imgGame2/obj/needlecushion2.png",
  "imgGame2/obj/needlecushion3.png",
  "imgGame2/obj/pillow3_1obj.png",
  "imgGame2/obj/makara1 Background Removed.png",
  "imgGame2/obj/sewingMach1.png",
  "imgGame2/obj/embrHoop2obj.png",
  "imgGame2/gerak_gif.gif",
];

let frameCounter = 0;

function updateEnemy(timestamp) {
  const char1Position = char1.getBoundingClientRect();
  const enemyPosition = enemy.getBoundingClientRect();
  let enemySpeed = parseInt(allObstacles.length);
  frameCounter++;
  checkEnemyCatch();

  if (frameCounter % 3 == 0) {
    if (char1Position.left < enemyPosition.left) {
      enemy.style.left = enemy.offsetLeft - (1 + (enemySpeed % 5)) + "px";
    }
    if (char1Position.left > enemyPosition.left) {
      enemy.style.left = enemy.offsetLeft + (1 + (enemySpeed % 5)) + "px";
    }
    if (char1Position.top > enemyPosition.top) {
      enemy.style.top = enemy.offsetTop + (1 + (enemySpeed % 5)) + "px";
    }
    if (char1Position.top < enemyPosition.top) {
      enemy.style.top = enemy.offsetTop - (1 + (enemySpeed % 5)) + "px";
    }
    requestAnimationFrame(updateEnemy);
  } else {
    requestAnimationFrame(updateEnemy);
    return;
  }
  if (isGameOver == false) {
    return;
  } else {
    enemy.classList.add("enemyCatch");
    gameOverScreen.classList.remove("game-over-screen");
    gameOverScreen.classList.add("gameOverBG");
    allObstacles.forEach((obstacle) => {
      obstacle.div.remove();
    });
    allObstacles = [];
  }
}

function updateObstacle(timestamp) {
  allObstacles.forEach((obstacle) => {
    obstacle.div.style.top = obstacle.div.offsetTop - 1 + "px";
    if (obstacle.div.offsetTop <= -40) {
      obstacle.div.style.top = "680px";
    }
  });
  requestAnimationFrame(updateObstacle);
}

function loadObstacle(number) {
  for (let a = 1; a <= number; a++) {
    new Obstacle();
  }

  return;
}
loadObstacle(2);
startTimer(60);
console.log(allObstacles);
requestAnimationFrame(updateEnemy);
requestAnimationFrame(updateObstacle);
