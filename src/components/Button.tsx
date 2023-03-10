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
  border: 0;
  background-color: #00e700;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  min-height: 50px;
  border-radius: 5px;
  font-size: 1rem;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.3;
    pointer-events: none;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    pointer-events: none;
  `}
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
