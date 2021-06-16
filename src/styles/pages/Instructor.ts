import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const ListsContainer = styled.div`
  flex-grow: 1;
  padding: 30px 40px;

  display: flex;
  flex-direction: column;

  .controls {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 32px;
    }

    a {
      display: flex;
      align-items: center;

      font-size: 24px;

      gap: 8px;
    }
  }
`;
