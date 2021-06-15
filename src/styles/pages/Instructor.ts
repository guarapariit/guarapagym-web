import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../global';
import theme from '../theme';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
`;

export const ListsContainer = styled.div`
  flex-grow: 1;
  padding: 30px 40px;

  display: flex;
`;
