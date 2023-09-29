import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  /* height: 35rem; */
  max-height: 33rem;
  position: relative;
  overflow: auto;
 
`;

export const StyledTable = styled.table`
  width: 100%;
  /* height: 100%; */

  border-collapse: collapse;
  table-layout: auto;
  overflow: auto;
  min-width: 20rem;
`;

export const TableHead = styled.thead`
  /* background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.green1}; */
  background-image: linear-gradient(to top right, #39b54a, #0d723b);

  color: ${({ theme, color }) => color || theme.colors.white};
  text-transform: uppercase;
  height: 3rem;
  max-height: 3rem;
`;

export const TableBody = styled.tbody`
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
`;

export const TR = styled.tr`
  /* border-bottom: 0.1rem solid; */
  /* border-bottom-color: ${({ theme }) => theme.colors.black}; */
  /* padding-left: 4rem; */
  font-size: 0.89rem;
`;
export const TH = styled.th`
  width: ${(style) => style.width};
  min-width: ${(style) => style.minWidth};
  /* padding: 0 1rem; */
  text-align: center;

  font-size: 0.89rem;
  height: 2rem;
  max-height: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  /* background-image: linear-gradient(to top right, #39b54a, #0d723b); */

 


`;

export const TD = styled.td`
  max-width: 10rem;
  height: 4rem;
  max-height: 4rem;
  overflow-wrap: break-word;
  text-align: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.md};

background-color: ${({backgroundColor})=> backgroundColor || "white"};
  & span {
    display: flex;
    column-gap: 2rem;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
`;
