import React, { useEffect, useRef } from 'react';
import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { TextStyle } from '@pixi/text';
import createPixiButton from './createPixiButton';

const GameBoard: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application({
      width: 1024,
      height: 1024,
    });

    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as unknown as Node);
    }

    const container = new Container();
    app.stage.addChild(container);

    const sprite = Sprite.from('/bg2.png');
    sprite.x = 0;
    sprite.y = 0;
    container.addChild(sprite);

    const btn1 = createPixiButton({
      x: 300,
      y: 650,
      text: 'Join the game',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
      onClick: () => {
        console.log('Join the game clicked');
      },
    });

    const btn2 = createPixiButton({
      x: 500,
      y: 650,
      text: 'Open the chest',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
      onClick: () => {
        console.log('Open the chest clicked');
      },
    });

    app.stage.addChild(btn1);
    app.stage.addChild(btn2);

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div className='relative w-full h-full flex items-center justify-center bg-gray-600'>
      <div className='absolute w-3/4 h-3/4' ref={pixiContainerRef}></div>
    </div>
  );
};

export default GameBoard;
