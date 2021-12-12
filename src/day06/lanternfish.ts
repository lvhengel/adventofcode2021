export const part1 = (input: string) => {
  const lines = input.split("\n");
  let timers = lines[0].split(",").map(Number);

  const days = 80;
  let count = 1;

  while (count <= days) {
    let newfish = 0;
    const newtimers = timers.map((x) => {
      if (x === 0) {
        newfish++;
        return 6;
      } else {
        return x - 1;
      }
    });
    for (let index = 0; index < newfish; index++) {
      newtimers.push(8);
    }
    timers = newtimers;
    count++;
  }

  console.log("Part1: " + timers.length);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");
  const laternfishCounters: number[] = new Array(9).fill(0);
  const initial = lines[0].split(",").map(Number);

  initial.forEach((x) => {
    laternfishCounters[x] += 1;
  });

  const days = 256;
  let count = 1;

  while (count <= days) {
    const previousCounters = [...laternfishCounters];
    for (let i = 1; i < 9; i++) {
      laternfishCounters[i - 1] = previousCounters[i];
    }
    laternfishCounters[8] = previousCounters[0];
    laternfishCounters[6] = previousCounters[7] + previousCounters[0];
    count++;
  }

  console.log(
    "Part2: " + laternfishCounters.reduce((acc, curr) => acc + curr, 0),
  );
};
