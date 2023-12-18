export async function day7() {
  console.log("day7");

  let answer;
  try {
    let res = await fetch("../../public/day7.txt");
    let data = await res.text();

    answer = parseData(data);
  } catch (error) {
    throw new Error("there was an error.");
  }

  return answer;
}

function parseData(data: string) {
  let hands = data
    .split("\n")
    .filter((i) => i !== "")
    .map((i) => i.split(" "));

  let formattedHands: Array<{ hand: string[]; localRank: number }> = [];
  let sortedHands: Array<{ hand: string[]; localRank: number }> = [];

  hands.forEach((h) => {
    let pairs = findPairs(h);

    let localRank = findType(pairs);

    formattedHands.push({ hand: h, localRank });
  });

  sortedHands = formattedHands.sort((a, b) => a.localRank - b.localRank);

  return rankHands(sortedHands);
}

function rankHands(hands: Array<{ hand: string[]; localRank: number }>) {
  let groupByLocalRank: any = {};

  hands.forEach((h) => {
    if (groupByLocalRank[h.localRank]) {
      groupByLocalRank[h.localRank].push(h);
    } else {
      groupByLocalRank[h.localRank] = [h];
    }
  });

  for (let i in groupByLocalRank) {
    if (groupByLocalRank[i].length > 1) {
      let sorted = sortSameRank(groupByLocalRank[i]);
      groupByLocalRank[i] = sorted;
    }
  }

  const sorted = Object.keys(groupByLocalRank).map((i) => groupByLocalRank[i]);

  let final: any = [];

  sorted.forEach((s) => {
    s.forEach((i: any) => {
      final.push(i);
    });
  });

  final.forEach((f: any, index: number) => {
    if (!f.hand) {
      let h = f.map((i: any) => i.char).join("");
      for (let i = 0; i < hands.length; i++) {
        if (h === hands[i].hand[0]) {
          let hand = hands[i];

          final[index] = hand;
        }
      }
    }
  });

  return findTotal(
    final.map((i: { hand: string[]; localRank: number }) => i.hand),
  );
}

function findTotal(hands: Array<string[]>) {
  let totals: number[] = [];

  hands.forEach((hand, index) => {
    let rank = index + 1;

    let t: number = parseInt(hand[1]) * rank;
    totals.push(t);
  });

  let total = totals.reduce(
    (accumulator, initalValue) => accumulator + initalValue,
    0,
  );

  return total;
}

function sortSameRank(hands: Array<{ hand: string[]; localRank: number }>) {
  let scores = [
    { char: "A", points: 14 },
    { char: "K", points: 13 },
    { char: "Q", points: 12 },
    { char: "J", points: 11 },
    { char: "T", points: 10 },
    { char: "9", points: 9 },
    { char: "8", points: 8 },
    { char: "7", points: 7 },
    { char: "6", points: 6 },
    { char: "5", points: 5 },
    { char: "4", points: 4 },
    { char: "3", points: 3 },
    { char: "2", points: 2 },
  ];

  let pointHands: Array<Array<{ char: string; points: number }>> = [];

  hands.forEach((h, index) => {
    let hand = h.hand[0].split("");
    hand.forEach((char) => {
      let score = scores.find((i) => i.char === char);

      if (score) {
        if (pointHands[index]) {
          pointHands[index].push(score);
        } else {
          pointHands[index] = [score];
        }
      }
    });
  });

  pointHands.sort(function (a, b) {
    for (let j = 0; j < a.length; j++) {
      const pointsA = a[j] ? a[j].points : 0;
      const pointsB = b[j] ? b[j].points : 0;

      if (pointsB < pointsA) {
        return -1;
      } else if (pointsA > pointsB) {
        return 1;
      }
    }

    return 0;
  });

  return pointHands;
}

function findType(pairs: string[]) {
  let handType = "";
  let localRank: number = 0;

  pairs.forEach((p) => {
    if (handType.length > 0) {
      return;
    }
    let length = p.length;

    if (length === 2 && pairs.length === 2) {
      handType = "twoPair";
      localRank = 2;
    } else if (length === 2 && pairs.length === 1) {
      handType = "onePair";
      localRank = 1;
    }

    if (length === 5) {
      handType = "fiveKind";
      localRank = 6;
    }

    if (length === 4) {
      handType = "fourKind";
      localRank = 5;
    }

    if (length === 3 && pairs.length === 2) {
      handType = "fullHouse";
      localRank = 4;
      return;
    } else if (length === 3 && pairs.length === 1) {
      handType = "threeKind";
      localRank = 3;

      return;
    }

    if (length === 0) {
      handType = "highCard";
      localRank = 0;
    }
  });

  return localRank;
}

function findPairs(hand: string[]) {
  let localHand = hand[0].split("");
  let pairs: string[] = [];
  let pairings: string[] = [];

  for (let i = 0; i < localHand.length; i++) {
    for (let j = 0; j < localHand.length; j++) {
      if (i !== j) {
        if (localHand[i] === localHand[j]) {
          // we know its at least a one pair so lets find the extras
          pairs.push(localHand[i]);
        }
      }
    }
  }

  pairs.forEach((p) => {
    let extras = JSON.stringify(findExtras(localHand, p));

    if (!pairings.includes(extras)) {
      pairings.push(extras);
    }
  });

  return pairings.map((p) => JSON.parse(p));
}

function findExtras(hand: string[], pair: string) {
  return hand.filter((i) => i === pair);
}
