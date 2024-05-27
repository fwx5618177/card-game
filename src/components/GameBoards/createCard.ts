import { Sprite } from '@pixi/sprite';
import { Application } from '@pixi/app';

interface CardOptions {
  app: Application;
  x: number;
  y: number;
  image: string;
  rotation: number;
}

const createCard = ({ app, x, y, image, rotation }: CardOptions) => {
  const card = Sprite.from(image);
  card.x = x;
  card.y = y;
  // 改变卡片大小
  card.scale.set(0.2);

  card.anchor.set(0.5);
  card.rotation = rotation;
  card.interactive = true;
  card.buttonMode = true;

  card.on('pointerover', () => {
    card.scale.set(0.4); // 放大
  });

  card.on('pointerout', () => {
    card.scale.set(0.2); // 恢复
  });

  app.stage.addChild(card);
  return card;
};

export default createCard;
