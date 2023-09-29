import styled from 'styled-components'

const PositionSpaceBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxShadow = `
  box-shadow: 0px 0px 15px 0px rgba(80,80,80,0.01);
`;

export const SearchAddClient = styled.div`
  ${PositionSpaceBetween}
  width: inherit;
  padding: 30px;

  & a, 
  & button  {
    min-width: 120px;
    text-transform: capitalize;
    min-height: 37.61px;
    line-height: 1;

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
`;


export const StyledComparePlans = styled.div`
  & .compared-plans{
    padding: 40px 0;
    border-radius: 8px;

    &.white-bg {
      background: white;
    }

    &.blue-bg {
      background: #EDF4FB;
    }

    & .ant-col{
      padding: 40px 0 !important;
    }

    & * {
      text-transform: capitalize;
    }

    & h1{
      font-weight: 900;
      margin-bottom: 40px;
      padding: 0 30px;
    }
  
    & > .ant-col {
      ${BoxShadow}
    }

    & .ant-col:first-child{
      background-color:white;
    }

    & .data-row{
      border-bottom: 1px solid #D0D0D0;
      display: inline-flex;
      width: 100%;
      & > div {
        flex: 1 1 50%;
        padding: 20px 0 20px 30px;
        line-height: 1;

        & div {
          height: 24px;
          line-height: 1;
        }
      }
    }

    & .subrow{
      border: unset;
      & > div {
        padding: 0;
      }
    }

    & .title-green,
    & .title-blue{
      & > div {
        padding: 7px 0 7px 30px;
      }
    }

    & .title-item {
      color: #505050;
      font-weight: 900;
      display: flex;
      align-items: center;
    }

    & .title-subitem {
      font-size: 12px;
      line-height: 1;
      margin-top: 2px;
      display: flex;
      align-items: center;

      &:nth-child(2) {
        margin-top: 12px;
      }
    }

    & .green,
    & .title-green > div {
      color: #85D2BE;
      font-weight: 900;
    }

    & .blue,
    & .title-blue > div{
      color: #1C85E8;
      font-weight: 900;
    }

    & .sm-text {
      font-size: 12px;
      margin-bottom: 7px;
      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  & .extra-space{
    height: 40px;
  }

  // {
  //   xs: '480px',
  //   sm: '576px',
  //   md: '768px',
  //   lg: '992px',
  //   xl: '1200px',
  //   xxl: '1600px',
  // }

  @media only screen and (max-width: 576px) {
    & .compared-plans{
      padding: 20px 0;
      
      & h1 {
        margin-bottom: 20px;
      }

      & .data-row{
        & > div {
          padding: 15px 0 15px 22px;
        }
      }

      & .title-green,
      & .title-blue{
        & > div {
          padding: 7px 0 7px 22px;
        }
      }

      & .subrow{
        & > div {
          padding: 0;
        }
      }
    }

  }
`;