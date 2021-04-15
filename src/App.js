import "./App.scss";
import Weather from "containers/Weather/Weather";
import { AppProvider } from "context/App.context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Weather />
      </AppProvider>
    </div>
  );
}

export default App;
