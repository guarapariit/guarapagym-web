import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const FormContainer = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 30px 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    width: 500px;

    row-gap: 20px;

    h1 {
      font-size: ${rem(32)};
      color: ${theme.colors.brown};
      margin-bottom: 28px;
    }

    h3 {
      font-size: ${rem(18)};
      color: ${theme.colors.brown};
      margin-bottom: 16px;
    }

    fieldset {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;

      border: none;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      row-gap: 5px;

      span {
        font-size: ${rem(16)};
        font-weight: 500;
        color: ${theme.colors.brown};
      }

      input {
        height: 38px;
        padding: 0 10px;
        border: 1px solid ${theme.colors.black};
        border-radius: 5px;
      }
    }

    button {
      width: 280px;
      height: 48px;
      margin: 0px auto;
      margin-top: 30px;

      color: ${theme.colors.white};
      font-size: ${rem(16)};
      font-weight: 500;

      background-color: ${theme.colors.brown};
      border: none;
      border-radius: 5px;

      transition: all 0.2s;

      :hover {
        background-color: ${colorShade(theme.colors.brown, -10)};
      }
    }
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

  .modal-container {
    height: 300px;
    width: 450px;

    background-color: ${theme.colors.white};
    padding: 20px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: ${rem(28)};
      font-weight: 500;
      margin-top: 20px;
      color: ${theme.colors.brown};

      margin-bottom: auto;
    }

    button {
      height: 40px;
      width: 160px;
      margin-bottom: 10px;

      border: none;
      border-radius: 5px;
      background-color: ${theme.colors.brown};
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

      color: ${theme.colors.white};
      font-size: ${rem(16)};
      font-weight: 600;

      transition: all 0.2s;

      :hover {
        background-color: ${colorShade(theme.colors.brown, -10)};
      }
    }

    span {
      font-size: ${rem(13)};
      color: ${theme.colors.brown};
    }
  }
`;
