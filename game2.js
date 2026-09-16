const char1 = document.getElementById("char1");
const enemy = document.getElementById("enemy");

let allObstacles = [];

let game2 = document.querySelector(".game2");
const gameContainer = document.querySelector(".game_container");
const slidingBackground = document.querySelector(".sliding-background");
const tigerWalkNorth = document.getElementById("tigerWalkNorth");
const tigerWalkSouth = document.getElementById("tigerWalkSouth");

function randomPosition() {
  return Math.random() * 580 + "px";
}

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

    if (
      char1Position.right > obstaclePosition.left &&
      char1Position.left < obstaclePosition.right &&
      char1Position.bottom > obstaclePosition.top &&
      char1Position.top < obstaclePosition.bottom
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
    console.log(allObstacles.length);
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
];

let frameCounter = 0;
function updateEnemy(timestamp) {
  const char1Position = char1.getBoundingClientRect();
  const enemyPosition = enemy.getBoundingClientRect();
  let enemySpeed = parseInt(allObstacles.length);
  frameCounter++;
  //console.log(frameCounter, frameCounter % 3);

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
console.log(allObstacles);
requestAnimationFrame(updateEnemy);
requestAnimationFrame(updateObstacle);
