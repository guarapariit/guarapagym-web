import styled, { css } from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled.li<ContainerProps>`
  display: flex;
  width: 100%;
  cursor: pointer;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.brightGray};
  }

  > div {
    display: flex;
    flex: 1;
    width: 100%;
    padding: 16px 0;
    ${({ isOpen }) =>
      isOpen
        ? css`
            flex-direction: column;
          `
        : ''}

    ul {
    }
  }

  > svg {
    /* align-self: center; */
    color: ${({ theme }) => theme.colors.brightGray};
    margin-right: 20px;
    margin-top: 20px;
  }
`;

export const Date = styled.span`
  font-size: 36px;
  font-weight: 600;
  min-width: 300px;
  text-transform: capitalize;
`;

export const Type = styled.span`
  font-size: 36px;
  font-weight: bolder;
  min-width: 240px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brown};
`;

export const Category = styled.span`
  font-size: 36px;
  font-weight: 600;
  min-width: 300px;
  color: black;
`;

export const SequencyList = styled.ul`
  margin-left: 40px;
  list-style-type: none;

  div {
    display: flex;
  }
`;

export const SequencyListItem = styled.li`
  margin-left: 40px;
  display: flex;
  width: 100%;
  padding: 8px 0;
  font-size: 24px;

  div {
    display: flex;
    flex: 1;
    width: 100%;
    .index {
      min-width: 100px;
    }
    .sets {
      min-width: 150px;
    }
    .repetitions {
      min-width: 40px;
    }
    .exercise {
      color: ${({ theme }) => theme.colors.brown};
    }
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.brown};
    svg {
      margin: 0 8px;
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  & + & {
    border-top: 1px solid #b8b8b8;
  }
`;
