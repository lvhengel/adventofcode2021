export const part1 = (input: string) => {
  const lines = input.split("\n");
  const length = lines[0].length;

  const gammarate: number[] = new Array(length);
  const epsilonrate: number[] = new Array(length);

  for (let index = 0; index < length; index++) {
    gammarate[index] = zeroOrOne(lines, index, true);
    epsilonrate[index] = zeroOrOne(lines, index, false);
  }

  const gamma = parseInt(gammarate.join(""), 2);
  const epsilon = parseInt(epsilonrate.join(""), 2);

  console.log("Part1: " + gamma * epsilon);
};

export const part2 = (input: string) => {
  let lines = input.split("\n");
  const length = lines[0].length;

  for (let index = 0; index < length; index++) {
    const common = zeroOrOne(lines, index, true);
    lines = filterLines(lines, index, common);
    if (lines.length === 1) break;
  }

  const oxygen = parseInt(lines[0], 2);

  lines = input.split("\n");
  for (let index = 0; index < length; index++) {
    const common = zeroOrOne(lines, index, false);
    lines = filterLines(lines, index, common);
    if (lines.length === 1) break;
  }

  const scrubber = parseInt(lines[0], 2);

  console.log("Part2: " + oxygen * scrubber);
};

function filterLines(lines: string[], index: number, search: number) {
  return lines.filter((x) => +x[index] === search);
}

function zeroOrOne(lines: string[], index: number, common: boolean) {
  let zero = 0, one = 0;
  lines.forEach((line) => +line[index] === 0 ? zero++ : one++);
  return common ? (zero > one ? 0 : 1) : (zero > one ? 1 : 0);
}
