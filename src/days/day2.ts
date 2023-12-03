export async function day2() {
  let answer;
  try {
    const res = await fetch("../../public/day2.txt");

    if (!res.ok) {
      throw new Error("Failed to load file");
    }

    const text = await res.text();

    answer = parseData(text);
  } catch (error) {
    throw new Error("Failed to load file.");
  }

  return answer;
}

function parseData(text: string) {
  let prevIndex: number = 0;
  let gIndex: number = 0;

  let gameArr: Array<{
    original: string;
    sets: Array<string>;
    gameNumber: number;
    possible: boolean;
  }> = [];

  for (let i = 0; i < text.length; i++) {
    if (gIndex !== i) {
      prevIndex = gIndex;
    }

    gIndex = text.indexOf("G", i);

    let game = text.slice(prevIndex, gIndex);

    if (game.length !== 0) {
      let sets = game.split(":");
      let subSets = sets[1].split(";");

      gameArr.push({
        original: game,
        sets: subSets,
        gameNumber: parseInt(sets[0].split(" ")[1]),
        possible: true,
      });
    }
  }

  let possibleGames = checkPossibilities(gameArr);

  let total = getTotal(possibleGames);
  return total;
}

function getTotal(games: number[]) {
  let total = games.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  return total;
}

//witch games are possible with only 12 red cubes, 13 green cubes, and 14 blue cubes.
// What is the sum of the IDs of thoes games?
function checkPossibilities(
  games: Array<{
    original: string;
    sets: Array<string>;
    gameNumber: number;
    possible: boolean;
  }>,
) {
  let isNotPossible = true;

  let possibleGames: number[] = [];

  games.forEach((game) => {
    game.sets.forEach((set) => {
      if (!game.possible) {
        return;
      }

      isNotPossible = evalSet(set);

      if (isNotPossible) {
        game.possible = !isNotPossible;

        return;
      }
    });

    if (game.possible) {
      possibleGames.push(game.gameNumber);
    }
  });

  return possibleGames;
}

function evalSet(set: string) {
  let parsedSet = set.split(",");
  let over = false;

  parsedSet.forEach((pull) => {
    let isColorOver = false;
    let arr = pull.split(" ");

    let pulledColor = arr[2].trim();
    let number = parseInt(arr[1]);

    switch (pulledColor) {
      case "blue":
        isColorOver = checkBlue(number);
        break;
      case "green":
        isColorOver = checkGreen(number);
        break;
      case "red":
        isColorOver = checkRed(number);
        break;
    }

    if (isColorOver) {
      over = true;
    }
  });
  return over;
}

function checkBlue(value: number) {
  let maxBlues = 14;

  return value <= maxBlues ? false : true;
}

function checkRed(value: number) {
  let maxReds = 12;

  return value <= maxReds ? false : true;
}

function checkGreen(value: number) {
  let maxGreens = 13;

  return value <= maxGreens ? false : true;
}
