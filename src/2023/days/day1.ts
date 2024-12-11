export function day1(values: string[]) {
  console.log("day1");

  //let brokenUp: Array<Array<string>> = []; //?? lol
  let brokenUp: any = [];

  let totalSums: number[] = [];
  let groups: any[] = [];
  let pairs: any[] = [];

  let pairedGroups: any = [];

  values.forEach((val) => {
    groups.push(evalStrings(val));

    //break up for single char eval
    let temp: string[] = [];

    for (let i = 0; i < val.length; i++) {
      temp.push(val[i]);
    }

    //brokenUp.push(temp);

    brokenUp.push({ temp, val });
  });

  console.log(brokenUp);

  brokenUp.forEach((arr: any) => {
    let pair: any = [];

    console.log(arr.val);

    arr.temp.forEach((char: string, index: number) => {
      const val: any = evalChar(char, index);

      if (typeof val.value !== "number") {
        return;
      }

      pair.push(val);
    });

    pairs.push(pair);

    //handle only 1 number
    if (pair.length < 2) {
      pair[1] = pair[0];
    }

    //handle more than 2 numbers
    if (pair.length > 2) {
      let lastIndex = pair.length - 1;

      pair = [pair[0], pair[lastIndex]];
    }

    console.log(pair, "pair");

    let combine = `${isObject(pair[0]) ? pair[0].value : pair[0]}${
      isObject(pair[1]) ? pair[1].value : pair[1]
    }`;

    //let combine = `${pair[0]} ${pair[1]}`;

    /* if (isObject(pair[0])) {
      totalSums.push(parseInt(combine));
    } */

    /* if (parseInt(combine) === NaN) {
      console.log("fooo");
    } */
    //console.log(parseInt(combine) ? parseInt(combine) : "im not a number");
    //
    //
    //
    //

    const has = hasNoWords(arr.val);

    console.log(has, "has");

    totalSums.push(parseInt(combine) && !has ? parseInt(combine) : 0);
  });

  console.log(totalSums, "total Sums");

  let numericTotal = totalSums.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  for (let i = 0; i < groups.length; i++) {
    pairedGroups.push({ group: groups[i], pair: pairs[i] });
  }

  const newTotal = finalEval(pairedGroups);

  console.log(newTotal);

  let total = newTotal.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  console.log(numericTotal, "numeric");
  console.log(total, "non-numeric");

  let finalTotal = numericTotal + total;

  return finalTotal;
}

function hasNoWords(val: string) {
  let numberStrings: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  let found = false;

  numberStrings.forEach((string) => {
    if (val.includes(string)) {
      found = true;
    }
  });

  return found;
}

function isObject(arg: any) {
  return typeof arg === "object";
}

function finalEval(pairedGroups: any) {
  let str2num = [
    { value: 1, text: "one" },
    { value: 2, text: "two" },
    { value: 3, text: "three" },
    { value: 4, text: "four" },
    { value: 5, text: "five" },
    { value: 6, text: "six" },
    { value: 7, text: "seven" },
    { value: 8, text: "eight" },
    { value: 9, text: "nine" },
  ];

  let total: number[] = [];

  /*
  const pair = pairedGroups[6].pair;
  const group = pairedGroups[6].group;
  const string = group[0].input;
  const length = string.length; */

  pairedGroups.forEach((pg: any) => {
    if (pg.group[0] === undefined) {
      return;
    }

    let pair = pg.pair;
    let group = pg.group;
    let string = group[0].input;
    let length = string.length;

    let indexes: any[] = [];

    //let diffs: Array<{ value: number | string; diff: number }> = [];
    let diffs: any = [];

    group.forEach((g: any) => {
      indexes.push({ value: g.value, idx: g.index });
    });

    pair?.forEach((p: any) => {
      if (p === undefined) {
        return;
      }

      indexes.push({ value: p.value, idx: p.idx });
    });

    indexes.forEach((a) => {
      let diff = length - a.idx;

      diffs.push({ value: a.value, diff });
    });

    diffs.sort((a: any, b: any) => a.diff - b.diff);

    let first = diffs.pop();
    let last = diffs.shift();

    if (typeof first.value === "string") {
      first = str2num.find((i) => i.text === first.value)?.value;
    }

    if (typeof last.value === "string") {
      last = str2num.find((i) => i.text === last.value)?.value;
    }

    if (typeof first === "object") {
      first = first.value;
    }

    if (typeof last === "object") {
      last = last.value;
    }

    let combine = `${first}${last}`;

    total.push(parseInt(combine));
  });

  return total;
}

function evalStrings(string: string) {
  let numberStrings: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  interface Groups {
    input: string | undefined;
    index: number | undefined;
    value: string;
  }

  let groups: Groups[] = [];

  numberStrings.forEach((numStr) => {
    //const found = string.includes(numStr);

    const found = string.match(numStr);

    if (found !== null && found !== undefined) {
      groups.push({ input: found.input, index: found.index, value: found[0] });
    } else {
      console.log("here");
    }
  });

  return groups;
}

function evalChar(char: string, index: number) {
  let nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let val: any;

  nums.forEach((num) => {
    if (parseInt(char) === num) {
      val = char;
    }
  });

  return val === undefined ? false : { value: parseInt(val), idx: index };
}
