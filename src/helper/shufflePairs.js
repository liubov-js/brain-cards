export const shufflePairs = (pairsArr) => {
  for (let i = pairsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairsArr[i], pairsArr[j]] = [pairsArr[j], pairsArr[i]];
  }

  return pairsArr;
};
