import React, { Suspense, useCallback, useState } from "react";
import "./App.css";
import { SubmitButton } from "./components/SubmitButton";

function App() {
  const submitHandler = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {},
    []
  );

  return (
    <div className="App">
      <h1>React Uncontrolled components + Recoil example</h1>
      <form onSubmit={submitHandler} id="pokemon-form">
        <p>
          <label>
            好きなポケモンはなんですか？
            <input type="text" name="name" required />
          </label>
        </p>
        <p>
          <Suspense>
            <SubmitButton />
          </Suspense>
        </p>
      </form>
    </div>
  );
}

export default App;
