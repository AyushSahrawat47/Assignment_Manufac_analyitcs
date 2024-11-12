const getYearData = (): string[] => {
  const startYear = 1950;
  const endYear = 2020;
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i.toString());
  }
  return years;
}

export default getYearData;