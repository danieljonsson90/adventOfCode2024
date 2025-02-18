export function dayFourProblemOne(data: string, result: number): number {
  // const xms = data.split('SAMX');
  debugger;
  const regex = /SAMX/g;
  let lines = [...data.matchAll(regex)];
  result = lines.length;

  return result;
}

export const dayFourProblemTwo = (data: string, result: number): number => {
  const lines = data.split("don't()");
  result = 0;

  return result;
};
