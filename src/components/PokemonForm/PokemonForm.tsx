import { FC, Suspense } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { pokemonListState } from "../../dataflow/pokemonList";
import { formData } from "../../dataflow/recoil-form/formData";
import { pokemonForm } from "../../dataflow/pokemonForm";
import { PokemonNameValidationStatus } from "../PokemonNameValidationStatus";
import { SubmitButton } from "../SubmitButton";

export const PokemonForm: FC = () => {
  const submitHandler = useRecoilCallback(
    ({ snapshot }) =>
      (e: React.SyntheticEvent<HTMLFormElement>) => {
        snapshot.getPromise(formData(pokemonForm)).then((contents) => {
          alert(contents.name);
        });
        e.preventDefault();
      },
    []
  );

  const pokemonList = useRecoilValue(pokemonListState);

  const { Form, Input } = useRecoilValue(pokemonForm);

  return (
    <Form onSubmit={submitHandler}>
      <p>
        <label>
          好きなポケモンはなんですか？
          <Input type="text" name="name" required list="pokemon-list" />
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
    </Form>
  );
};
