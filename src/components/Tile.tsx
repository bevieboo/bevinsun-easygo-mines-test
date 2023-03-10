import styled from 'styled-components';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isRevealed: boolean;
  img: React.FC;
};

const StyledTile = styled.button<{
  isRevealed: boolean;
}>`
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

  ${({ isRevealed }) =>
    isRevealed &&
    `
    pointer-events: none;
  `}

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const Tile = ({ onClick, isRevealed, img: Image }: Props) => {
  return (
    <StyledTile onClick={onClick} isRevealed={isRevealed}>
      {isRevealed && <Image />}
    </StyledTile>
  );
};
