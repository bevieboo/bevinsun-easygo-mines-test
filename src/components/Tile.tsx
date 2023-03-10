import styled from 'styled-components';
import { Spinner } from './Spinner';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isRevealed: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  img: React.FC;
};

const StyledTile = styled.button<{
  isRevealed: boolean;
  isDisabled: boolean;
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

  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.25;
  `}

  :hover {
    background-color: #557086;
    transform: translateY(-2px);
  }

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const Tile = ({
  onClick,
  isRevealed,
  isDisabled,
  isLoading,
  img: Image,
}: Props) => {
  return (
    <StyledTile
      onClick={onClick}
      isRevealed={isRevealed}
      isDisabled={isDisabled}
    >
      {isLoading && !isRevealed && <Spinner />}
      {isRevealed && <Image />}
    </StyledTile>
  );
};
