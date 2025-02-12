export function dayThreeProblemOne(data: string, result: number): number {
  result = 0;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let lines = [...data.matchAll(regex)];
  const filteredLines = [];
  for (const line of lines) {
    const res = line.filter((word) => word.length < 4);
    result += +res[0] * +res[1];
  }
  return result;
}

export const dayThreeProblemTwo = (data: string, result: number): number => {
  const lines = data.split('mol');
  result = 0;

  return result;
};
