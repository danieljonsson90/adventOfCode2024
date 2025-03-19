import { evaluate } from 'mathjs';

export const day7ProblemOne = (data: string, result: number): number => {
  const lines = data.split('\r\n');
  for (const line of lines) {
    let res = +line.split(': ', 1);
    let numbersMul = line.split(': ')[1].replaceAll(' ', ' * ');
    let numbersAdd = line.split(': ')[1].replaceAll(' ', ' + ');
    let ansMap = new Map<number, number[]>();
    let numbers = line.split(': ')[1].split(' ');
    const valMul = evaluate(numbersMul);
    const valAdd = evaluate(numbersAdd);
    if (valMul === res) {
      result += res;
      continue;
    } else if (valAdd === res) {
      result += res;
      continue;
    }
    for (const [index, num] of numbers.entries()) {
      if (index === 0) {
        ansMap.set(index, [+num + +numbers[index + 1]]);
        ansMap.get(index)?.push(+num * +numbers[index + 1]);
      } else if (index < numbers.length - 1) {
        const sumList = ansMap.get(index - 1) as number[];
        for (const sum of sumList) {
          if (ansMap.get(index)) {
            ansMap.get(index)?.push(sum + +numbers[index + 1]);
            ansMap.get(index)?.push(sum * +numbers[index + 1]);
          } else {
            ansMap.set(index, [sum + +numbers[index + 1]]);
            ansMap.get(index)?.push(sum * +numbers[index + 1]);
          }
        }
      } else if (index === numbers.length - 1) {
        const sumList = ansMap.get(index - 1) as number[];
        for (const sum of sumList) {
          if (sum === res) {
            result += res;
            break;
          }
        }
      }
    }
  }
  return result;
};

export const day7ProblemTwo = (data: string, result: number): number => {
  const lines = data.split('\r\n');
  for (const line of lines) {
    let res = +line.split(': ', 1);
    let ansMap = new Map<number, number[]>();
    let numbers = line.split(': ')[1].split(' ');
    for (const [index, num] of numbers.entries()) {
      if (index === 0) {
        ansMap.set(index, [+num + +numbers[index + 1]]);
        ansMap.get(index)?.push(+num * +numbers[index + 1]);
        ansMap.get(index)?.push(+(num + numbers[index + 1]));
      } else if (index < numbers.length - 1) {
        const sumList = ansMap.get(index - 1) as number[];
        for (const sum of sumList) {
          if (ansMap.get(index)) {
            ansMap.get(index)?.push(sum + +numbers[index + 1]);
            ansMap.get(index)?.push(sum * +numbers[index + 1]);
            ansMap.get(index)?.push(+(sum + numbers[index + 1]));
          } else {
            ansMap.set(index, [sum + +numbers[index + 1]]);
            ansMap.get(index)?.push(sum * +numbers[index + 1]);
            ansMap.get(index)?.push(+(sum + numbers[index + 1]));
          }
        }
      } else if (index === numbers.length - 1) {
        const sumList = ansMap.get(index - 1) as number[];
        for (const sum of sumList) {
          if (sum === res) {
            result += res;
            break;
          }
        }
      }
    }
  }
  return result;
};
