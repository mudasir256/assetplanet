import styled from 'styled-components'

 export const StyledModal = styled.div`
    & .styled-modal-body{
        padding: 15px 0;

        & .dropdown-label{
            margin-bottom: 10px;
        }

        & .ant-select-selection--single{
            height: 38px;
            line-height: 38px;
        }

        & .ant-select-selection__rendered{
            height: 100%;
            margin-left: 25px;
        }
    }

    & .styled-modal-footer{
        margin-bottom: 50px;

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
            background-color: white;
            border-color: #B0B0B0;

            &.secondary {
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
    }
`;