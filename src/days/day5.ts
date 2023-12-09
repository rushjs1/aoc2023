export async function day5() {
  try {
    let res = await fetch("../../public/day5.txt");

    if (!res.ok) {
      throw new Error("Failed to load file.");
    }

    let data = await res.text();

    parseData(data);
  } catch (error) {
    throw new Error("Failed to load file.");
  }
}

interface Map {
  destination: number;
  source: number;
  range: number;
}

interface Section {
  destinationCategory: string;
  sourceCategory: string;
  maps: Map[];
}

function parseData(data: string) {
  let parse = data.split("\n");
  let seeds = parse[0]
    .split(":")[1]
    .split(" ")
    .filter((s) => s !== "")
    .map((s) => parseInt(s));

  parse.splice(0, 2);

  let sectionsArr: Array<string[]> = [];
  let currentSection: string[] = [];

  parse.forEach((item) => {
    if (item !== "") {
      currentSection.push(item);
    } else if (item === "") {
      sectionsArr.push(currentSection);
      currentSection = [];
    }
  });

  let ranges: Array<number[]> = [];

  sectionsArr.forEach((section) => {
    section.splice(0, 1);
    section.forEach((s) => {
      let [destination, source, range] = s.split(" ");

      ranges.push([parseInt(destination), parseInt(source), parseInt(range)]);
    });
  });

  /* sectionsArr.forEach((section) => {
    let formattedSection = formatSection(section);
    almanac.sections.push(formattedSection);
  });

  //console.log(almanac);
  almanac.seeds.forEach((seed) => {
    almanac.sections.forEach((section) => {
      console.log(section);
      section.maps.forEach((map) => {
        evaluateMap(seed, map);
        //console.log(ranges);
      });
    });
  }); */
}

/* function evaluateSection(seed: number, section: Section) {
  console.log(seed);
  console.log(section);
} */

function evaluateMap(seed: number, map: Map) {
  let range = map.range;

  //source
  let sourceStart = map.source;
  let sourceEnd = sourceStart - 1 + range;
  let sourceRange: number[] = [];

  //destination
  let destinationStart = map.destination;
  let destinationEnd = destinationStart - 1 + range;
  let destinationRange: number[] = [];

  for (let i = sourceStart; i <= sourceEnd; i++) {
    sourceRange.push(i);
  }

  for (let i = destinationStart; i <= destinationEnd; i++) {
    destinationRange.push(i);
  }

  let seedsToSoil: Array<{ seed: number; soil: number }> = [];
}

function formatSection(section: string[]): Section {
  let split = section[0].split("-");
  let destinationCategory = split[0];
  let sourceCategory = split[2].split(" ")[0];

  section.splice(0, 1);

  let maps = section;
  let mapsArr: Map[] = [];

  maps.forEach((m) => {
    let [destination, source, range] = m.split(" ");

    mapsArr.push({
      destination: parseInt(destination),
      source: parseInt(source),
      range: parseInt(range),
    });
  });

  return { destinationCategory, sourceCategory, maps: mapsArr };
}
