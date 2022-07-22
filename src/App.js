import { Game, Intro } from "./routes";
import store from "./models/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import styles from "./styles";

const App = () => {
  const classes = styles();
  return (
    <div className={classes.appContainer}>
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
    </div>
  );
};

export default App;
