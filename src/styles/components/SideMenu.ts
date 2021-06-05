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

    svg {
      cursor: pointer;

      transition: all 0.2s;

      :hover {
        stroke: ${colorShade(theme.colors.white, -100)};
      }
    }
  }

  > svg {
    cursor: pointer;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  background: rgba(35, 35, 35, 0.26);
  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  visibility: hidden;

  z-index: 1;
  transition: all 0.2s;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  form {
    position: relative;
    height: 400px;
    width: 400px;
    padding: 10px 20px;

    border-radius: 8px;
    background-color: ${theme.colors.white};

    display: flex;
    flex-direction: column;

    .close {
      position: absolute;
      top: -7px;
      right: -7px;
      padding-top: 3px;

      height: 30px;
      width: 30px;
      border-radius: 50%;

      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

      cursor: pointer;
    }

    .top {
      flex-grow: 1;
      display: grid;
      grid-template-columns: 4fr 1.5fr;

      h4 {
        font-size: ${rem(32)};
        font-weight: 500;
        color: ${theme.colors.brown};
        margin-bottom: 20px;
      }

      h5 {
        font-size: ${rem(18)};
        font-weight: 500;
        color: ${theme.colors.brown};
        margin-bottom: 15px;
      }

      .input-container {
        display: flex;
        flex-direction: column;

        span {
          font-size: ${rem(14)};
          color: ${theme.colors.brown};
          margin-bottom: 5px;
        }

        input {
          height: 40px;
          margin-bottom: 10px;
          padding: 0 10px;
          border: none;

          color: ${theme.colors.brown};
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        }
      }

      figure {
        height: 60px;
        width: 60px;
        margin: 10px 6px 0 0;
        margin-left: auto;
        background-color: ${theme.colors.brown};

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
      }
    }

    button {
      height: 48px;
      margin-bottom: 5px;

      border: none;
      border-radius: 5px;
      background-color: ${theme.colors.brown};
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

      color: ${theme.colors.white};
      font-size: ${rem(18)};

      transition: all 0.2s;

      :hover {
        background-color: ${colorShade(theme.colors.brown, -10)};
      }
    }
  }
`;
