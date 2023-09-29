import styled from "styled-components";


export const MainContainer = styled.div`
width: 90%;
box-shadow:2px 4px 6px 4px #d3d3d3;
  border-radius: 0.5rem;
display: flex;

`


export const IndexConatiner = styled.div`
width: 10%;
background-image: linear-gradient(to top right,#39b54a,#0d723b);
color: white;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
font-size:3rem;
border-radius: 0.5rem;

`

export const ContentConatiner = styled.div`
width: 80%;
display: flex;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
row-gap: 1rem;
padding: 1.5rem 1rem;
column-gap: 0.2rem;

`

export const Item = styled.div`
display: flex;
justify-content: start;
align-items: center;
flex-basis: 28%;
font-size: 1rem;

`

export const ButtonsContainer = styled.div`
width: 10%;
display: flex;
justify-content: space-around;
align-items: center;

`