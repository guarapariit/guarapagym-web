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

export const List = styled.div`
  flex-grow: 1;

  > div {
    display: flex;
    column-gap: 20px;

    > * {
      width: 100%;
    }

    .selector {
      position: relative;

      height: 48px;
      border: 2px solid ${theme.colors.brown};
      border-radius: 5px;

      &.open {
        .to-select {
          visibility: visible;
          opacity: 1;
        }
      }

      .selected {
        padding: 0 20px;
        padding-bottom: 5px;
        height: 48px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        cursor: pointer;
      }

      .to-select {
        position: absolute;
        top: 54px;
        width: 100%;
        padding: 10px;
        left: 0;

        visibility: hidden;
        opacity: 0;

        border-radius: 5px;
        background-color: ${theme.colors.white};
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);

        transition: all 0.2s;

        li {
          width: 100%;
          margin-bottom: 5px;

          cursor: pointer;

          :hover {
            text-decoration: underline;
          }

          ::last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }

    .search-container {
      position: relative;
      height: 48px;
      border: 2px solid ${theme.colors.brown};
      border-radius: 5px;

      display: flex;
      overflow: hidden;

      input {
        padding: 0 20px;
        height: 100%;
        width: calc(100% - 48px);

        border: none;
        background-color: ${theme.colors.white};

        font-size: ${rem(16)};
        color: ${theme.colors.black};
      }

      button {
        height: 45px;
        width: 48px;
        border: none;
        background-color: ${theme.colors.white};
      }
    }
  }
`;
