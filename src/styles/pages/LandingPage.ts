import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: ${props => props.theme.colors.landingPageBackground};

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    max-height: 760px;
    max-width: 1600px;
    padding: 50px 80px;

    background-image: url('/assets/landing-page-veio.png');
    background-size: 1000px auto;
    background-repeat: no-repeat;
    background-position: center right;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 500px;
    }

    span {
      font-weight: 500;
      font-size: 74px;

      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      @media (max-height: 720px) {
        font-size: ${rem(50)};
      }
    }

    strong {
      /* color: ${props => props.theme.colors.primary}; */
    }

    a {
      position: absolute;
      right: 50px;
      bottom: 58px;
      height: ${rem(56)};
      width: ${rem(300)};
      padding: 0 20px 0 30px;

      border-radius: 10px;
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};
      text-decoration: none;
      font-size: ${rem(22)};
      font-weight: 700;

      ${flexCenter}
      justify-content: space-between;
      transition: all 0.2s ease-in-out;

      :hover {
        background-color: ${colorShade(theme.colors.black, 8)};
      }
    }
  }

  .copy-right {
    position: absolute;
    bottom: 10px;
    right: 10px;

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
