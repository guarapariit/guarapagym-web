import styled from 'styled-components';
import { rem, flexCenter, colorShade, customScrollbar } from '../../global';
import theme from '../../theme';

export const Card = styled.li`
  width: 100%;
  padding: 15px 10px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;

  :hover {
  }

  form {
    display: flex;

    fieldset {
      border: none;
      /* width: 100%; */
    }

    .input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 5px;
      }

      input {
        height: 42px;
        padding: 0 10px;

        border-radius: 5px;
        border: 2px solid ${theme.colors.brown};
        background-color: ${theme.colors.white};

        font-size: ${rem(16)};
        color: ${theme.colors.black};
      }
    }

    .inputs {
      flex-grow: 1;

      fieldset {
        width: 100%;
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
      }

      .name {
      }

      .category {
      }

      .video {
      }
    }

    .buttons {
      width: 80px;
      padding-top: 20px;
      margin-left: 20px;

      display: flex;
      justify-content: center;
      gap: 10px;
      align-items: center;

      button {
        height: 50px;
        width: 50px;

        background-color: ${theme.colors.brown};
        border: 2px solid ${theme.colors.brown};
        border-radius: 5px;

        transition: all 0.2s;

        svg {
          stroke: ${theme.colors.white};
          transition: all 0.2s;
        }

        :hover {
          background-color: ${colorShade(theme.colors.brown, 10)};
        }
      }
    }
  }
`;
