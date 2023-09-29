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

export const SubCard = styled.div`
  margin-top: 1rem;
  background: white;
  border-radius: 10px;
  border: 2px solid #f5f6f7;
  padding: 1rem;
`;
export const SubCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 5px;
  align-items: center;
`;

export const Title = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const Button = styled.button`
  font-size: 15px;
  font-weight: 600;
  font-family: Poppins;
  border: none;
  border-radius: 4.36px;
  background-color: #2a3da3;
  color: white;
  cursor: pointer;
  // padding-inline: 7px;
  padding: 5px 9px;
  height: 28px;
  width: 28px;
`;

export const FileHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 0px;
  border-top: 2px solid #f5f6f7;
`;

export const FileTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #6b7a99;
`;

export const HeaderCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
  padding: 8px;
  justify-content: space-around;
  border-radius: 8px;
  margin-top: 2rem;
  color: #b9a8a8;
`;
export const HeaderCardHeading = styled.div`
  width: 30%;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  font-family: "Poppins", sans-serif;
`;
export const HeaderCardHeadingB = styled.div`
  border-left: 1px solid #e8e8e8;
  width: 32%;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  font-family: "Poppins", sans-serif;
`;
export const AudioVideoCardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 1rem;
  color: #b9a8a8;
`;
export const AudioVideoCards = styled.div`
  width: 33%;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  font-family: "Poppins", sans-serif;
`;
export const RecordingButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  justify-content: space-between;
`;

export const RecordButton = styled.button`
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
export const StopButton = styled.button`
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
