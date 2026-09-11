const tigerImg = document.querySelector("#walking-tiger1");

console.log(tigerImg);
console.log(tigerImg.style);
console.log("animation: " + tigerImg.style.animation);

tigerImg.addEventListener("keypress", function (event) {
  event.key === "Enter" ? console.log("clicked") : null;
  //   if (event.key == "ENTER") {
  //     console.log("clicked");
  //     tigerImg.style.animation = "walk 10s linear infinite";
  //     console.log(tigerImg.style);
});
tigerImg.addEventListener("click", () => {
  console.log("clicked");
  tigerImg.style.animation = "walk 10s linear infinite";
  console.log(tigerImg.style);
});
