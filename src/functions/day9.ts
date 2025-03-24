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

export const day9ProblemTwo = (data: string, result: number): number => {
  const list = processData(data);
  const fileMap = new Map<string, { numbers: string[]; position: number }>();
  let freeSpaces: { start: number; length: number }[] = [];
  for (const [i, item] of list.entries()) {
    if (item !== '.') {
      if (fileMap.get(item)) {
        fileMap.get(item)?.numbers.push(item);
      } else {
        fileMap.set(item, { numbers: [item], position: i });
      }
    }
  }

  let start = -1;
  for (const [i, item] of list.entries()) {
    if (item === '.') {
      if (start === -1) {
        start = i;
      }
    } else {
      if (start !== -1) {
        freeSpaces.push({ start: start, length: i - start });
        start = -1;
      }
    }
  }

  if (start !== -1) freeSpaces.push({ start, length: list.length - start });

  const sortedFiles = Array.from(fileMap.values()).sort(
    (a, b) => b.position - a.position
  );
  for (const [_, item] of sortedFiles.entries()) {
    for (const space of freeSpaces) {
      if (item.numbers.length <= space.length && item.position > space.start) {
        list.fill('.', item.position, item.position + item.numbers.length);
        list.fill(
          item.numbers[0],
          space.start,
          space.start + item.numbers.length
        );

        space.start += item.numbers.length;
        space.length -= item.numbers.length;
        break;
      }
    }
  }

  for (const [i, item] of list.entries()) {
    if (item !== '.') result += +item * i;
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
