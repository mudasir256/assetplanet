import styled from 'styled-components'

const PositionCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PositionLeftMiddle = `
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PositionSpaceBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxShadow = `
  box-shadow: 0px 0px 15px 0px rgba(80,80,80,0.01);
`;

export const SearchAddClientWrap = styled.section`
  ${BoxShadow}
  ${PositionCenter}
  background-color: #fff;
  width: 100%;
  margin: 25px 0;
`;

export const SearchAddClient = styled.div`
  ${PositionSpaceBetween}
  width: inherit;
  padding: 30px;

  & .header-btns-wrap{
    width: 100%;
    display: inline-flex;
    align-items: center;

    &.btns-left{
      justify-content: flex-start;
    }

    &.btns-right{
      justify-content: flex-end;
    }

    & a,
    & button {
      margin-top: 15px;
    }
  }

  

  & a, 
  & button  {
    min-width: 120px;
    text-transform: capitalize;
    height: 37.61px;
    line-height: 37.61px;

    &:hover{
      opacity: 0.7;
    }

    &:not(:last-child){
      margin-right: 20px;
    }
  }

  & .btn-gray,
  & .btn-gray:hover,
  & .btn-gray:focus {
    color: black;
    border-color: #B0B0B0;
  }

  & .btn-blue,
  & .btn-blue:hover,
  & .btn-blue:focus {
    color: #293DA3;
    border-color: #293DA3;
  }

  & .btn-green,
  & .btn-green:hover,
  & .btn-green:focus {
    color: #2B9E3B;
    border-color: #2B9E3B;
  }

  & .secondary{
    background-color: white;
  }

  @media only screen and (max-width: 575px) {
    & .header-btns-wrap,
    & .header-btns-wrap .list-and-compare{
      flex-direction: column !important;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`;

export const DropdownCompareGroup = styled.div`
  ${PositionSpaceBetween}
`

export const DropdownWrap = styled.div`
  & .ant-dropdown-link{
    padding: 7px 22px;
    background-color: #fafafa;
    color: #707070;
    border: 1px solid #70707038;
    border-radius: 4px;
    width: 200px;
    margin-right: 20px;
    ${PositionSpaceBetween}
  }
`;

export const DropdownLabel = styled.div`
  font-size: 14px;
  margin-bottom: 7px;
`;

export const MenuItemStyle = styled.div`
  font-size: 14px;
  color: #707070;
`;


export const StyledComponent = styled.div`
`;

export const PaginatedTable = styled.div`
  margin-bottom: 80px;
`;

export const TitlePagination = styled.div`
  ${PositionSpaceBetween}
`;

export const TLine = styled.div`
  height: 1px;
  background-color: #c2c2c2;
  width: 100%;
  margin: 7px 0 17px 0;
`;

export const TWrap = styled.div`
  min-height: 300px;
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  background-color: #f9f9f9;
`;

export const TRow = styled.tr`
  width: 100%;

  &.table-body-row:nth-child(odd) {
    background-color: #fff;
  }
`;

export const THead = styled.th`
  height: 20px;
  line-height: 1;
  padding: 25px 12px;


  &.sort-col:hover {
    cursor: pointer;
  }

  &.sort-col:hover {
    background-color: #e7e7e7;
  }
`;

export const TextIcon = styled.div`
  ${PositionLeftMiddle}
  & img{
    margin-left: 7px;
    cursor: pointer;
  }
`;

export const TCol = styled.td`
  height: 20px;
  line-height: 1;
  padding: 25px 12px;
`;

export const TTitle = styled.span`
  font-weight: 500;
  color: black;
  font-size: 14px;
  width: auto;
`;

export const TSortCaretArrow = styled.span`
  position: relative;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 18px;
  margin-left: 12px;
`;

export const TSortCaretArrowUp = styled.span`
  position: absolute;
  top: 0;
  display: inline-flex !important;
  cursor: pointer;
  & svg{
    height: 11px;
    width: auto;
    fill: #bfbfbf;
  }
  
`;

export const TSortCaretArrowDown = styled.span`
  position: absolute;
  bottom: 0;
  display: inline-flex !important;
  cursor: pointer;
  & svg{
    height: 11px;
    width: auto;
    fill: #bfbfbf;
  }
`;

export const TBody = styled.tbody`
  position: relative;
`;

export const SpinnerWrap = styled.div`
  position: absolute;
  top: 0;
  height: 300px;
  width: 100%;
  background: rgba(0, 0, 0, 0.05);

  & .ant-spin-spinning{
    height: 100%;
    width: 100%;
    ${PositionCenter}
  }
`;

export const PageTitle = styled.h3`
  color: #707070;
  font-weight: 500;
  line-height: 1;
`;

export const StyledPagination = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Pager = styled.span`
  margin: auto 5px;
  min-width: 116px;
  text-align: center;
`;

export const BtnWrap = styled.span`
  & button{
    height: 34px;
    width: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #808495 !important;
    color: #808495 !important;
    outline: none;
  }

  & button.active{
    background-color: #3fac4e !important;
    border: 1px solid #3fac4e !important;
    color: #fff !important;
  }
`;

export const Actions = styled.div`
  & a{
    & svg{
      fill: #4c4c4c;
    }
  }
  
  & a:not(:last-child){
    margin-right: 10px;
  }
`;