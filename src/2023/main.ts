//import { day1 } from "./days/day1";
//import { day5 } from "./days/day5";

import { day2 } from "./days/day2";
import { day3 } from "./days/day3";
import { day4 } from "./days/day4";
import { day6 } from "./days/day6";
import { day7 } from "./days/day7";

//import { calibrationValues } from "./2023/data/calibrationValues";

/* day 1  */
//const day1Answer = day1(calibrationValues);

//const day1AnswerPartTwo = day1(calibrationValues);

//console.log("Day 1 answer:", 55721); // 55,712
//console.log(day1AnswerPartTwo, "pt.2 answer"); -- never got it

/* day 2 */
let day2answer = await day2();

//console.log("Day 2 answer:", day2answer); //2204

/* day 3 */
let day3Answer = await day3();

//console.log("day 3 answer:", day3Answer); //never got it

/* day 4 */
let day4Answer = await day4();

//console.log("day 4 answer:", day4Answer); // 18653

/* day 5 */
//day5() // never got it;

/* day 6 */
let day6Answer = await day6();
//console.log("day 6 answer:", day6Answer); // 633080

/* day 7 */
let day7Answer = await day7();
//console.log("day 7 answer:", day7Answer); // never got it :(

const results2023 = {
  "Day 1 answer": 55721,
  "Day 2 answer": day2answer,
  "Day 3 answer": `${day3Answer} ... never got it`,
  "Day 4 answer": day4Answer,
  "Day 5 answer": "never got it",
  "Day 6 answer": day6Answer,
  "Day 7 answer": `${day7Answer} never got it :(`,
  "Total Star count:": 4,
};

console.group(
  `%c Advent of Code 2023 `,
  "color: yellow; background-color: black; font-weight: bold;",
);
console.table(results2023);
console.groupEnd();
