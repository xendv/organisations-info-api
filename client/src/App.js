import logo from './logo.svg';
import './css/App.css';
import Nav from './Nav.js';
import DataMap from './DataMap';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoRounded from '@mui/icons-material/InfoOutlined';
import Header from './Header';

export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#fb8c00',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header/>
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: '#303030',
        '&:hover': {
        },
      }}
    >
      <DataMap />
    </Box>
    </ThemeProvider>
  );
}

export default App;
