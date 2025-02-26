export const dayFiveProblemOne = (data: string, result: number): number => {
  const inputLists = data.split('\r\n\r\n');
  const finalLists = [];
  const hashMap = new Map<string, string[]>();
  for (const input of inputLists) {
    const newList = input.split('\r\n');
    finalLists.push(newList);
  }
  finalLists[0] = finalLists[0].sort();
  for (const [i, input] of finalLists[0].entries()) {
    const splited = input.split('|');
    if (hashMap.get(splited[0])) {
      hashMap.get(splited[0])?.push(splited[1]);
    } else {
      hashMap.set(splited[0], [splited[1]]);
    }
  }
  for (const input of finalLists[1]) {
    const numbersList = input.split(',');
    let isCorrect = true;
    dance: for (const [index, toCheck] of numbersList.entries()) {
      for (let i = index + 1; i < numbersList.length; i++) {
        if (!hashMap.get(toCheck)?.includes(numbersList[i])) {
          isCorrect = false;
          break dance;
        }
      }
    }
    if (isCorrect) {
      const middleIndex = Math.floor(numbersList.length / 2);
      result += +numbersList[middleIndex];
    }
  }
  return result;
};

export const dayFiveProblemTwo = (data: string, result: number): number => {
  const inputLists = data.split('\r\n\r\n');
  const finalLists = [];
  const hashMap = new Map<string, string[]>();
  for (const input of inputLists) {
    const newList = input.split('\r\n');
    finalLists.push(newList);
  }
  finalLists[0] = finalLists[0].sort();
  for (const [i, input] of finalLists[0].entries()) {
    const splited = input.split('|');
    if (hashMap.get(splited[0])) {
      hashMap.get(splited[0])?.push(splited[1]);
    } else {
      hashMap.set(splited[0], [splited[1]]);
    }
  }
  for (const input of finalLists[1]) {
    let numbersList = input.split(',');
    let isCorrect = true;
    for (let index1 = 0; index1 < numbersList.length; index1++) {
      for (let index = 0; index < numbersList.length; index++) {
        let newPos = index;
        for (let i = index + 1; i < numbersList.length; i++) {
          let includesIndex = i;
          while (
            !hashMap
              .get(numbersList[newPos])
              ?.includes(numbersList[includesIndex]) &&
            includesIndex < numbersList.length
          ) {
            const toMove = numbersList[newPos];
            isCorrect = false;
            numbersList.splice(newPos, 1);
            numbersList = [
              ...numbersList.slice(0, includesIndex),
              toMove,
              ...numbersList.slice(includesIndex),
            ];

            newPos = includesIndex;
            includesIndex = newPos + 1;
          }
        }
      }
    }
    if (!isCorrect) {
      const middleIndex = Math.floor(numbersList.length / 2);
      result += +numbersList[middleIndex];
    }
  }
  return result;
};
