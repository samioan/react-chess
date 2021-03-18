import { Board } from "./components";

const appStyle = {
  textAlign: "center",
};

const App = () => {
  return (
    <div>
      <h1 style={appStyle}>React Chess</h1>
      <Board />
    </div>
  );
};

export default App;
