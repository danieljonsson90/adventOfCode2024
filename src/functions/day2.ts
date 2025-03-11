export function day2ProblemOne(data: string, result: number): number {
  const lines = data.split('\n');
  result = 0;
  for (const line of lines) {
    const numberList = line.replace('\r', '').split(' ');
    if (+numberList[0] > +numberList[1]) {
      if (decreasing(numberList)) {
        result++;
      }
    } else {
      if (increasing(numberList)) {
        result++;
      }
    }
  }
  return result;
}

export const day2ProblemTwo = (data: string, result: number): number => {
  const lines = data.split('\n');
  result = 0;
  for (const line of lines) {
    const numberList = line.replace('\r', '').split(' ');
    if (+numberList[0] > +numberList[1] && +numberList[1] > +numberList[2]) {
      if (decreasing(numberList, true)) {
        result++;
      }
    } else {
      if (increasing(numberList, true)) {
        result++;
      }
    }
  }
  return result;
};

function increasing(numberList: string[], dayTwo = false): boolean {
  let badLevels = 0;
  for (const [i, item] of numberList.entries()) {
    if (+item >= +numberList[i + 1] || +numberList[i + 1] - +item > 3) {
      badLevels++;
      if (badLevels > 1 || !dayTwo) {
        return false;
      }
    }
  }
  return true;
}

function decreasing(numberList: string[], dayTwo = false): boolean {
  let badLevels = 0;
  for (const [i, item] of numberList.entries()) {
    if (+item <= +numberList[i + 1] || +item - +numberList[i + 1] > 3) {
      badLevels++;
      if (badLevels > 1 || !dayTwo) {
        return false;
      }
    }
  }
  return true;
}
