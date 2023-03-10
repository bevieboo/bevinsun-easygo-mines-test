import { useState } from 'react';
import styled from 'styled-components';
import { CasinoGameMines, minesBet, minesNext } from '../api/api';
import { Button } from './Button';
import { Tile } from './Tile';
import { ButtonAction } from '../enums/ButtonAction';
import { Gem, Mine } from '../assets';
import gemSound from '../assets/gem.mp3';
import mineSound from '../assets/mine.mp3';

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
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [revealedTiles, setRevealedTiles] = useState<number[]>([]);
  const [mines, setMines] = useState<number[]>([]);

  const gemAudio = new Audio(gemSound);
  const mineAudio = new Audio(mineSound);

  const endGame = (gameState: CasinoGameMines) => {
    setIsEnded(true);
    setRevealedTiles(gameState.revealedTiles);
    setMines(gameState.mines);
  };

  const handleClick = async () => {
    setIsButtonLoading(true);

    if (!isInProgress) {
      const gameState: CasinoGameMines = await minesBet();
      console.log(gameState);
      setIsInProgress(gameState.state === 'progress');
    }

    setIsButtonLoading(false);
  };

  const revealTile = async (index: number) => {
    if (isInProgress) {
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
  };

  const getTextForTile = (): string => {
    if (isInProgress && revealedTiles.length) {
      return ButtonAction.CashOut;
    }

    return ButtonAction.Bet;
  };

  return (
    <>
      <StyledGame>
        {new Array(ROWS * COLUMNS).fill(null).map((_: null, i: number) => (
          <Tile
            key={`tile-${i}`}
            onClick={() => revealTile(i)}
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
