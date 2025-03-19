export const day8ProblemOne = (data: string, result: number): number => {
  const lines = data.split('\r\n');
  const coordinateLines = lines.map((line) => line.split(''));

  const signalMap = createMap(coordinateLines);
  signalMap.forEach((signalList) => {
    for (const [index, coordinate] of signalList.entries()) {
      for (let i = index + 1; i < signalList.length; i++) {
        const compare = signalList[i];
        if (compare) {
          let yDiff = signalList[i].y - coordinate.y;
          let xDiff = signalList[i].x - coordinate.x;
          if (xDiff > 0) {
            result += checkCoordinate(
              coordinateLines,
              coordinate.y - yDiff,
              coordinate.x - xDiff
            );
            result += checkCoordinate(
              coordinateLines,
              compare.y + yDiff,
              compare.x + xDiff
            );
          } else {
            xDiff = Math.abs(xDiff);
            result += checkCoordinate(
              coordinateLines,
              coordinate.y - yDiff,
              coordinate.x + xDiff
            );
            result += checkCoordinate(
              coordinateLines,
              compare.y + yDiff,
              compare.x - xDiff
            );
          }
        }
      }
    }
  });

  return result;
};

export const day8ProblemTwo = (data: string, result: number): number => {
  const lines = data.split('\r\n');
  const coordinateLines = lines.map((line) => line.split(''));

  const signalMap = createMap(coordinateLines);
  signalMap.forEach((signalList) => {
    for (const [index, coordinate] of signalList.entries()) {
      for (let i = index + 1; i < signalList.length; i++) {
        const compare = signalList[i];
        if (compare) {
          let yDiff = signalList[i].y - coordinate.y;
          let xDiff = signalList[i].x - coordinate.x;

          if (xDiff > 0) {
            let y = coordinate.y - yDiff;
            let x = coordinate.x - xDiff;

            while (coordinateLines[y]?.[x]) {
              result += checkCoordinateInLine(coordinateLines, y, x);
              y = y - yDiff;
              x = x - xDiff;
            }
            y = compare.y - yDiff;
            x = compare.x - xDiff;
            while (coordinateLines[y]?.[x]) {
              result += checkCoordinateInLine(coordinateLines, y, x);
              y = y + yDiff;
              x = x + xDiff;
            }
          } else {
            xDiff = Math.abs(xDiff);
            let y = coordinate.y - yDiff;
            let x = coordinate.x + xDiff;
            while (coordinateLines[y]?.[x]) {
              result += checkCoordinateInLine(coordinateLines, y, x);
              y = y - yDiff;
              x = x + xDiff;
            }

            y = compare.y + yDiff;
            x = compare.x - xDiff;
            while (coordinateLines[y]?.[x]) {
              result += checkCoordinateInLine(coordinateLines, y, x);
              y = y + yDiff;
              x = x - xDiff;
            }
          }
        }
      }
    }
    if (signalList.length > 1) {
      result += signalList.length;
    }
  });
  return result;
};

function checkCoordinate(
  coordinateLines: string[][],
  y: number,
  x: number
): number {
  if (coordinateLines[y]?.[x]) {
    if (coordinateLines[y][x] !== '#') {
      coordinateLines[y][x] = '#';
      return 1;
    }
  }
  return 0;
}

function checkCoordinateInLine(
  coordinateLines: string[][],
  y: number,
  x: number
): number {
  if (coordinateLines[y]?.[x]) {
    if (coordinateLines[y][x] === '.') {
      coordinateLines[y][x] = '#';
      return 1;
    }
  }
  return 0;
}

function createMap(coordinateLines: string[][]) {
  const signalMap = new Map<string, { y: number; x: number }[]>();
  for (const [index, line] of coordinateLines.entries()) {
    for (const [i, coordinate] of line.entries())
      if (coordinate !== '.' && coordinate !== '#') {
        if (!signalMap.get(coordinate)) {
          signalMap.set(coordinate, [{ y: index, x: i }]);
        } else {
          signalMap.get(coordinate)?.push({ y: index, x: i });
        }
      }
  }
  return signalMap;
}
