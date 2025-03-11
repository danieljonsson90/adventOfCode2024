export function day3ProblemOne(data: string, result: number): number {
  result = 0;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let lines = [...data.matchAll(regex)];
  for (const line of lines) {
    const res = line.filter((word) => word.length < 4);
    result += +res[0] * +res[1];
  }
  return result;
}

export const day3ProblemTwo = (data: string, result: number): number => {
  const lines = data.split("don't()");
  result = 0;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  for (const [i, line] of lines.entries()) {
    if (i === 0) {
      let firstLine = [...line.matchAll(regex)];
      for (const item of firstLine) {
        const res = item.filter((word) => word.length < 4);
        result += +res[0] * +res[1];
      }
    } else {
      const doMul = line.split('do()');
      for (const [i, d] of doMul.entries()) {
        if (i > 0) {
          let regexResult = [...d.matchAll(regex)];
          for (const item of regexResult) {
            const res = item.filter((word) => word.length < 4);
            result += +res[0] * +res[1];
          }
        }
      }
    }
  }
  return result;
};
