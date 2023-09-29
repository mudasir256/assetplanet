import styled from "styled-components";
import colors from "../../../../../constants/style-constants/colors";

export const Heading = styled.div`
  display: flex;
`;
export const Subheading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #39b54a;
  height: 3rem;
  width: 13rem;
  border-radius: 1rem;
  background-color: #39b54a;
  align-self: center;

  @media (max-width: 1630px) {
    width: 10rem;
    height: 3rem;
    font-size: 14px;
  }
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
  /* justify-content: space-between; */
  padding-top: 2rem;
  column-gap: 1.8rem;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;
export const Container1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  column-gap: 0.8rem;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 28rem;
  padding-top: 0.8rem;

  @media (max-width: 1630px) {
    width: 22rem;
    font-size: 16px;
  }
`;

export const MainSubcontainer = styled.div`
  display: flex;
  /* width: 28rem; */
  padding-top: 0.8rem;

  @media (max-width: 1630px) {
    width: 22rem;
    font-size: 16px;
  }
`;

export const SubContainers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 19rem;
  padding-top: 0.8rem;
  @media (max-width: 1024) {
    /* min-width: 30%; */
  }
  @media (max-width: 1630px) {
    width: 18rem;
    font-size: 16px;
  }
`;

export const Title = styled.div`
  width: 11rem;

  @media (max-width: 1630px) {
    width: 7rem;
    font-size: 16px;
  }
  @media (max-width: 1440px) {
    width: 9rem;
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
  padding-top: 0.6rem;
  margin-top: -0.7rem;

  @media (max-width: 1630px) {
    width: 14rem;
    height: 3rem;
  }
`;
export const Datas = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  width: 8rem;
  padding-left: 1.5rem;
  height: 3.5rem;
  align-items: center;
  display: flex;
  border-radius: 1rem;
  padding-top: 0.6rem;
  margin-top: -0.7rem;

  @media (max-width: 1630px) {
    width: 9rem;
    height: 3rem;
  }
`;

export const Text = styled.h3`
  font-size: "22px";
  align-self: ${(props) => (props.alignCenter ? "center" : "start")};
  @media (max-width: 1630px) {
    font-size: 19px;
    /* padding-right: 0.2rem; */
    display: flex;
  }
`;

export const Count = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  border-radius: 1rem;
  background-color: white;
  @media (max-width: 1630px) {
    width: 12.8rem;
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

  @media (max-width: 1630px) {
    width: 20.5rem;
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

  @media (max-width: 1630px) {
    width: 22rem;
  }
`;
export const Count2 = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  border-radius: 1rem;
  margin-top: -15px;
  background-color: white;
  @media (max-width: 1630px) {
    width: 13.5rem;
  }
`;

export const MainCount = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 17rem;
  border-radius: 1rem;
  background-color: white;
  @media (max-width: 1630px) {
    width: 13.5rem;
  }
`;
export const MainSign1 = styled.div`
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
  @media (max-width: 1630px) {
    width: 18%;
  }
`;
export const Headingh4 = styled.h4`
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding-top: 8px;
  align-self: center;
`;

export const Sign = styled.div`
  width: 25%;
  border: 1px solid rgb(57, 181, 74);
  padding: 0.5rem 0 0 -0.5rem;
  background-color: rgb(57, 181, 74);
  color: white;
  border-radius: 1rem;
  margin-left: 0.04rem;
  height: 3.9rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1630px) {
    width: 37%;
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
  @media (max-width: 1630px) {
    width: 18%;
  }
`;

export const Image = styled.div`
  /* background-color: aqua;
@media (max-width: 1024px){
  width: 30rem;
} */
`;

export const Li = styled.div`
  display: flex;
  list-style: none;
  column-gap: 2rem;
  padding-top: 1rem;
  max-width: 30rem;
  overflow: hidden;
  overflow-x: scroll;
  /* justify-content: space-between; */
`;

export const Lefttmain = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  /* justify-content: space-between; */
`;

export const Rightmain = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;
export const SubRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: center; */
`;

export const Rightside = styled.div`
  display: flex;
  column-gap: 11rem;
`;

export const Rightside1 = styled.div`
  display: flex;
  column-gap: 11rem;
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
  display: "flex";
  justify-content: "space-between";
  width: "100%";
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
  display: "flex";
  flex-direction: "column";
  max-width: 22rem;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  border-radius: 1rem;
  border: ${({ active }) => (active ? "2px solid " + colors.green : "none")};

  cursor: pointer;

  :hover {
    border: 2px solid #39b54a;
  }

  @media (max-width: 1630px) {
    height: 28.1rem;
    max-width: 25rem;
  }
  @media (max-width: 1510px) {
    height: 28.1rem;
    max-width: 22rem;
  }

  /* height: 25rem; */
  /* row-gap: 3rem; */
`;
export const CardsMain = styled.div`
  width: "95%";
  display: "flex";
  justify-content: "space-between";
  column-gap: "3.9rem";
  overflow: "hidden";
  overflow-x: "auto";
  padding-bottom: 20;
  margin-bottom: -20;
  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
`;

export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1rem;
  padding: 0.5rem 0 0.5rem 1rem;
  @media (max-width: 1630px) {
    line-height: 1rem;
  }
`;

export const Img = styled.img`
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 15rem;

  @media (max-width: 1630px) {
    height: 13rem;
    width: 100%;
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

export const TagsContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;
  row-gap: 0.5rem;
`;

export const TagPill = styled.div`
  background-color: #39b54a;
  padding: 5px 12px;
  border-radius: 0.4rem;
  color: white;
  font-size: 0.8rem;
`;
