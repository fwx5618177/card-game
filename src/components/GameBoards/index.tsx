import React, { useEffect, useRef } from 'react';
import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { TextStyle } from '@pixi/text';
import createPixiButton from './createPixiButton';
import { calculateCardPositions } from './calculateCardPositions';
import createCard from './createCard';

// import { useAccount, useConnect, useDisconnect } from 'wagmi';
import createLeaderboard from './createLeaderboard';

const GameBoard: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  //   const { address, isConnected } = useAccount();
  //   const { connect } = useConnect();
  //   const { disconnect } = useDisconnect();

  const handleButtonClick = (app: Application) => {
    if (app) {
      const cardPositions = calculateCardPositions(512, 512, 300, 7);
      cardPositions.forEach(pos => {
        createCard({
          app,
          x: pos.x,
          y: pos.y,
          image: '/pure-cards-preview.png',
          rotation: pos.rotation,
        });
      });
    }
  };

  const handleShowLeaderboardClick = (app: Application) => {
    createLeaderboard(app, 300, 150);
    // if (isConnected) {
    // }
    // else {
    //   connect({});
    // }
  };

  useEffect(() => {
    const width = 1024;
    const height = 1024;

    const app = new Application({
      width,
      height,
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
      x: width / 2 - 150,
      y: height / 2,
      text: 'Join the game',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
      onClick: () => {
        handleButtonClick(app);
        app.stage.removeChild(btn1);
        app.stage.removeChild(btn2);
      },
      buttonImage: '/blue.png',
    });

    const btn2 = createPixiButton({
      x: width / 2 + 150,
      y: height / 2,
      text: 'Open the chest',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
      onClick: () => {
        handleShowLeaderboardClick(app);

        app.stage.removeChild(btn1);
        app.stage.removeChild(btn2);
      },
      buttonImage: '/gray.png',
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
