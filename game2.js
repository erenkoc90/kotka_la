const char1 = document.getElementById("char1");
let allObstacles = [];
let game2 = document.querySelector(".game2");
const tigerWalkNorth = document.getElementById("tigerWalkNorth");
const tigerWalkSouth = document.getElementById("tigerWalkSouth");

function randomPosition() {
  return Math.random() * 640 + "px";
}

class Obstacle {
  constructor(imgSrc) {
    this.div = document.createElement("div");
    this.div.classList.add("obstacle");
    this.img = document.createElement("img");
    this.img.src = imgSrc;
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
      this.div.addEventListener("animationend", () => {
        this.div.remove();
      });
    }
  }
}

/*function checkCollision() {
  const char1Position = char1.getBoundingClientRect();
  const obstacle1Position = obstacle.getBoundingClientRect();
  if (
    char1Position.right > obstacle1Position.left &&
    char1Position.left < obstacle1Position.right &&
    char1Position.bottom > obstacle1Position.top &&
    char1Position.top < obstacle1Position.bottom
  ) {
    console.log("CARPISMA OLDU!!!");
    obstacle.classList.add("collision-animation");
    obstacle.addEventListener("animationend", () => {
      obstacle.remove();
    });
  }
}*/

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
  });
});

let object2 = new Obstacle("imgGame2/obj/pilow1.png");
let object3 = new Obstacle("imgGame2/obj/ball1.png");

console.log(allObstacles);
