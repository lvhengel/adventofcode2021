export const part1 = (input: string) => {
  const lines = input.split("\n");

  let count = 0;

  lines.forEach((line) => {
    const x = line.split(" | ");
    const outputs = x[1].split(" ");

    outputs.forEach((output) => {
      switch (output.length) {
        case 2: // No 1
        case 3: // No 7
        case 4: // No 4
        case 7: // No 8
          count++;
          break;

        default:
          break;
      }
    });
  });

  console.log("Part1: " + count);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  let sum = 0;

  lines.forEach((line) => {
    const x = line.split(" | ");
    const signals = x[0].split(" ");
    const outputs = x[1].split(" ");

    let outputvalue = "";
    const map = new Map();

    // first loop to get unique numbers
    signals.forEach((signal) => {
      switch (signal.length) {
        case 2: // No 1
          map.set(Array.from(signal).sort().join(""), "1");
          break;
        case 3: // No 7
          map.set(Array.from(signal).sort().join(""), "7");
          break;
        case 4: // No 4
          map.set(Array.from(signal).sort().join(""), "4");
          break;
        case 7: // No 8
          map.set(Array.from(signal).sort().join(""), "8");
          break;
        default:
          break;
      }
    });

    signals.forEach((signal) => {
      // 3 >>>  contains everything from 1
      // 2 >>>  1 from 1, 2 from 7, 2 from 4
      // 5 >>>  1 from 1, 2 from 7, 3 from 4
      if (signal.length === 5) {
        const test = Array.from(signal).sort().join("");
        const test1 = getvalue(map, "1") || "";
        const test4 = getvalue(map, "4") || "";
        const test7 = getvalue(map, "7") || "";

        if (checker(Array.from(signal), Array.from(test1))) {
          map.set(test, "3");
        }
        if (
          counter(Array.from(signal), Array.from(test1)) === 1 &&
          counter(Array.from(signal), Array.from(test4)) === 3 &&
          counter(Array.from(signal), Array.from(test7)) === 2
        ) {
          map.set(test, "5");
        }
        if (counter(Array.from(signal), Array.from(test4)) === 2) {
          map.set(test, "2");
        }
      }
      // 0 >>>  contains everything from 1
      // 6 >>>  1 from 1, 2 from 7, 3 from 4
      // 9 >>>  contains everything from 4 and 1 and 7
      if (signal.length === 6) {
        const test = Array.from(signal).sort().join("");
        const test1 = getvalue(map, "1") || "";
        const test4 = getvalue(map, "4") || "";
        const test7 = getvalue(map, "7") || "";

        if (
          checker(Array.from(signal), Array.from(test1)) &&
          checker(Array.from(signal), Array.from(test4)) &&
          checker(Array.from(signal), Array.from(test7))
        ) {
          map.set(test, "9");
        } else if (
          checker(Array.from(signal), Array.from(test1))
        ) {
          map.set(test, "0");
        }
        if (
          counter(Array.from(signal), Array.from(test1)) === 1 &&
          counter(Array.from(signal), Array.from(test7)) === 2 &&
          counter(Array.from(signal), Array.from(test4)) === 3
        ) {
          map.set(test, "6");
        }
      }
    });

    outputs.forEach((output) => {
      const sortedoutput = Array.from(output).sort().join("");
      outputvalue += map.get(sortedoutput);
    });

    console.log(outputvalue);
    sum += parseInt(outputvalue, 10);
  });
  console.log("Part2: " + sum);
};

const checker = (arr: string[], target: string[]) =>
  target.every((v) => arr.includes(v));

const counter = (arr: string[], target: string[]) => {
  let count = 0;
  target.forEach((x) => {
    count += arr.filter((y) => y === x).length;
  });
  return count;
};

function getvalue(map: Map<string, string>, searchValue: string) {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
}
