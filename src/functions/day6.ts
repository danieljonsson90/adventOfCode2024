let numberOfUnuique = 0;
let nextDirection: string;
let posY = 0;
let posX = 0;
let coordinateSystem: string[][];
let stop = false;
let xLength = 0;

export const daySixProblemOne = (data: string, result: number): number => {
  const inputLists = data.split('\r\n');
  coordinateSystem = inputLists.map((list) => list.split(''));

  dance: for (const [index, list] of inputLists.entries()) {
    for (let i = 0; i < list.length; i++) {
      if (coordinateSystem[index][i] === '^') {
        posY = index;
        posX = i;
        break dance;
      }
    }
  }
  xLength = coordinateSystem[0].length;
  nextDirection = newDirection(coordinateSystem[posY][posX]);
  coordinateSystem[posY][posX] = 'X';
  numberOfUnuique++;

  goUp();
  while (!stop) {
    keepGoing();
  }
  result = numberOfUnuique;
  return result;
};

function keepGoing() {
  if (nextDirection === '^') {
    goUp();
  } else if (nextDirection === '>') {
    goRight();
  } else if (nextDirection === 'v') {
    goDown();
  } else {
    goLeft();
  }
  nextDirection = newDirection(nextDirection);
}

function goUp() {
  while (posY - 1 > 0 && coordinateSystem[posY - 1][posX] !== '#') {
    if (coordinateSystem[posY - 1][posX] === '.') {
      coordinateSystem[posY - 1][posX] = 'X';
      numberOfUnuique++;
    }
    posY -= 1;
  }
  if (posY - 1 === 0 && coordinateSystem[posY - 1][posX] !== '#') {
    stop = true;
    numberOfUnuique++;
  }
}

function goDown() {
  while (
    posY + 1 < coordinateSystem.length - 1 &&
    coordinateSystem[posY + 1][posX] !== '#'
  ) {
    if (coordinateSystem[posY + 1][posX] === '.') {
      coordinateSystem[posY + 1][posX] = 'X';
      numberOfUnuique++;
    }
    posY += 1;
  }
  if (
    posY + 1 === coordinateSystem.length - 1 &&
    coordinateSystem[posY + 1][posX] !== '#'
  ) {
    stop = true;
    numberOfUnuique++;
  }
}
function goLeft() {
  while (posX - 1 > 0 && coordinateSystem[posY][posX - 1] !== '#') {
    if (coordinateSystem[posY][posX - 1] === '.') {
      coordinateSystem[posY][posX - 1] = 'X';
      numberOfUnuique++;
    }
    posX -= 1;
  }

  if (posX - 1 === 0 && coordinateSystem[posY][posX - 1] !== '#') {
    stop = true;
    numberOfUnuique++;
  }
}
function goRight() {
  while (posX + 1 < xLength - 1 && coordinateSystem[posY][posX + 1] !== '#') {
    if (coordinateSystem[posY][posX + 1] === '.') {
      coordinateSystem[posY][posX + 1] = 'X';
      numberOfUnuique++;
    }
    posX += 1;
  }
  if (posX + 1 === xLength - 1 && coordinateSystem[posY][posX + 1] !== '#') {
    numberOfUnuique++;
    stop = true;
  }
}

function newDirection(dir: string): string {
  let newDir: string;
  if (dir === '^') {
    newDir = '>';
  } else if (dir === '>') {
    newDir = 'v';
  } else if (dir === 'v') {
    newDir = '<';
  } else {
    newDir = '^';
  }
  return newDir;
}

export const daySixProblemTwo = (data: string, result: number): number => {
  return result;
};
