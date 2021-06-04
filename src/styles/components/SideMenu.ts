import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  position: relative;

  width: 260px;
  height: 100vh;
  background-color: ${theme.colors.orange};

  overflow: hidden;

  h3 {
    position: absolute;
    right: -50px;
    font-size: ${rem(26)};

    transform: rotate(-90deg) translateX(calc(-50% - 5px));
  }

  img {
    position: absolute;
    height: 240px;
    width: unset;
    left: -130px;
    bottom: 130px;
    transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
`;

export const UserControls = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  height: 108px;
  width: 80px;
  padding: 10px;

  background-color: ${theme.colors.black};
  border-radius: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transition: all 0.2s ease-in-out;

  &.active {
    height: 200px;

    div {
      visibility: visible;
      opacity: 1;
    }
  }

  figure {
    height: 60px;
    width: 60px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  div {
    position: absolute;
    height: 60px;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;

    visibility: hidden;
    opacity: 0;

    transition: all 0.2s ease-in-out;
  }

  > svg {
    cursor: pointer;
  }
`;
