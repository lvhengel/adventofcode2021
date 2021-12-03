if (!Deno.args.length) {
  throw new Error("Please enter a day and input file as arguments!");
}

const day = Deno.args[0];
const file = Deno.args[1];

const currentDay = await import(`./day${day}/index.ts`);

// Deno.readTextFile needs path to file from where script is started
const input = await Deno.readTextFile(`./src/day${day}/${file}`);

currentDay.part1(input);
currentDay.part2(input);
