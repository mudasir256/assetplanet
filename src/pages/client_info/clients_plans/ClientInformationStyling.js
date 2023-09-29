import styled from 'styled-components'

const PositionCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
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

export const StyledCollapse = styled.div`
`;

export const StyledPanel = styled.div`
  margin-bottom: 40px;
`;

export const StyledPanelHead = styled.div`
  border-bottom: 1px solid #c2c2c2;
  margin: 7px 0 17px 0;
  cursor: pointer;

  & .ant-col:first-child{
    font-size: 21px;
    font-weight: 300;
    color: #707070;
    text-transform: capitalize;
  }

  & .ant-col:last-child{
    color: #707070;

    & svg{
      font-weight: 500;
    }
  }
`;


export const StyledPanelBody = styled.div`
  display: none;
  transition: all .3s ease-in-out;

  & .ant-row {
    &:nth-child(odd){
      background-color: white;
    }

    & .ant-col {
      padding: 20px 12px;
      text-transform: capitalize;
      
      &:first-child{
        color: #5F5F5F;
        font-weight:bold;
      }

      &:last-child{
        color: #5F5F5F;
      }
    }
  }
`;