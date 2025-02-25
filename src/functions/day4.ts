export function dayFourProblemOne(data: string, result: number): number {
  let lines = data.match(/.{1,140}/g);
  if (lines) {
    for (const [index, line] of lines.entries()) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === 'X') {
          if (i + 3 < line.length) {
            if (line[i] + line[i + 1] + line[i + 2] + line[i + 3] === 'XMAS') {
              result++;
            }
          }
          if (i - 3 >= 0) {
            if (line[i - 3] + line[i - 2] + line[i - 1] + line[i] === 'SAMX') {
              result++;
            }
          }
          if (index + 3 < lines.length) {
            if (
              lines[index][i] +
                lines[index + 1][i] +
                lines[index + 2][i] +
                lines[index + 3][i] ===
              'XMAS'
            ) {
              result++;
            }
            if (i + 3 < line.length) {
              if (
                lines[index][i] +
                  lines[index + 1][i + 1] +
                  lines[index + 2][i + 2] +
                  lines[index + 3][i + 3] ===
                'XMAS'
              ) {
                result++;
              }
            }
            if (i - 3 >= 0) {
              if (
                lines[index][i] +
                  lines[index + 1][i - 1] +
                  lines[index + 2][i - 2] +
                  lines[index + 3][i - 3] ===
                'XMAS'
              ) {
                result++;
              }
            }
          }
          if (index - 3 >= 0) {
            if (
              lines[index - 3][i] +
                lines[index - 2][i] +
                lines[index - 1][i] +
                lines[index][i] ===
              'SAMX'
            ) {
              result++;
            }
            if (i + 3 < line.length) {
              if (
                lines[index - 3][i + 3] +
                  lines[index - 2][i + 2] +
                  lines[index - 1][i + 1] +
                  lines[index][i] ===
                'SAMX'
              ) {
                result++;
              }
            }
            if (i - 3 >= 0) {
              if (
                lines[index - 3][i - 3] +
                  lines[index - 2][i - 2] +
                  lines[index - 1][i + -1] +
                  lines[index][i] ===
                'SAMX'
              ) {
                result++;
              }
            }
          }
        }
      }
    }
  }
  return result;
}

export const dayFourProblemTwo = (data: string, result: number): number => {
  let lines = data.match(/.{1,140}/g);
  if (lines) {
    for (const [index, line] of lines.entries()) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === 'M' || line[i] === 'S') {
          if (index + 2 < lines.length) {
            if (i + 2 < line.length) {
              const word =
                lines[index][i] +
                lines[index + 1][i + 1] +
                lines[index + 2][i + 2];
              const word2 =
                lines[index][i + 2] +
                lines[index + 1][i + 1] +
                lines[index + 2][i];
              if (
                (word === 'MAS' || word === 'SAM') &&
                (word2 === 'MAS' || word2 === 'SAM')
              ) {
                result++;
              }
            }
          }
        }
      }
    }
  }
  return result;
};
