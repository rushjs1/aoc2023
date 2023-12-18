import starSvg from "./icons/star.svg";

let app = document.querySelector<HTMLDivElement>("#app");
let title = document.createElement("h3");
title.innerHTML = "Advent of Code 2023";
title.className = "title";

let starDv = document.createElement("div");
starDv.className = "stars";

for (let i = 0; i < 4; i++) {
  let img = new Image();
  img.src = starSvg;
  starDv.appendChild(img);
}

app?.appendChild(title);
app?.appendChild(starDv);
