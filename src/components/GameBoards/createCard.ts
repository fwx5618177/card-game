import { Sprite } from '@pixi/sprite';
import { Application } from '@pixi/app';
import { Graphics } from '@pixi/graphics';
import { Texture } from '@pixi/core';

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

  const border = new Graphics();
  border.lineStyle(2, 0xffffff, 0); // 初始不显示边框
  border.drawRoundedRect(
    -card.width / 2,
    -card.height / 2,
    card.width,
    card.height,
    10,
  );
  card.addChild(border);

  card.on('pointerover', () => {
    card.scale.set(0.4); // 放大
  });

  card.on('pointerout', () => {
    card.scale.set(0.2); // 恢复
  });

  card.on('pointerdown', () => {
    // 边框加亮效果
    border.clear();
    border.lineStyle(4, 0xffd700, 1);
    border.drawRoundedRect(
      -card.width / 2,
      -card.height / 2,
      card.width,
      card.height,
      10,
    );

    // 翻转动画
    app.ticker.add(() => {
      if (card.scale.x > 0) {
        card.scale.x -= 0.1;
      } else {
        card.texture = Texture.from('/pure-cards-preview.png');
        app.ticker.addOnce(() => {
          card.scale.x = 0.1;
          app.ticker.add(() => {
            if (card.scale.x < 1) {
              card.scale.x += 0.1;
            } else {
              card.scale.x = 1;
            }
          });
        });
      }
    });
  });

  app.stage.addChild(card);
  return card;
};

export default createCard;
