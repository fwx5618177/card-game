import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';

interface BlindBoxProps {
  x: number;
  y: number;
  onClick: (result: string) => void;
  boxImage: string;
  yesImage: string;
  noImage: string;
}

const createBlindBox = ({
  x,
  y,
  onClick,
  boxImage,
  yesImage,
  noImage,
}: BlindBoxProps) => {
  const box = new Container();
  box.x = x;
  box.y = y;

  const boxSprite = Sprite.from(boxImage);
  box.addChild(boxSprite);

  const yesSprite = Sprite.from(yesImage);
  yesSprite.anchor.set(0.5);
  yesSprite.x = boxSprite.width / 2 - 50;
  yesSprite.y = boxSprite.height / 2;
  yesSprite.visible = false;

  const noSprite = Sprite.from(noImage);
  noSprite.anchor.set(0.5);
  noSprite.x = boxSprite.width / 2 + 50;
  noSprite.y = boxSprite.height / 2;
  noSprite.visible = false;

  box.addChild(yesSprite);
  box.addChild(noSprite);

  const highlight = new Graphics();
  highlight.lineStyle(4, 0xffd700, 1);
  highlight.drawRoundedRect(
    -boxSprite.width / 2,
    -boxSprite.height / 2,
    boxSprite.width,
    boxSprite.height,
    10,
  );
  highlight.visible = false;
  box.addChild(highlight);

  box.interactive = true;
  box.buttonMode = true;

  box.on('pointerdown', () => {
    yesSprite.visible = true;
    noSprite.visible = true;
    box.interactive = false; // 禁用盲盒的点击
  });

  yesSprite.interactive = true;
  yesSprite.buttonMode = true;
  yesSprite.on('pointerdown', () => {
    noSprite.visible = false;
    highlight.x = yesSprite.x;
    highlight.y = yesSprite.y;
    highlight.visible = true;
    onClick('YES');
  });

  noSprite.interactive = true;
  noSprite.buttonMode = true;
  noSprite.on('pointerdown', () => {
    yesSprite.visible = false;
    highlight.x = noSprite.x;
    highlight.y = noSprite.y;
    highlight.visible = true;
    onClick('NO');
  });

  return box;
};

export default createBlindBox;
