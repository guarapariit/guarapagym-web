import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: ${props => props.theme.colors.landingPageBackground};

  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    padding-left: 80px;

    img {
      width: 500px;
    }

    span {
      margin-top: 80px;
      font-weight: 500;
      font-size: 54px;
    }

    strong {
      color: ${props => props.theme.colors.primary};
    }
  }
`;
