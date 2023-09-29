import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css?family=Poppins:400,600');
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  body {
    font-family: Poppins, sans-serif;
  }
`;

export default GlobalStyles;


// import { createGlobalStyle } from 'styled-components';

// import Poppins from '../../assets/fonts/Poppins-Regular.ttf';

// export default createGlobalStyle`
//     @font-face {
//         font-family: 'Poppins';
//         src: local('Poppins'),
//         url(${Poppins}) format('ttf'),
//     }
// `;
