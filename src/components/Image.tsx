import styled from 'styled-components';

type Props = {
  component: React.FC;
  isDisplayed: boolean;
};

const Fader = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: scale(${({ isOpen }) => (isOpen ? '1' : '0')});
  transition: 0.3s transform;
`;

export const Image = ({ component: Component, isDisplayed }: Props) => {
  return (
    <Fader isOpen={isDisplayed}>
      <Component />
    </Fader>
  );
};
