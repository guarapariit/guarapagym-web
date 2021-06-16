import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  .container {
    height: 100%;
  }
`;

export const ListsContainer = styled.div`
  height: 100%;
  width: calc(100% - 260px);
  padding: 20px 50px;

  display: flex;
  flex-direction: column;

  .container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;

    .list-wrapper {
      margin-right: 20px;
    }
  }
`;
