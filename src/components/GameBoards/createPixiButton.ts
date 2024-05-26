import { Container } from '@pixi/display';
import { TextStyle, Text } from '@pixi/text';
import { Graphics } from '@pixi/graphics';
import { InteractionEvent } from '@pixi/interaction';

interface PixiButtonProps {
  x: number;
  y: number;
  text: string;
  style: TextStyle;
  onClick: () => void;
}

const createPixiButton = ({ x, y, text, style, onClick }: PixiButtonProps) => {
  const button = new Container();
  button.x = x;
  button.y = y;

  const graphics = new Graphics();
  graphics.beginFill(0x0000ff);
  graphics.drawRoundedRect(0, 0, 200, 50, 10);
  graphics.endFill();
  button.addChild(graphics);

  const buttonText = new Text(text, style);
  buttonText.anchor.set(0.5);
  buttonText.x = 100;
  buttonText.y = 25;
  button.addChild(buttonText);

  button.interactive = true;
  button.buttonMode = true;

  button.on('pointerover', () => {
    graphics.tint = 0xaaaaaa;
  });

  button.on('pointerout', () => {
    graphics.tint = 0xffffff;
  });

  button.on('pointerdown', onClick);
  button.on('click', onClick);

  return button;
};

export default createPixiButton;
