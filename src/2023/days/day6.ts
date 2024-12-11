export async function day6() {
  console.log("day 6");
  let answer;
  try {
    let res = await fetch("/2023/day6.txt");

    let data = await res.text();

    answer = parseData(data);
  } catch (error) {
    throw new Error("There is an error.");
  }

  return answer;
}

interface Race {
  time: number;
  distance: number;
}

function parseData(data: string) {
  let parse = data
    .split("\n")
    .filter((i) => i !== "")
    .map((i) =>
      i
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((i) => i !== "")
        .map((i) => parseInt(i)),
    );

  let formattedData: Race[] = [];
  let totals: number[] = [];

  for (let i = 0; i < parse.length; i++) {
    for (let j = 0; j < parse[i].length; j++) {
      if (parse[i + 1]) {
        formattedData.push({
          time: parse[i][j],
          distance: parse[i + 1][j],
        });
      }
    }
  }

  formattedData.forEach((race) => {
    totals.push(calculateRace(race));
  });

  return calculatePossibilites(totals);
}

function calculatePossibilites(winners: number[]) {
  return winners.reduce((acc, int) => acc * int);
}

function calculateRace(race: Race) {
  let record = race.distance;
  let time = race.time;

  let holdTime;
  let remainingTime;
  let finalDistance;
  let secarios = [];

  for (let i = 0; i < time; i++) {
    holdTime = i + 1;
    remainingTime = time - holdTime;
    finalDistance = holdTime * remainingTime;

    secarios.push(finalDistance);
  }

  let winners = secarios.filter((i) => i > record);

  return winners.length;
}
