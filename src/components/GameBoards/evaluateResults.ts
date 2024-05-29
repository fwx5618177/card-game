interface PlayerResult {
  playerId: number;
  result: 'YES' | 'NO';
}

export const evaluateResults = (results: PlayerResult[]): string[] => {
  const yesCount = results.filter(result => result.result === 'YES').length;
  const noCount = results.filter(result => result.result === 'NO').length;

  const winningResult = yesCount < noCount ? 'YES' : 'NO';
  const winners = results
    .filter(result => result.result === winningResult)
    .map(result => `Player${result.playerId}`);

  return winners;
};
