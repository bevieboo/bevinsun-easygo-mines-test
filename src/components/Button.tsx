import styled from 'styled-components';
import { Spinner } from './Spinner';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  isDisabled: boolean;
  isLoading: boolean;
};

const StyledButton = styled.button<{ isDisabled: boolean; isLoading: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  background-color: ${({ isLoading }) => (isLoading ? '#00be4f' : '#00e760')};
  color: #172937;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  min-height: 50px;
  text-transform: uppercase;
  pointer-events: ${({ isDisabled, isLoading }) =>
    isDisabled || isLoading ? 'none' : 'auto'};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.3' : '1')};
  transition: 0.3s ease;

  :hover {
    background-color: #00be4f;
  }
`;

export const Button = ({ onClick, text, isDisabled, isLoading }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {isLoading ? <Spinner /> : text}
    </StyledButton>
  );
};
