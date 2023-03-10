import { useState } from 'react';
import styled from 'styled-components';
import { CasinoGameMines, minesBet, minesCashout, minesNext } from '../api/api';
import { Button } from './Button';
import { Tile } from './Tile';
import { GameAction } from '../enums/GameAction';
import { Gem, Mine } from '../assets';
import gemSound from '../assets/gem.mp3';
import mineSound from '../assets/mine.mp3';
import startSound from '../assets/start.mp3';

// Grid
const ROWS = 5;
const COLUMNS = 5;

const StyledGame = styled.div`
  display: grid;
  grid-gap: 15px 10px;
  grid-template-columns: repeat(${COLUMNS}, minmax(auto, 80px));
  justify-content: center;
  align-self: center;
  margin-bottom: 30px;
`;

const Game = () => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isTileLoading, setIsTileLoading] = useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [revealedTiles, setRevealedTiles] = useState<number[]>([]);
  const [mines, setMines] = useState<number[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const gemAudio = new Audio(gemSound);
  const mineAudio = new Audio(mineSound);
  const startAudio = new Audio(startSound);

  const resetGame = () => {
    setIsInProgress(false);
    setIsEnded(false);
    setRevealedTiles([]);
    setMines([]);
  };

  const endGame = (gameState: CasinoGameMines) => {
    setIsEnded(true);
    setRevealedTiles(gameState.revealedTiles);
    setMines(gameState.mines);
    setSelectedTile(null);
  };

  const handleClick = async () => {
    setIsButtonLoading(true);

    if (!isInProgress) {
      const gameState: CasinoGameMines = await minesBet();
      console.log(gameState);
      setIsInProgress(gameState.state === 'progress');
      startAudio.play();
    }

    if (isInProgress && revealedTiles.length) {
      if (isEnded) {
        resetGame();
      } else {
        const gameState: CasinoGameMines = await minesCashout();
        endGame(gameState);
        startAudio.play();
      }
    }

    setIsButtonLoading(false);
  };

  const revealTile = async (index: number) => {
    setIsTileLoading(true);

    if (isInProgress && !isTileLoading) {
      setSelectedTile(index);
      const gameState: CasinoGameMines = await minesNext(index);
      console.log(gameState);

      if (gameState.state === 'progress') {
        gemAudio.play();
        setRevealedTiles([...gameState.revealedTiles]); // making a shallow copy here - because the state in the api is mutating, it is causing React render bugs.
      }

      if (gameState.state === 'busted') {
        mineAudio.play();
        endGame(gameState);
      }
    }

    setIsTileLoading(false);
  };

  const getTextForTile = (): string => {
    if (isEnded) {
      return GameAction.PlayAgain;
    }

    if (isInProgress && revealedTiles.length) {
      return GameAction.CashOut;
    }

    return GameAction.Bet;
  };

  return (
    <>
      <StyledGame>
        {new Array(ROWS * COLUMNS).fill(null).map((_: null, i: number) => (
          <Tile
            key={`tile-${i}`}
            onClick={() => revealTile(i)}
            isLoading={selectedTile === i}
            isDisabled={
              !isInProgress || (isEnded && !revealedTiles.includes(i))
            }
            isRevealed={isEnded || revealedTiles.includes(i)}
            img={mines.includes(i) ? Mine : Gem}
          />
        ))}
      </StyledGame>
      <Button
        onClick={handleClick}
        isLoading={isButtonLoading}
        isDisabled={isInProgress && !revealedTiles.length}
        text={getTextForTile()}
      />
    </>
  );
};

export default Game;
