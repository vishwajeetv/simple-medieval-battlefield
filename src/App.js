import logo from './logo.svg';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Main from "./Main";
import {Container} from "@material-ui/core";
const theme = createMuiTheme({

});
function App() {
  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth={"lg"}>
              <Main/>
          </Container>
      </ThemeProvider>
  );
}

export default App;
