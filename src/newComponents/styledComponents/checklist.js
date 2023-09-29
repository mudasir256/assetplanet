import styled from "styled-components";
import { css } from "styled-components";

import myFontURL from "../../assets/fonts/Poppins-Regular.ttf";

export const fontFaces = css`
  @font-face {
    font-family: "Poppins";
    src: url(${myFontURL}) format("ttf");
  }
`;

export const MainHeading = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #030229;
`;

export const HeaderImg = styled.img`
  background: white;
  margin-right: 1rem;
  padding: 4px;
  border-radius: 4px;
`;
export const Title = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const ChecklistCard = styled.div`
  font-family: Poppins;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  margin-top: 2rem;
  color: #030229;
  background: white;
  border-radius: 10px;
  border: 2px solid #f5f6f7;
  padding: 1rem;
`;
export const ChecklistCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 5px;
  align-item: center;
`;
export const FileHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 0px;
  border-top: 2px solid #f5f6f7;
`;
export const FileHeaderYes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px 0px;
  border-bottom: 2px solid #f5f6f7;
`;

export const FileTitle = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const Lable = styled.label`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const WrapperButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  justify-content: space-between;
`;

export const SaveButton = styled.button`
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
export const CancelButton = styled.button`
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
