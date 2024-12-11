export async function day4() {
  console.log("day4");
  let answer;

  try {
    let res = await fetch("/2023/day4.txt");

    if (!res.ok) {
      throw new Error("Failed to load data.");
    }

    let data = await res.text();

    answer = parseData(data);
  } catch (error) {
    throw new Error("Failed to load data.");
  }

  return answer;
}

interface Line {
  cardNumber: string;
  winningNumbers: number[];
  myNumbers: number[];
  matches: number[];
}

interface EvaluatedLine extends Line {
  points: number;
}

function parseData(data: string) {
  let formattedData = data.split("\n").filter((line) => line.length > 0);

  let parsedData: EvaluatedLine[] = [];

  formattedData.forEach((line) => {
    let parsedLine = parseLine(line);

    parsedData.push(evaluatePoints(parsedLine));
  });

  let total = calculateTotalPoints(parsedData);

  return total;
}

function calculateTotalPoints(cards: EvaluatedLine[]) {
  let pointTotals: number[] = [];

  cards.forEach((card) => {
    pointTotals.push(card.points);
  });

  return pointTotals.reduce((acc, init) => acc + init, 0);
}

function evaluatePoints(line: Line): EvaluatedLine {
  let length = line.matches.length - 1;
  let acc = 1;

  if (length > 0) {
    for (let i = 0; i < length; i++) {
      acc = acc * 2;
    }
  } else if (length === 0) {
    acc = 1;
  } else {
    acc = 0;
  }

  return { ...line, points: acc };
}

function parseLine(line: string): Line {
  let [cardNumber, numbers] = line.split(":");
  let [preWinningNumbers, preMyNumbers] = numbers.split("|");

  let numRegex = /\d+/g;

  let winningNumbers = preWinningNumbers
    .match(numRegex)
    ?.map((num) => parseInt(num)) as number[];

  let myNumbers = preMyNumbers
    .match(numRegex)
    ?.map((number) => parseInt(number)) as number[];

  let matches: number[] = [];

  myNumbers.forEach((n) => {
    winningNumbers.forEach((wn) => {
      if (n === wn) {
        matches.push(n);
      }
    });
  });

  return { cardNumber, winningNumbers, myNumbers, matches };
}
