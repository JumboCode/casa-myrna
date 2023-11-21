import { createTheme } from '@mui/material/styles';
import '@fontsource/inter'; 
import '@fontsource/montserrat';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E0057', // purple
    },
    secondary: {
      main: '#89B839', // green
    },
  },
  typography: { 
    h1: {
      fontFamily: 'Inter',
      fontSize: '32',
      fontWeight: 'bold'
    },
    h4:{
      fontFamily: 'Inter',
      fontSize: '16',
      fontWeight: 'bold'
    },
    body1:{
      fontFamily: 'Inter',
      fontSize: '16',
      fontWeight: 'regular'
    },
    body2:{
      fontFamily: 'Montserrat',
      fontSize: '16',
      fontWeight: 'regular'
    }
    // Define typography variants like h2, body1, etc.
  },
  // Add other theme configurations
});

export default theme;