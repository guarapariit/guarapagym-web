import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../../global';
import theme from '../../theme';

export const List = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 20px;
  }

  > ul {
    padding: 10px 10px;
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(100vh - 200px);

    ${customScrollbar}

    li {
      margin-bottom: 20px;
    }
  }

  .add-exercise {
    height: 42px;
    background-color: ${theme.colors.brown};
    border: none;
    border-radius: 5px;

    color: ${theme.colors.white};

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    gap: 10px;
  }
`;
