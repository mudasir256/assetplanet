import styled from "styled-components";

export const MainContainer = styled.div`
  @media (max-width: 767px) {
    background-color: #f8f4f4;
    height: 100vh;
    width: 100vw;
  }
`;

export const Title = styled.p`
  margin: 0;
  margin-top: 4rem;
  margin-bottom: 4rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const SubContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const FaqContainer = styled.div`
  /* margin: 0 auto; */
  /* width: 80%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 6rem;
  row-gap: 4rem;
  padding: 0 8%;

  @media (max-width: 767px) {
    padding: 0 5%;
    column-gap: 0rem;
    row-gap: 2rem;
    padding-top: 5rem;
  }
`;

export const CardContainer = styled.div`
  /* border: 1px solid #39b54a; */
  /* box-shadow: rgb(0 0 0 / 10%) 0px 10px 99px; */
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 8px;
  border-radius: 0.5rem;
  /* width: 25rem; */
  flex: 0 0 33%;
  padding: 1rem;

  @media (max-width: 767px) {
    flex: 0 0 100%;
  }
`;

export const QuestionContainer = styled.div`
  color: #166838;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;
