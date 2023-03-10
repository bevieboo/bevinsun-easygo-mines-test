import { useState } from 'react';
import styled from 'styled-components';
import { CasinoGameMines, minesBet } from '../api/api';
import { Button } from './Button';
import { Tile } from './Tile';
import { ButtonAction } from '../enums/ButtonAction';

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
  const [revealedTiles, setRevealedTiles] = useState<number[]>([]);

  const handleClick = async () => {
    setIsButtonLoading(true);

    if (!isInProgress) {
      const gameState: CasinoGameMines = await minesBet();
      console.log(gameState);
      setIsInProgress(gameState.state === 'progress');
    }

    setIsButtonLoading(false);
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
          <Tile key={`tile-${i}`} />
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
