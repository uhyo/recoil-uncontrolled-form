import React, { Suspense, useCallback, useState } from "react";
import { useRecoilCallback } from "recoil";
import "./App.css";
import { PokemonNameValidationStatus } from "./components/PokemonNameValidationStatus";
import { SubmitButton } from "./components/SubmitButton";
import { formContents } from "./dataflow/utils/formContents";
import { pokemonForm } from "./dataflow/validation";

function App() {
  const submitHandler = useRecoilCallback(
    ({ snapshot }) =>
      (e: React.SyntheticEvent<HTMLFormElement>) => {
        snapshot.getPromise(pokemonForm).then((contents) => {
          alert(contents.name);
        });
        e.preventDefault();
      },
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
        <Suspense>
          <PokemonNameValidationStatus />
        </Suspense>
        <hr />
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
