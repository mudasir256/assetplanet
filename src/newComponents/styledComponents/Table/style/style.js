import styled from "styled-components";

export const TableContainer = styled.div`
  position: absolute;
  display: inline-block;
  overflow: scroll;
  max-height: 500px;
  padding: 0;
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
export const TableData = styled.td`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #777699;
`;
