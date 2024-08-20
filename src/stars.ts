//@ts-ignore
import starSvg from "./icons/star.svg";
//@ts-ignore
import downArrow from "./icons/downArrow.svg";

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

let answersBannerDv = document.createElement("div");
answersBannerDv.innerHTML = "Answers below in the console.";
answersBannerDv.className = "answersBanner";

let arrow = new Image();
arrow.src = downArrow;
arrow.className = "downArrow";
answersBannerDv.appendChild(arrow);

app?.appendChild(answersBannerDv);
