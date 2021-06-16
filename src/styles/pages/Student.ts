import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 92px;
  padding-top: 22px;
  padding-right: 20px;
  padding-bottom: 40px;

  > h1 {
    font-weight: 500;
    font-size: 64px;
    line-height: 75px;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-right: 40px;

    overflow-y: auto;

    ${customScrollbar}
  }
`;
