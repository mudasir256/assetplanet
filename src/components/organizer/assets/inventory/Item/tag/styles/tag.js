import styled from "styled-components";

export const Input = styled.input``;

export const InputBorder = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
`;
export const RoomInput = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  border-radius: 0.5rem;
`;
export const Btn = styled.button`
  border: none;
  width: 10rem;
  height: 2rem;
  border-radius: 0.6rem;
  color: white;
  background-color: #39b54a;
`;
export const MainBarSubContainer = styled.div`
  /* background-color: #fff; */
  border: ${({ border }) => border || "2px solid gray"};
  width: 45px;
  height: 45px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerCircle = styled.div`
  /* background-color: ${({ backgroundColor }) => backgroundColor || "gray"}; */
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #39b54a;
`;

export const Divider = styled.div`
  background-color: ${({ backgroundColor }) => "#39b54a" || "#39b54a"};
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  width: ${({ width }) => width || "130px"};
  height: 5px;
  @media (max-width: 600px) {
    display: none;
    transform: rotate(90deg);
  }
`;

export const VerticalDivider = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    height: 90px;
    width: 5px;

    background-color: ${({ backgroundColor }) => backgroundColor || "green"};
  }
`;

export const MainBarContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: #fff; */
  margin-bottom: 1rem;
  margin-left: 1.625rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 4rem;
  margin: 0 3rem 3rem 0;
  margin-bottom: auto;
  @media (max-width: 600px) {
    flex-direction: column;
    row-gap: 88px;
  }
`;

export const TagHeading = styled.p`
  margin-left: 60px;
  font-weight: bold;
  color: ${({ color }) => color || "gray"};
  font-size: 18px;
  @media (max-width: 600px) {
    margin-left: 20px;
    margin-bottom: 8px;
  }
`;
