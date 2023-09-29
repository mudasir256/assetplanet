import styled from "styled-components"

export const StyledForm = styled.div`
    padding: 40px 0;

    & ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #a0a0a0;
    }

    & :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #a0a0a0;
        opacity:  1;
    }

    & ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #a0a0a0;
        opacity:  1;
    }

    & :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #a0a0a0;
    }

    * ::-ms-input-placeholder { /* Microsoft Edge */
        color: #a0a0a0;
    }

    & ::placeholder { /* Most modern browsers support this now. */
        color: #a0a0a0;
    }

    & form{
        padding: 40px 0;
    }

    & h2{
        color: #707070;
        border-bottom: 1px solid #c2c2c2;
        padding: 7px 0 17px 0;
        text-transform: capitalize;
        font-weight: 300;
    }

    & label{
        font-size: 18px;
        font-weight: 300;
        color: #707070;
    }

    & input {
        padding: 25px 30px;
        color: #707070;
        font-size: 16px;
    }

    & .ant-select-selection--single {
        height: 52px;
        padding: 0 16px;
        font-size: 16px;
        color: #a0a0a0;
    }

    & .ant-select-selection__rendered{
        line-height: 52px;
    }

    & .button-items{
        & a, 
        & button {
            min-width: 120px;
            text-transform: capitalize;
            min-height: 37.61px;
            line-height: 1.4;

            &:hover{
                opacity: 0.7;
            }

            &:not(:last-child){
                margin-right: 20px;
            }

            &.submit{
                margin: 20px 0;
            }
        }

        & .btn-gray,
        & .btn-gray:hover,
        & .btn-gray:focus {
            color: black;
            border-color: #B0B0B0;

            & .btn-gray.secondary {
                color: #B0B0B0;
                background-color: white;
            }
        }

        & .btn-blue,
        & .btn-blue:hover,
        & .btn-blue:focus {
            color: white;
            background-color: #293DA3;
            border-color: #293DA3;

            & .btn-blue.secondary {
                color: #293DA3;
                background-color: white;
            }
        }

        & .btn-green,
        & .btn-green:hover,
        & .btn-green:focus {
            color: white;
            background-color: #2B9E3B;
            border-color: #2B9E3B;

            & .btn-green.secondary{
                color: #2B9E3B;
                background-color: white;
            }
        }

        &.lg-btns a,
        &.lg-btns button{
            font-size: 18px;
            min-height: 52px;
        }
    }

    // from here
    & label{
        font-size: 18px;
        font-weight: 300;
        color: #707070;

        &.ant-radio-button-wrapper{
            height: 52px;
            line-height: 52px;
            width: 130px;
            text-align: center;
            border-radius: 4px;

            &:not(:last-child){
                margin-right: 12px;
            }
        }
    }

    & .input-with-icon{
        & .ant-input-prefix{
            left: 30px;
        }

        & svg{
            color: #707070;
            opacity: 0.47;
        }

        & .ant-input{
            padding-left: 70px;
        }
    

        & .ant-input-group
        &:hover {
            border-color: #40a9ff;
        }

        & .ant-input-group-addon{
            background-color: white;
            padding: 0 10px 0 30px;
        }


        & .ant-input-group,
        & .ant-input-group input{
            height: 52px;
        }
    }


    & .ant-select-selection-selected-value div{
        color: #c8c8c8;
    }

    // {
    //   xs: '480px',
    //   sm: '576px',
    //   md: '768px',
    //   lg: '992px',
    //   xl: '1200px',
    //   xxl: '1600px',
    // }

    @media only screen and (max-width: 769px) {
        & .button-items-wrap{
            justify-content: flex-start;
        }
    }

    @media only screen and (max-width: 576px) {
        & form{
            padding: 20px 0;
        }

        & input {
            padding: 20px 25px;
        }

        & .ant-select-selection--single {
            height: 52px;

            &.ant-select-selection__rendered{
                line-height: 52px;
            }
        }

        & .button-items{
            &.lg-btns a,
            &.lg-btns button{
                font-size: 18px;
                min-height: 42px;
            }
        }
    }
`;