export const part1 = (input: string) => {
  const lines = input.split("\n");

  // for (const line in lines) {
  //   //if (Object.prototype.hasOwnProperty.call(object, key)) {
  //   //  const element = object[key];
  //   //}
  //   console.log(line);
  // }
  let depth = 0,
    horizontal = 0;

  lines.forEach((line) => {
    const x = line.split(" ");
    const direction = x[0];
    const number = +x[1];

    switch (direction) {
      case "forward":
        horizontal += number;
        break;
      case "down":
        depth += number;
        break;
      case "up":
        depth -= number;
        break;
      default:
        break;
    }
  });

  console.log(horizontal, depth);
  console.log(depth * horizontal);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  let depth = 0,
    horizontal = 0,
    aim = 0;

  lines.forEach((line) => {
    const x = line.split(" ");
    const direction = x[0];
    const number = +x[1];

    switch (direction) {
      case "forward":
        horizontal += number;
        depth += aim * number;
        break;
      case "down":
        //depth += number;
        aim += number;
        break;
      case "up":
        //depth -= number;
        aim -= number;
        break;
      default:
        break;
    }
  });

  console.log(horizontal, depth);
  console.log(depth * horizontal);
};
