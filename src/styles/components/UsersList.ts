import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../global';
import theme from '../theme';

export const List = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);

  h2 {
    margin-bottom: 20px;
  }

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

        z-index: 1;

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

  .list {
    flex-grow: 1;
    margin: 30px 0;
    padding: 5px 15px;

    overflow-y: auto;
    overflow-x: visible;

    ${customScrollbar()}

    li {
      height: 70px;
      margin-bottom: 20px;
      padding: 10px;
      padding-right: 20px;

      display: flex;
      align-items: center;

      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      border-radius: 200px 20px 20px 200px;

      transition: box-shadow 0.2s ease-in-out;

      :hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      }

      figure {
        height: 50px;
        width: 50px;

        border-radius: 50%;
        overflow: hidden;

        ${flexCenter()}

        svg {
          margin-bottom: 4px;
        }
      }

      div {
        flex: 1;
        display: flex;

        h3 {
          margin-left: 20px;
        }

        button {
          background-color: transparent;
          border: none;

          :first-of-type {
            margin-left: auto;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .add-button {
    height: 40px;
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;

    background-color: ${theme.colors.brown};
    border: none;
    border-radius: 50px 0 0 50px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

    text-transform: uppercase;
    color: ${theme.colors.white};
    font-weight: bold;
    font-size: ${rem(15)};

    transition: all 0.2s;

    :hover {
      background-color: ${colorShade(theme.colors.brown, -10)};
    }
  }
`;
