export const part1 = (input: string) => {
  const lines = input.split("\n");
  const max = getMax(lines);
  solve(lines, max, false);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");
  const max = getMax(lines);
  solve(lines, max, true);
};

function getMax(lines: string[]) {
  let max = 0;
  lines.forEach((line) => {
    const parts = line.split(" -> ");
    const first = parts[0].split(",").map(Number);
    const second = parts[1].split(",").map(Number);

    if (Math.max(...first) > max) {
      max = Math.max(...first);
    }
    if (Math.max(...second) > max) {
      max = Math.max(...second);
    }
  });
  return max;
}

function solve(lines: string[], max: number, part2: boolean) {
  const area: number[][] = new Array(max + 1)
    .fill(0)
    .map(() => new Array(max + 1).fill(0));

  lines.forEach((line) => {
    const parts = line.split(" -> ");

    const first = parts[0].split(",").map(Number);
    const second = parts[1].split(",").map(Number);

    let x1 = first[0];
    let y1 = first[1];
    let x2 = second[0];
    let y2 = second[1];

    if (x1 === x2) {
      // Vertical line
      if (y1 > y2) {
        [y1, y2] = [y2, y1]; // Flip variables when y1 >
      }
      for (let index = y1; index <= y2; index++) {
        const current = area[x1][index];
        area[x1][index] = current + 1;
      }
    } else if (y1 === y2) {
      // Horizontal line
      if (x1 > x2) {
        [x1, x2] = [x2, x1]; // Flip variables when x1 >
      }
      for (let index = x1; index <= x2; index++) {
        const current = area[index][y1];
        area[index][y1] = current + 1;
      }
    } else if (part2) {
      // Diagonal
      let x = x1;
      let y = y1;
      const xIncrease = x1 < x2;
      const yIncrease = y1 < y2;

      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        const current = area[x][y];
        area[x][y] = current + 1;
        x += xIncrease ? 1 : -1;
        y += yIncrease ? 1 : -1;
      }
    }
  });

  const map = area
    .flat()
    .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  console.log(map);
  const entries = [...map.entries()];

  console.info(
    entries
      .filter((x) => x[0] > 1)
      .map((x) => x[1])
      .reduce((acc, curr) => acc + curr, 0)
  );
}
