import React, { useEffect, useRef } from 'react';
import { Application } from '@pixi/app';
import { Container, DisplayObject } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { TextStyle, Text } from '@pixi/text';
import createPixiButton from './createPixiButton';
import { calculateCardPositions } from './calculateCardPositions';
import createCard from './createCard';
import createLeaderboard from './createLeaderboard';
import { connectWallet, disconnectWallet } from './connectWallet';
import { mintNFT } from './mintNFT';
import createBlindBox from './createBlindBox';
import { evaluateResults } from './evaluateResults';

const GameBoard: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  let walletAddress: string | null = null;
  let walletBalance: string | null = null;
  let isConnected = false;
  let players = 0;
  const results: { playerId: number; result: 'YES' | 'NO' }[] = [];

  const handleMintNFT = async (app: Application) => {
    // 调用函数
    const success = await mintNFT();
    if (success) {
      players++;
      if (players <= 7) {
        if (window.location.href.includes('localhost'))
          handleButtonClick(app, 7);
        else handleButtonClick(app, players);
      }
    }
  };

  const handleButtonClick = (app: Application, player = 7) => {
    if (app) {
      const cardPositions = calculateCardPositions(512, 512, 300, player);
      cardPositions.forEach((pos, index) => {
        createCard({
          app,
          x: pos.x,
          y: pos.y,
          image: '/pure-cards-preview.png',
          rotation: pos.rotation,
        });

        const blindBox = createBlindBox({
          x: pos.x,
          y: pos.y,
          onClick: (result: string) => {
            results.push({
              playerId: index + 1,
              result: result as 'YES' | 'NO',
            });
            if (results.length === 7) {
              const winners = evaluateResults(results);
              displayWinners(app, winners);
            }
          },
          boxImage: '/map.png',
          yesImage: '/YES.png',
          noImage: '/NO.png',
        });
        app.stage.addChild(blindBox);
      });
    }
  };

  const displayWinners = (app: Application, winners: string[]) => {
    const resultText = new Text(
      `Winners: ${winners.join(', ')}`,
      new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
    );
    resultText.x = 512;
    resultText.y = 50;
    resultText.anchor.set(0.5);
    app.stage.addChild(resultText);
  };

  const handleConnectWallet = async (app: Application) => {
    try {
      const { address, balanceInEth } = await connectWallet();
      walletAddress = address;
      walletBalance = balanceInEth;
      isConnected = true;

      drawWalletInfo(app);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectWallet = (app: Application) => {
    disconnectWallet();
    walletAddress = null;
    walletBalance = null;
    isConnected = false;
    drawWalletInfo(app);
  };

  const drawWalletInfo = (app: Application) => {
    // 清除现有的文本
    app.stage.children.forEach(child => {
      if (child?.name === 'walletInfo') {
        app.stage.removeChild(child);
      }
    });

    if (walletAddress && walletBalance) {
      const walletInfo = new Text(
        `Address: ${walletAddress}\nBalance: ${walletBalance} ETH`,
        new TextStyle({
          fontFamily: 'Arial',
          fontSize: 18,
          fill: ['#ffffff'],
        }),
      );
      walletInfo.x = 20;
      walletInfo.y = 20;
      walletInfo.name = 'walletInfo';
      app.stage.addChild(walletInfo);
    }
  };

  useEffect(() => {
    const width = 1024;
    const height = 1024;
    let board: Container<DisplayObject>;

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
        handleMintNFT(app);
        app.stage.removeChild(btn1);
        app.stage.removeChild(btn2);
      },
      buttonImage: '/blue.png',
    });

    const btn3 = createPixiButton({
      x: width / 2 + 150,
      y: height / 2 + 150,
      text: 'Back',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'],
      }),
      onClick: () => {
        app.stage.removeChild(btn3);
        app.stage.addChild(btn1);
        app.stage.addChild(btn2);

        if (board) {
          app.stage.removeChild(board);
        }
      },
      buttonImage: '/gray.png',
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
        board = createLeaderboard(app, 300, 150);

        app.stage.removeChild(btn1);
        app.stage.removeChild(btn2);

        app.stage.addChild(btn3);
      },
      buttonImage: '/gray.png',
    });

    app.stage.addChild(btn1);
    app.stage.addChild(btn2);

    const connectButton = createPixiButton({
      x: width - 200,
      y: 30,
      text: 'Connect Wallet',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 18,
        fill: ['#ffffff'],
      }),
      onClick: () => handleConnectWallet(app),
      buttonImage: '/blue.png',
    });

    const disconnectButton = createPixiButton({
      x: width - 200,
      y: 100,
      text: 'Disconnect Wallet',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 18,
        fill: ['#ffffff'],
      }),
      onClick: () => handleDisconnectWallet(app),
      buttonImage: '/gray.png',
    });

    if (!isConnected) {
      app.stage.addChild(connectButton);
      app.stage.addChild(disconnectButton);
    }

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
