import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../global';
import theme from '../theme';

export const Selector = styled.ul`
  position: relative;

  height: 42px;
  border: 2px solid ${theme.colors.brown};
  border-radius: 5px;

  &.open {
    .to-select {
      visibility: visible;
      opacity: 1;
    }
  }

  .selected {
    padding: 0 10px;
    padding-bottom: 5px;
    height: 42px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
  }

  .to-select {
    position: absolute;
    top: 48px;
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
`;
