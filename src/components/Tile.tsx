import styled from 'styled-components';
import { Spinner } from './Spinner';
import { Image } from './Image';

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
  pointer-events: ${({ isDisabled, isRevealed }) =>
    isDisabled || isRevealed ? 'none' : 'auto'};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.25' : '1')};

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
  img,
}: Props) => {
  return (
    <StyledTile
      onClick={onClick}
      isRevealed={isRevealed}
      isDisabled={isDisabled}
    >
      {isLoading && !isRevealed && <Spinner />}
      <Image isDisplayed={isRevealed} component={img} />
    </StyledTile>
  );
};
