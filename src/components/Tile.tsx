import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border: 0;
  border-radius: 5px;
  background-color: #2f4554;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 6px #203542;
  transition: ease-out 0.2s;
`;

export const Tile = () => {
  return <StyledTile />;
};
