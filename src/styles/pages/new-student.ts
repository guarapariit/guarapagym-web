import styled from 'styled-components';
import { rem, flexCenter, colorShade } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const ListsContainer = styled.div`
  flex-grow: 1;
  padding: 30px 40px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
`;
