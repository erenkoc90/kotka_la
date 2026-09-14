const char1 = document.getElementById("char1");
let allObstacles = [];
let game2 = document.querySelector(".game2");
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
    let isColliding = false;

    if (
      char1Position.right > obstaclePosition.left &&
      char1Position.left < obstaclePosition.right &&
      char1Position.bottom > obstaclePosition.top &&
      char1Position.top < obstaclePosition.bottom
    ) {
      this.isColliding = true;
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
        char1.style.top = char1.offsetTop - 15 + "px";
      }
      break;
    case "s":
      if (char1Position.bottom + 50 < gameContainerPosition.bottom) {
        tigerWalkNorth.style.display = "none";
        tigerWalkSouth.style.display = "block";
        char1.style.top = char1.offsetTop + 15 + "px";
      }
      break;
    case "a":
      if (char1Position.left > gameContainerPosition.left) {
        char1.style.left = char1.offsetLeft - 15 + "px";
      }
      break;
    case "d":
      if (char1Position.right < gameContainerPosition.right) {
        char1.style.left = char1.offsetLeft + 15 + "px";
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
];

console.log(randomIndexNumber(arrayObstacleImg));
console.log(arrayObstacleImg[randomIndexNumber(arrayObstacleImg)]);

//let object2 = new Obstacle();
// let object3 = new Obstacle("imgGame2/obj/pillow2.png");
// let object4 = new Obstacle("imgGame2/obj/ball1.png");
// let object5 = new Obstacle("imgGame2/obj/pilow1.png");

function loadObstacle(number) {
  for (let a = 1; a <= number; a++) {
    new Obstacle();
  }
  return;
}
loadObstacle(5);
console.log(allObstacles);
