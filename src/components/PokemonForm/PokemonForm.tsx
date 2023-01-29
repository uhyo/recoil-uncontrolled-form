import { FC, Suspense } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { pokemonListState } from "../../dataflow/pokemonList";
import { pokemonForm } from "../../dataflow/validation";
import { PokemonNameValidationStatus } from "../PokemonNameValidationStatus";
import { SubmitButton } from "../SubmitButton";

export const PokemonForm: FC = () => {
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

  const pokemonList = useRecoilValue(pokemonListState);

  return (
    <form onSubmit={submitHandler} id="pokemon-form">
      <p>
        <label>
          好きなポケモンはなんですか？
          <input type="text" name="name" required list="pokemon-list" />
          <datalist id="pokemon-list">
            {pokemonList.map((poke) => (
              <option key={poke.id}>{poke.name}</option>
            ))}
          </datalist>
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
  );
};
