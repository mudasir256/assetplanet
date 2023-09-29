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
  font-family: Poppins;
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

export const HealthCard = styled.div`
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
export const HealthCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 5px;
  align-item: center;
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
export const Button = styled.label`
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
  font-family: Poppins;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const Table = styled.table`
  width: 100%;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4d5e80;
`;
export const TableRow = styled.tr`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 0px;
  border-top: 2px solid #f5f6f7;
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
export const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const FileLabel = styled.label`
  display: flex;
  //   background-color: #2a3da3;
  //   color: white;
  font-weight: 600;
  font-size: 14px;
  //   padding: 0.5rem;
  font-family: Poppins;
  border-radius: 5px;
  cursor: pointer;
  text-align: "center";
`;
export const FileBlock = styled.div`
  border: 1px solid #d1d5db;
  width: 80%;
  height: 2.5rem;
  border-radius: 5px;
  color: #d1d5db;
  display: flex;
  align-items: center;
  text-align: "center";
  justify-content: space-around;
`;
export const FileBlockButton = styled.span`
  border: 1px solid #d1d5db;
  width: 20%;
  height: 2rem;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  background-color: #2a3da3;
  height: 2.5rem;
  align-items: center;
  text-align: center;
  padding-top: 10px;
`;
export const SELECT = styled.select`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 8px;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  color: #d1d5db;
`;
export const radioGroup = styled.div`
  color: #777699;
  margin-bottom: 8px;
`;
export const SearchInput = styled.input`
  color: #777699;
  border: none;
  background: transparent;
  border-radius: 5px;
  width: 12rem;
  margin-left: 8px;
  padding: 4px;
//   &:active {
//     border: none;
//   }
  &:focus {
    border: none;
  }
  &:focus {
    border: 1px solid green;
  }
`;
