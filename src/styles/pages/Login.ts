import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  background: ${props => props.theme.colors.landingPageBackground};

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  > div {
    flex-grow: 1;
    background: ${props => props.theme.colors.orange};

    img {
      margin-top: ${rem(30)};
      height: ${rem(250)};
      width: unset;

      @media (max-width: 1024px) {
        width: 100%;
        height: auto;
      }
    }

    @media (max-width: 1024px) {
      flex-grow: unset;
      width: 100%;
    }
  }

  form {
    position: relative;
    width: ${rem(600)};
    padding: 0 ${rem(80)};

    background: ${theme.colors.white};

    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 1024px) {
      width: 100%;
      height: 100%;
      padding: 30px;
    }

    h1 {
      font-size: ${rem(40)};
      margin-bottom: ${rem(60)};
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: ${rem(30)};

      &.last {
        margin-bottom: ${rem(18)};
      }

      span {
        font-size: ${rem(14)};
        font-weight: 700;
        margin-bottom: 5px;
      }

      input {
        height: ${rem(56)};
        font-size: ${rem(16)};
        padding: 0 ${rem(14)};

        border-radius: 6px;
        border: 2px solid ${colorShade(theme.colors.black, 70)};
        background-color: ${theme.colors.white};

        transition: all 0.2s;

        :focus {
          border: 2px solid ${theme.colors.black};
        }

        &.invalid {
          border: 2px solid red;
        }
      }
    }

    .remember-me {
      display: flex;
      margin-left: ${rem(60)};
      margin-bottom: ${rem(60)};
      cursor: pointer;
      user-select: none;

      div {
        height: ${rem(20)};
        width: ${rem(20)};
        margin-right: ${rem(10)};

        border: 1px solid ${theme.colors.black};
        border-radius: 5px;

        ${flexCenter()}
      }

      span {
        font-size: ${rem(15)};
      }

      &.active {
        div {
          /* background-color: ${theme.colors.orange}; */
        }
      }
    }

    button {
      height: ${rem(60)};
      width: ${rem(320)};
      margin: 0 auto;

      background-color: ${theme.colors.black};
      border: none;
      border-radius: 14px;

      color: ${theme.colors.white};
      font-size: ${rem(22)};
      font-weight: bold;

      transition: all 0.2s;

      :hover,
      :focus {
        background-color: ${colorShade(theme.colors.black, 20)};
      }
    }

    .message {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);

      font-size: ${rem(18)};
      font-weight: 500;
      color: #cf0000;
    }
  }

  .copy-right {
    position: absolute;
    bottom: 10px;
    left: 10px;

    font-size: ${rem(13)};
    font-weight: 700;
    color: ${theme.colors.black};
  }
`;

interface TitleProps {
  color?: string;
  isRed: boolean;
}

export const Title = styled.strong<TitleProps>`
  color: ${props => (props.isRed ? 'red' : 'yellow')};
`;
