import styled from "styled-components"

export const Title = styled.p`
margin: 0;
text-align: center;
font-size: 2.5rem;
font-weight: bold;
/* margin-top: 4rem; */
`

export const FieldsContainer = styled.div`
  display: flex;
  justify-content:flex-end;
  align-items: center;
  width: 90%;
  column-gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1300px) {
    width: 50rem;
  }
`;

export const CardContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 2rem;
align-items:center;
`