const char1 = document.getElementById("char1");
const tigerWalkNorth = document.getElementById("tigerWalkNorth");
const tigerWalkSouth = document.getElementById("tigerWalkSouth");

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
        char1.style.top = char1.offsetTop - 10 + "px";
      }
      break;
    case "s":
      if (char1Position.bottom + 50 < gameContainerPosition.bottom) {
        tigerWalkNorth.style.display = "none";
        tigerWalkSouth.style.display = "block";
        char1.style.top = char1.offsetTop + 10 + "px";
      }
      break;
    case "a":
      if (char1Position.left > gameContainerPosition.left) {
        char1.style.left = char1.offsetLeft - 10 + "px";
      }
      break;
    case "d":
      if (char1Position.right < gameContainerPosition.right) {
        char1.style.left = char1.offsetLeft + 10 + "px";
      }
      break;
  }
});
