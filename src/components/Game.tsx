import React from 'react';
import styled from 'styled-components';
import { Tile } from './Tile';

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
  return (
    <>
      <StyledGame>
        {new Array(ROWS * COLUMNS).fill(null).map((_: null, i: number) => (
          <Tile />
        ))}
      </StyledGame>
    </>
  );
};

export default Game;
