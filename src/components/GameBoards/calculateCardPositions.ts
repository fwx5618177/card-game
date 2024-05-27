export const calculateCardPositions = (
  centerX: number,
  centerY: number,
  radius: number,
  numCards: number,
) => {
  const positions = [];
  const angleStep = (2 * Math.PI) / numCards;
  for (let i = 0; i < numCards; i++) {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.push({ x, y, rotation: angle + Math.PI / 2 });
  }
  return positions;
};
