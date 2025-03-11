let numberOfUnuique = 0;
let nextDirection: string;
let posY = 0;
let posX = 0;
let startY = 0;
let startX = 0;
let coordinateSystem: string[][];
let stop = false;
let xLength = 0;
let lastCoordinates: string[] = [];
let currentCoordinates: string[] = [];

export const daySixProblemOne = (data: string, result: number): number => {
  walkTheLab(data);
  result = numberOfUnuique;
  return result;
};

function walkTheLab(data: string) {
  const inputLists = data.split('\r\n');
  coordinateSystem = inputLists.map((list) => list.split(''));

  dance: for (const [index, list] of inputLists.entries()) {
    for (let i = 0; i < list.length; i++) {
      if (coordinateSystem[index][i] === '^') {
        posY = index;
        posX = i;
        startY = index;
        startX = i;
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
}

function keepGoing() {
  let pos;
  if (nextDirection === '^') {
    pos = goUp();
  } else if (nextDirection === '>') {
    pos = goRight();
  } else if (nextDirection === 'v') {
    pos = goDown();
  } else {
    pos = goLeft();
  }
  nextDirection = newDirection(nextDirection);
  return pos;
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
    coordinateSystem[posY - 1][posX] = 'X';
    numberOfUnuique++;
  }
  return posString();
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
    coordinateSystem[posY + 1][posX] = 'X';
    numberOfUnuique++;
  }
  return posString();
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
    coordinateSystem[posY][posX - 1] = 'X';
    numberOfUnuique++;
  }
  return posString();
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
    coordinateSystem[posY][posX + 1] = 'X';
    stop = true;
  }
  return posString();
}

function posString() {
  return posY.toString() + posX.toString();
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
  walkTheLab(data);
  const inputLists = data.split('\r\n');
  for (const [index, list] of inputLists.entries()) {
    for (let i = 0; i < list.length; i++) {
      if (coordinateSystem[index][i] === 'X') {
        stop = false;
        coordinateSystem[index][i] = '#';
        result += checkforLoops();
        coordinateSystem[index][i] = 'X';
      }
    }
  }
  return result;
};

function checkforLoops(): number {
  nextDirection = '>';
  posX = startX;
  posY = startY;

  const pos = goUp();
  let turningPositions = 0;
  lastCoordinates[turningPositions] = pos;
  while (!stop) {
    const pos = keepGoing();
    turningPositions++;
    if (turningPositions <= 4 && lastCoordinates.length < 4) {
      lastCoordinates[turningPositions % 4] = pos;
    } else {
      currentCoordinates[turningPositions % xLength] = pos;
    }

    if (
      turningPositions === xLength - 1 &&
      currentCoordinates.length === xLength &&
      checkLists()
    ) {
      lastCoordinates = [];
      currentCoordinates = [];
      return 1;
    } else if (turningPositions === xLength) {
      turningPositions = 0;
    }
    if (currentCoordinates.length === xLength) {
      lastCoordinates = [];
      currentCoordinates = [];
    }
  }
  return 0;
}

function checkLists() {
  for (const current of currentCoordinates) {
    for (const last of lastCoordinates) {
      if (current !== last) {
        break;
      }
      return true;
    }
  }
  return false;
}
