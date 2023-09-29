import styled from "styled-components";
import colors from "../../../../../constants/style-constants/colors";

export const Heading = styled.div`
  display: flex;
`;
export const Subheading = styled.div`
  display: flex;
  align-self: baseline;
  justify-content: center;
  border: 1px solid #39b54a;
  height: 3rem;
  width: 10rem;
  border-radius: 1rem;
  background-color: #39b54a;
  margin-top: 5px;
  display: flex;

  @media (max-width: 2630px) {
    width: 10rem;
    height: 3rem;
    font-size: 14px;
  }
`;
export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 6rem;
  border-radius: 1rem;
  margin-left: -0.5rem;
  background-color: white;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;

  @media (max-width: 2630px) {
    width: 7rem;
    height: 5rem;
  }
  /* padding-top: 1rem; */
`;
export const SubMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  row-gap: 1rem;
  border-bottom: 2px solid #d9d9d9;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  row-gap: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 28rem;
  padding-top: 0.8rem;
  @media (max-width: 1024) {
    min-width: 30%;
  }
  @media (max-width: 2630px) {
    width: 22rem;
    font-size: 16px;
  }
`;

export const Title = styled.div`
  width: 8rem;

  @media (max-width: 2630px) {
    width: 7rem;
    font-size: 16px;
  }
`;

export const Data = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  width: 17rem;
  padding-left: 1.5rem;
  height: 3.5rem;
  align-items: center;
  display: flex;
  border-radius: 1rem;
  // padding-top: 0.6rem;
  margin-top: -0.7rem;

  @media (max-width: 2630px) {
    width: 14rem;
    height: 3rem;
  }
`;

export const Text = styled.h3`
  font-family: Karla !important;
  font-weight: 500;
  margin: 8px 0 0 0;
  /* font-size: "22px"; */
  align-self: ${(props) => (props.alignCenter ? "center" : "start")} !important;
  @media (max-width: 2630px) {
    font-size: 19px;
    /* padding-right: 0.2rem; */
    display: flex;
    text-align: center;
  }
`;

export const Count = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 17rem;
  border-radius: 1rem;
  background-color: white;
  @media (max-width: 2630px) {
    width: 16.5rem;
  }
`;
export const Counts = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 19.5rem;
  border-radius: 1rem;
  background-color: white;

  @media (max-width: 2630px) {
    width: 20.5rem;
  }
`;

export const Sign = styled.div`
  width: 22%;
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

export const CardsHead = styled.div``;

export const PropertyAdd = styled.div`
  display: "flex";
  justify-content: "space-between";
  width: "11rem";
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

export const SubRoom = styled.div`
  display: flex;
  height: 7rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  border: ${({ active }) =>
    active ? "2px solid " + colors.black : colors.white};
  cursor: pointer;
  width: fit-content;
  :hover {
    border: 2px solid #39b54a;
  }
`;

export const CardsMain = styled.div`
  width: 100%;
  justify-content: flex-start;
  display: flex;
  column-gap: 3.9rem;
  overflow: hidden;
  overflow-x: auto;
  padding-bottom: 30px;
  margin-bottom: -20px;
  padding-left: 1rem;
  padding-right: 1rem;
  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
`;

export const Action = styled.div`
  display: flex;
  justify-content: "space-between";
  width: 7rem;
  // padding: 0 2rem 3.1rem 0;

  @media (max-width: 2630px) {
    // padding: 0 2rem 3.1rem 0;
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

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 3rem;
  // height: 4.5rem;
  height: fit-content;
  @media (max-width: 1024px) {
    justify-content: flex-start;

    // flex-direction: column;
    // background-color: red;
    justify-content: flex-start;
  }
  @media (max-width: 2630px) {
    padding-left: 0.5rem;
  }
`;

export const ItemsData = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 4.5rem;
  padding-top: 1rem;
  @media (max-width: 2630px) {
    column-gap: 1rem;
    padding-left: 0.5rem;
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

export const MainCard = styled.div`
  // background-color: red;
  display: flex;
  height: fit-content;
  width: 100%;
  border-radius: 1rem;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  border: ${({ active }) =>
    active ? "2px solid " + colors.black : colors.white};
  box-shadow: 0 0 7px #c1c1c1;
  /*   flex : 1 2 auto */
  cursor: pointer;
  // width: fit-content;
  :hover {
    border: 2px solid #39b54a;
  }
`;
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
export const Headingh4 = styled.h4`
  color: white;
  font-weight: bold;
  font-size: 18px;
  // padding-top: 8px;
  align-self: center;
`;
