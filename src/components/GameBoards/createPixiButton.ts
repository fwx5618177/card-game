import { Container } from '@pixi/display';
import { TextStyle, Text } from '@pixi/text';
import { Sprite } from '@pixi/sprite';
import '@pixi/interaction';
import '@pixi/events';

interface PixiButtonProps {
  x: number;
  y: number;
  text: string;
  style: TextStyle;
  onClick: () => void;
  buttonImage: string;
}

const createPixiButton = ({
  x,
  y,
  text,
  style,
  onClick,
  buttonImage,
}: PixiButtonProps) => {
  const button = new Container();
  button.x = x;
  button.y = y;

  const buttonSprite = Sprite.from(buttonImage);
  buttonSprite.anchor.set(0.5);
  buttonSprite.scale.set(1.8);
  button.addChild(buttonSprite);

  const buttonText = new Text(text, style);
  buttonText.anchor.set(0.5);
  buttonText.x = buttonSprite.width / 2;
  buttonText.y = buttonSprite.height / 2;
  button.addChild(buttonText);

  button.interactive = true;
  button.buttonMode = true;

  button.on('pointerover', () => {
    buttonSprite.tint = 0xaaaaaa; // 改变按钮颜色
    buttonText.style = new TextStyle({
      ...style,
      fontSize: style.fontSize ? Number(style.fontSize) + 2 : 26, // 增大字体
    });
  });

  button.on('pointerout', () => {
    buttonSprite.tint = 0xffffff; // 恢复按钮颜色
    buttonText.style = style; // 恢复字体大小
  });

  button.on('pointerdown', onClick);
  button.on('click', onClick);

  return button;
};

export default createPixiButton;
