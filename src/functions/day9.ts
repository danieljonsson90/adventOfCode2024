export const day9ProblemOne = (data: string, result: number): number => {
  const list = processData(data);
  for (const [i, item] of list.entries()) {
    if (item === '.') {
      let last = list.pop() as string;
      while (last === '.') {
        last = list.pop() as string;
      }
      list[i] = last;
    }
  }
  for (const [i, item] of list.entries()) {
    if (item) {
      result += +item * i;
    }
  }
  return result;
};

function processData(data: string): string[] {
  const list = [];
  let id = 0;
  for (let i = 0; i < data.length; i++) {
    if (i % 2 !== 0) {
      for (let j = 0; j < +data[i]; j++) {
        list.push('.');
      }
      id += 1;
    } else {
      for (let j = 0; j < +data[i]; j++) {
        list.push(id.toString());
      }
    }
  }
  return list;
}
export const day9ProblemTwo = (data: string, result: number): number => {
  const list = processData(data);
  const listMap = new Map<string, string[]>();
  for (const item in list) {
    console.log(item);

    // if (item !== '.') {
    //   if (listMap.get(item)) {
    //     listMap.get(item)?.push(item);
    //   } else {
    //     listMap.set(item, [item]);
    //   }
    // } else {
    // }
  }

  return result;
};
