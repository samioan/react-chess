import Typography from "@material-ui/core/Typography";
import { Board } from "./components";
import store from "./models/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Typography variant="h4" align="center" gutterBottom>
          React Chess
        </Typography>
        <Board />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
