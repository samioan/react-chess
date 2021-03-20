import { Board } from "./components";
import store from "./models/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const appStyle = {
  textAlign: "center",
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <h1 style={appStyle}>React Chess</h1>
        <Board />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
