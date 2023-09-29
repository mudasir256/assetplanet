import styled from "styled-components";


export const CardContainer = styled.div`
  /* box-shadow: rgb(0 0 0 / 10%) 0px 10px 99px; */
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 8px;
  border-radius: 0.5rem;
  height: 100%;
  flex: 0 0 33%;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.5s linear;



  @media (max-width: 767px) {
    flex: 0 0 100%;
    background-color: white;
  }
`;

export const QuestionContainer = styled.div`
  color: #166838;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 0.5rem; */
  transition: all 0.5s linear
`;
