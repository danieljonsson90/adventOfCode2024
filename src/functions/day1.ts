const handleData = (data: string): [number[], number[]] => {
  const listOne = [];
  const listTwo = [];
  const lines = data.split('\n');
  for (const line of lines) {
    const [item1, item2] = line.trim().split(/\s+/);
    if (item1 && item2) {
      listOne.push(+item1);
      listTwo.push(+item2);
    }
  }
  listOne.sort((a, b) => a - b);
  listTwo.sort((a, b) => a - b);
  return [listOne, listTwo];
};

export function day1ProblemOne(data: string, result: number): number {
  let [listOne, listTwo] = handleData(data);
  for (let i = 0; i < listOne.length; i++) {
    result += Math.abs(listOne[i] - listTwo[i]);
  }
  return result;
}

export const day1ProblemTwo = (data: string, result: number): number => {
  let numberOfTimesInList2 = 0;
  let [listOne, listTwo] = handleData(data);
  for (const item of listOne) {
    for (const item2 of listTwo) {
      if (item === item2) {
        numberOfTimesInList2++;
      }
    }
    if (numberOfTimesInList2 > 0) {
      result += item * numberOfTimesInList2;
      numberOfTimesInList2 = 0;
    }
  }
  return result;
};
