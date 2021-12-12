if (!Deno.args.length) {
  throw new Error("Please enter a day and input file as arguments!");
}

const day = Deno.args[0];
//const input = Deno.args[1];

//const currentDay = await import(`./day${day}/index.ts`);

// Deno.readTextFile needs path to file from where script is started
const input = await Deno.readTextFile(`./src/day${day}/${Deno.args[1]}`);

let file;
for await (const dirEntry of Deno.readDir(`./src/day${day}/`)) {
  if (dirEntry.isFile && dirEntry.name.endsWith(".ts")) {
    file = dirEntry.name;
  }
}

if (file) {
  const js = await import(`./day${day}/${file}`);
  js.part1(input);
  js.part2(input);
}

//console.log(dir);

//currentDay.part1(input);
//currentDay.part2(input);
