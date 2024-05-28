import { Container } from '@pixi/display';
import { Text, TextStyle } from '@pixi/text';
import { Graphics } from '@pixi/graphics';
import { Application } from '@pixi/app';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Player1', score: 1000 },
  { rank: 2, name: 'Player2', score: 900 },
  { rank: 3, name: 'Player3', score: 800 },
  // 添加更多数据...
];

const createLeaderboard = (app: Application) => {
  const leaderboard = new Container();
  const background = new Graphics();

  background.beginFill(0x000000, 0.7);
  background.drawRoundedRect(100, 100, 600, 400, 10);
  background.endFill();
  leaderboard.addChild(background);

  const titleStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: ['#ffffff'],
  });

  const entryStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: ['#ffffff'],
  });

  const title = new Text('Leaderboard', titleStyle);
  title.x = 400;
  title.y = 120;
  title.anchor.set(0.5);
  leaderboard.addChild(title);

  leaderboardData.forEach((entry, index) => {
    const entryText = new Text(
      `${entry.rank}. ${entry.name} - ${entry.score}`,
      entryStyle,
    );
    entryText.x = 150;
    entryText.y = 180 + index * 30;
    leaderboard.addChild(entryText);
  });

  app.stage.addChild(leaderboard);

  return leaderboard;
};

export default createLeaderboard;
