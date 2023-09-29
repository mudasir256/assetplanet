import styled from "styled-components";


export const HeaderConatiner = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.5rem 1rem;
border-bottom: 1px solid lightgray;
/* width: 65rem; */
`

export const MainContainer = styled.div`
 
`;

export const FieldsContainer = styled.div`
  display: flex;
 flex-wrap: wrap;
 justify-content: start;
 padding: 0 2rem;
 align-items: center;
 column-gap: 2rem;
  width: 100%;
  margin-bottom:2rem;
  max-height: 25rem;
  overflow-y: auto;

  @media (max-width: 1300px) {
    width: 100%
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
  margin-right: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid lightgray;
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
