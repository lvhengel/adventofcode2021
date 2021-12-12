type Board = {
  value: number;
  marked: boolean;
}[][];

const size = 5;

export const part1 = (input: string) => {
  const lines = input.split("\n");
  const numbers = lines[0].split(",").map(Number);

  const boards = createBoard(lines);

  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    setMarked(element, boards);

    // Check Bingo
    const winnerBoards = checkBingo(boards);
    if (winnerBoards.length > 0) {
      console.log("Winning nummer: " + element);
      console.log("Winner board: " + winnerBoards);

      const unmarkedTotal = getUnmarkedTotal(boards[winnerBoards[0]]);
      console.log("Unmarked total: " + unmarkedTotal);

      console.log("Part 1: " + element * unmarkedTotal);
      break;
    }
  }
};

export const part2 = (input: string) => {
  const lines = input.split("\n");
  const numbers = lines[0].split(",").map(Number);

  const boards = createBoard(lines);

  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    setMarked(element, boards);

    // Check Bingo
    const winnerBoards = checkBingo(boards);

    if (winnerBoards.length > 0) {
      let count = 0;
      winnerBoards.forEach((x) => {
        if (boards[x] && boards.length === 1) {
          const unmarkedTotal = getUnmarkedTotal(boards[x]);
          console.log("Unmarked total: " + unmarkedTotal);
          console.log("Part 2: " + element * unmarkedTotal);
        }
        boards.splice(x - count, 1);
        count++;
      });

      if (boards.length === 0) {
        break;
      }
    }
  }
};

function createBoard(lines: string[]) {
  const boards: Board[] = [];

  for (let i = 2; i < lines.length - 1; i = i + 6) {
    const board: Board = [];
    for (let j = 0; j < size; j++) {
      const line = lines[i + j].trim().replaceAll("  ", " ").split(" ").map(
        (x) => {
          return {
            value: Number(x),
            marked: false,
          };
        },
      );
      board.push(line);
    }
    boards.push(board);
  }

  return boards;
}

function setMarked(value: number, boards: Board[]) {
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((element) => {
        if (element.value === value) {
          element.marked = true;
        }
      });
    });
  });
}

function checkBingo(boards: Board[]): number[] {
  const indices = [];

  for (let index = 0; index < boards.length; index++) {
    const board = boards[index];

    // Find winning row
    for (let x = 0; x < size; x++) {
      let count = 0;
      for (let y = 0; y < size; y++) {
        const element = board[x][y];
        if (element.marked) {
          count++;
        }
      }
      if (count === size) {
        indices.push(index);
        break;
      }
    }

    // Find winning column
    for (let x = 0; x < size; x++) {
      let count = 0;
      for (let y = 0; y < size; y++) {
        const element = board[y][x];
        if (element.marked) {
          count++;
        }
      }
      if (count === size) {
        if (!indices.includes(index)) {
          indices.push(index);
        }
        break;
      }
    }
  }
  return indices;
}

function getUnmarkedTotal(board: Board): number {
  const remainingNumber = board.map((row) => {
    return row.filter((element) => {
      return !element.marked;
    });
  });
  return remainingNumber.flat().map((x) => x.value).reduce(function (a, b) {
    return a + b;
  }, 0);
}
