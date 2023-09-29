import styled from "styled-components";

export const FormDiv = styled.div`
  display: flex;
  //   flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  padding: 3rem;
  row-gap: 1rem;
  transition: all 3s ease-in-out;
`;

export const SubFormDiv = styled.div`
  flex: 50%;
`;

export const InputBorder = styled.div`
  border-radius: 0.5rem;
  width: 90%;
  height: 3.5rem;
  display: flex;
  padding-left: 1rem;
  margin-top: 0.3rem;
  backgound-color: white;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const TabBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  border-radius: 7rem;
  background-color: ${(props) => (props.isActive ? "green" : "grey")};
  opacity: ${(props) => (props.isEnabled ? 0.7 : 0.2)};
  cursor: ${(props) => (props.isEnabled ? "pointer" : "not-allowed")};
`;
export const TabBoxNumber = styled.h1`
  color: white;
  font-weight: 500;
  margin-top: 12px;
`;
export const SpacerLine = styled.div`
  height: 3px;
  width: 100px;
  background-color: grey;
  margin: 2.5% 0;
`;
