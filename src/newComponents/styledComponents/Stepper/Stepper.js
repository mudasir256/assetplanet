import styled from "styled-components";
import { css } from 'styled-components';
import myFontURL from "../../../assets/fonts/Poppins-Regular.ttf"

export const fontFaces = css`
  @font-face {
    font-family: 'Poppins';
    src: url(${myFontURL}) format('ttf');
  }
`;
export const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:2rem;
  width: 100%;
  /* overflow-x: auto; */
  @media (max-width: 1382px) {
    overflow-x: auto;
    width: 99%;
    /* padding: 4rem; */
  }
  @media (max-width: 1372px) {
    overflow-x: auto;
    width: 97%;
    /* padding: 4rem; */
  }
  @media (max-width: 1352px) {
    overflow-x: auto;
    width: 97%;
    /* padding: 4rem; */
  }
`;

// export const Scrollbartable = styled.div`
//   overflow-x: auto;
//   border-radius: 10px;
//   &::-webkit-scrollbar {
//     width: 10%;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: #39b54a;
//     border-radius: 0.1rem;
//   }
//   &::-webkit-scrollbar-track {
//     background-color: #d3d3d3;
//     border-radius: 0.1rem;
//   }
// `;

export const StepperContent = styled.div`
  width: 100%;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  justify-content: center;
`;

export const MainStepper = styled.div`
  display: flex;
  flex-direction: row;

  //   flex-direction: column;
  align-items: center;
  justify-content: center;
  //   width: 25%;
  height: fit-content;
  padding-top: 1rem; 
`;

export const StepperTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

export const StepperSteps = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;

  justify-content: center;

  //   justify-content: space-evenly;
  overflow-x: auto;
  width: 100%;
  /* @media (max-width: 1382px) {
    overflow-x: auto;
    width: 99%;
  }
  @media (max-width: 1372px) {
    overflow-x: auto;
    width: 97%;
  }
  @media (max-width: 1352px) {
    overflow-x: auto;
    width: 100%;
  } */
`;

export const Step = styled.button`
  padding: 10px;
  //   margin: 0 10px;
  background-color: #2a3da3;
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 5rem;
  font-size: 14px;
  line-height: 14.52px;
  font-weight: 400;
  //   font-family:Inter;
  text-align: center;
  border: 2px solid #2a3da3;
  border-radius: 50%;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  background-color: ${(props) =>
    props.activenumber < props.completedSteps ? "transparent" : "#2A3DA3"};

  //   background-color: ${(props) =>  props.active ? "#2A3DA3" : "transparent"};
  color: ${(props) =>
    props.activenumber < props.completedSteps ? "#9CA3AF" : "white"};

  //   color: ${(props) => (props.active ? "white" : "#9CA3AF")};
  border-color: ${(props) => (props.active ? "#2A3DA3" : "#D1D5DB")};
`;
export const StepLine = styled.div`
  padding: 1px;
  display: ${(props) => (props.steps === 12 ? "none" : "block")};
  background-color: ${(props) =>
    props.activenumber < props.completedSteps ? "#D1D5DB" : "#2A3DA3"};

  //   background-color: ${(props) => (props.active ? "#2A3DA3" : "#D1D5DB")};
  border-color: ${(props) => (props.active ? "#2A3DA3" : "#D1D5DB")};
  width: 2rem;
`;

export const StepperButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  justify-content: ${(props) => (props.activeStep===0 ? "end" : "space-between")};

`;

export const Button = styled.button`
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  line-height: 21px;
  font-family: Poppins;
  letter-spacing: 0.087rem;
  justify-content: center;
  text-align: center;
  display: flex;
  width: 250px;
  border: none;
  border-radius: 8px;

  background-color: ${(props) => (props.disabled ? "#D1D5DB" : "#2A3DA3")};
  color: white;
  //   display: ${(props) => (props.disabled ? "none" : "block")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
export const BackButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  line-height: 21px;
  font-family: Poppins;
  letter-spacing: 0.087rem;
  justify-content: center;
  text-align: center;
  display: flex;
  width: 250px;
  border-radius: 8px;
  border: ${(props) => (props.disabled ? "none" : "1px solid #2a3da3")};
  background-color: ${(props) => (props.disabled ? "#D1D5DB" : "transparent")};
  color: ${(props) => (props.disabled ? "white" : "#2a3da3")};
  //   display: ${(props) => (props.disabled ? "none" : "block")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
