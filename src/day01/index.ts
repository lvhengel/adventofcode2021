export const part1 = (input: string) => {
  const list = input.split("\n").map(Number);

  let count = 0;
  for (let index = 1; index < list.length; index++) {
    const element = list[index];
    if (element > list[index - 1]) {
      count++;
    }
  }
  console.log(count);
};

export const part2 = (input: string) => {
  const list = input.split("\n").map(Number);

  let count = 0;
  for (let index = 0; index < list.length; index++) {
    const first = list[index] + list[index + 1] + list[index + 2];
    const second = list[index + 1] + list[index + 2] + list[index + 3];

    console.log(first, second);

    if (second > first) {
      count++;
    }
  }
  console.log(count);
};
