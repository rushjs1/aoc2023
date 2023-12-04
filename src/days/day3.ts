export async function day3() {
  console.log("day3");
  let answer;

  try {
    const res = await fetch("../../public/day3.txt");

    if (!res.ok) {
      throw new Error("Faild to load file.");
    }

    const data = await res.text();

    answer = parseData(data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load file.");
  }

  return answer;
}

function parseData(data: string) {
  console.log(data);

  const numberOfLines = data.split(/\r\n|\r|\n/).length - 1;

  const charsPerLine = data.length / numberOfLines;

  console.log(numberOfLines, "numberOfLines");
  console.log(charsPerLine, "charsPerLine");

  console.log(data[286], "foo");

  let formattedData = [];

  let end = charsPerLine - 1;
  let start = 0;

  for (let i = 0; i < data.length; i++) {
    if (i === end) {
      start = end + 1;

      end = end + charsPerLine;

      formattedData.push(data.substring(start, end));
    }
  }
  formattedData.unshift(data.substring(0, charsPerLine - 1));
  formattedData.pop();

  let lineInfo: Array<{
    line: string;
    partNumbers: number[];
    lineTotal: number;
    numbers: Array<{
      idx: number | undefined;
      number: number;
      length: number;
      included: boolean;
    }>;
    symbolInfo: Array<{ symbol: string; index: number }>;
  }> = [];

  formattedData.forEach((line) => {
    lineInfo.push(parseLine(line));
  });

  findPartNumbers(lineInfo);

  return calculateTotal(lineInfo);
}

function calculateTotal(
  lineInfo: Array<{
    line: string;
    partNumbers: number[];
    lineTotal: number;
    numbers: Array<{
      idx: number | undefined;
      number: number;
      length: number;
      included: boolean;
    }>;
    symbolInfo: Array<{ symbol: string; index: number }>;
  }>,
) {
  let totals: number[] = [];

  lineInfo.forEach((line) => {
    line.lineTotal = line.partNumbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    totals.push(line.lineTotal);
  });

  return totals.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
}

function findPartNumbers(
  lineInfo: Array<{
    line: string;
    partNumbers: number[];
    lineTotal: number;
    numbers: Array<{
      idx: number | undefined;
      number: number;
      included: boolean;
    }>;
    symbolInfo: Array<{ symbol: string; index: number }>;
  }>,
) {
  for (let i = 0; i < lineInfo.length; i++) {
    lineInfo[i].symbolInfo.forEach((symbol) => {
      lineInfo[i].numbers.forEach((number) => {
        //are within 1

        //handle Right and left
        if (isWithinRange(number.idx, symbol.index, 4)) {
          //check right
          if (lineInfo[i]?.line[symbol.index + 1] !== ".") {
            if (!number.included) {
              lineInfo[i]?.partNumbers.push(number.number);
              number.included = true;
            }
          }

          //check left
          if (lineInfo[i]?.line[symbol.index - 1] !== ".") {
            if (!number.included) {
              lineInfo[i]?.partNumbers.push(number.number);
              number.included = true;
            }
          }
        }
      });

      lineInfo[i + 1]?.numbers.forEach((number) => {
        if (isWithinRange(number.idx, symbol.index, 4)) {
          //check right
          if (lineInfo[i + 1]?.line[symbol.index + 1] !== ".") {
            if (!number.included) {
              lineInfo[i + 1]?.partNumbers.push(number.number);
              number.included = true;
            }
          }

          //check left
          if (lineInfo[i + 1]?.line[symbol.index - 1] !== ".") {
            if (!number.included) {
              lineInfo[i + 1]?.partNumbers.push(number.number);
              number.included = true;
            }
          }
        }
      });

      lineInfo[i - 1]?.numbers.forEach((number) => {
        if (isWithinRange(number.idx, symbol.index, 4)) {
          //check right
          if (lineInfo[i - 1]?.line[symbol.index + 1] !== ".") {
            if (!number.included) {
              lineInfo[i - 1]?.partNumbers.push(number.number);
              number.included = true;
            }
          }

          //check left
          if (lineInfo[i - 1]?.line[symbol.index - 1] !== ".") {
            if (!number.included) {
              lineInfo[i - 1]?.partNumbers.push(number.number);
              number.included = true;
            }
          }
        }
      });
    });

    console.log(lineInfo[i]);
  }
}

function isWithinRange(a: number | undefined, b: number, range: number) {
  return Math.abs((a as number) - b) <= range;
}

function parseLine(line: string) {
  const symbols = [
    "*",
    "#",
    "$",
    "&",
    "=",
    "+",
    "-",
    "@",
    "%",
    "/",
    "<",
    ">",
    ",",
    "~",
    "{",
    "}",
    "|",
  ];

  let symbolInfo: Array<{ symbol: string; index: number }> = [];

  for (let i = 0; i < line.length; i++) {
    symbols.forEach((s) => {
      if (line[i].includes(s)) {
        symbolInfo.push({ symbol: line[i], index: i });
      }
    });
  }

  let numbers: Array<{
    idx: number | undefined;
    number: number;
    length: number;
    included: boolean;
  }> = [];

  let numRegex = /\d+/g;
  let match;

  while ((match = numRegex.exec(line)) !== null) {
    numbers.push({
      idx: match.index,
      number: parseInt(match[0]),
      length: match[0].toString().length,
      included: false,
    });
  }

  return {
    line,
    partNumbers: [],
    numbers,
    lineTotal: 0,
    symbolInfo,
  };
}
