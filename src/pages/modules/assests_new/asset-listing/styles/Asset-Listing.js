import styled from "styled-components";
import colors from "../../../../../constants/style-constants/colors";



export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  row-gap: 1rem;
`;

export const MainCard = styled.div`
  // background-color: red;
  display: flex;
  height: fit-content;
  width: 10%;
  border-radius: 1rem;
  /* -webkit-box-shadow: 0 0 7px #c1c1c1; */
 
  box-shadow: 0 0 7px #c1c1c1;
  /*   flex : 1 2 auto */
  cursor: pointer;
  // width: fit-content;
  :hover {
    border: 2px solid #39b54a;
  }
`;

export const Rooms = styled.div`
  display: flex;
  width: 31%;
  flex-direction: column;
  row-gap: 1rem;

  @media (max-width: 2630px) {
    width: 40%;
  }
`;

export const RoomCardP = styled.p`
  font-size: 1.3vw;
  font-weight: bold;
  color: black;
  margin-bottom: 0;

  @media (min-width: 1400px) {
    font-size: 1rem;
  }
  @media (max-width: 2630px) {
    column-gap: 0rem;
    // padding-left: 0.5rem;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  row-gap: 1rem;
  border-bottom: 2px solid #d9d9d9;
`;

export const SubCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PropertyAdd = styled.div`
  display: "flex";
  justify-content: "space-between";
  width: "14rem";
`;

export const AddBtn = styled.div`
  display: flex;
  background-color: #39b54a;
  width: 2rem;
  height: 2rem;
  border-radius: 11px;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
`;

export const CardsMain = styled.div`
  width: 100%;
  justify-content: flex-start;
  /* display: flex; */
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  row-gap: 3.9rem;
  /* column-gap: 3.9rem; */
  column-gap: 0.5rem;
  overflow: hidden;
  overflow-x: auto;
  padding-bottom: 30px;
  margin-bottom: -20px;
  padding-left: 1rem;
  padding-right: 1rem;

`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  border-radius: 1rem;
  border: ${({ active }) => (active ? "2px solid " + colors.green : "none")};
  cursor: pointer;
  width: 20rem;
  height: auto;

  :hover {
    border: 2px solid #39b54a;
  }

  @media (max-width: 2630px) {
    //  height: 26rem;
    max-width: 25rem;
  }
  /* height: 25rem; */
  /* row-gap: 3rem; */
`;

export const CardsHead = styled.div``;

export const CardImg = styled.div`
  display: flex;
  align-items: center;
`;

export const CardDetails = styled.div`
  // for the two sections of image and details
  width: 100%;
  display: flex;
  margin: 10px;
  // justify-content: space-between;
  @media (max-width: 1250px) {
    /* flex-direction: ${(props) => (props.allowColumn ? "column" : "row")}; */
    flex-direction: column;
  }
`;

export const CardDetailsColumn = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
`;

export const CardItemsLarge = styled.div`
  // section for the item p large
  display: flex;
  flex-direction: column;
  flex-wrap: warp;
`;

export const CardItemsSmall = styled.div`
  // sections for items small
  display: flex;
  margin-top: auto;
  flex-wrap: warp;
`;

export const Img = styled.img`
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 100%;
  aspect-ratio: 1/1;

  @media (max-width: 2630px) {
    height: 100%;
    width: 100%;
  }
`;

export const PropertyCardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem 0 1rem;
`;

export const PropertyCardH3 = styled.h3`
  font-size: 1.4vw;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1300px) {
    font-size: 1.27rem;
  }
`;

export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1rem;
  padding: 0.5rem 0 0.5rem 1rem;
  @media (max-width: 2630px) {
    line-height: 1rem;
  }
`;

export const Counts1 = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 22rem;
  border-radius: 1rem;
  background-color: white;

  @media (max-width: 2630px) {
    width: 22rem;
  }
`;

export const Sign1 = styled.div`
  width: 15%;
  border: 1px solid rgb(57, 181, 74);
  padding: 0.5rem 0 0 -0.5rem;
  background-color: rgb(57, 181, 74);
  color: white;
  border-radius: 1rem;
  margin-left: 0.04rem;
  height: 2.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 2630px) {
    width: 18%;
  }
`;