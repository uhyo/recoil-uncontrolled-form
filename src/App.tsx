import { Suspense } from "react";
import "./App.css";
import { PokemonForm } from "./components/PokemonForm/PokemonForm";

function App() {
  return (
    <div className="App">
      <h1>React Uncontrolled components + Recoil example</h1>
      <Suspense>
        <PokemonForm />
      </Suspense>
    </div>
  );
}

export default App;
