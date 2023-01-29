import { selector } from "recoil";
import { pokemonListState } from "./pokemonList";
import { formContents } from "./utils/formContents";

export type ValidationState = {
  pokemonNameIsValid: boolean;
  canSubmit: boolean;
};

export const pokemonForm = formContents({
  formId: "pokemon-form",
  elementNames: ["name"],
});

export const validationState = selector<ValidationState>({
  key: "dataflow/validation",
  get({ get }) {
    const formData = get(pokemonForm);
    const pokemonList = get(pokemonListState);

    const pokemonNameIsValid = pokemonList.some(
      (p) => p.name === formData.name
    );
    const canSubmit = pokemonNameIsValid;

    return {
      pokemonNameIsValid,
      canSubmit,
    };
  },
});
