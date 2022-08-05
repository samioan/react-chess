import { Game, Intro } from "./routes";
import store from "./models/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Intro />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/game">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
