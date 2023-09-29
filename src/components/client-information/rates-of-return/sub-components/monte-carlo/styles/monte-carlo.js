import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  @media (max-width: 1300px) {
    width: 50rem;
  }
`;

export const ButtonsContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
