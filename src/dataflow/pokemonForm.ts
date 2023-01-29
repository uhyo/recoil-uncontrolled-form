import { selector } from "recoil";
import { pokemonListState } from "./pokemonList";
import { recoilForm } from "./recoil-form/createForm";
import { formData } from "./recoil-form/formData";

export type ValidationState = {
  pokemonNameIsValid: boolean;
  canSubmit: boolean;
};

export const pokemonForm = recoilForm({
  elements: ["name"],
});

export const validationState = selector<ValidationState>({
  key: "dataflow/validation",
  get({ get }) {
    const formContents = get(formData(pokemonForm));
    const pokemonList = get(pokemonListState);

    const pokemonNameIsValid = pokemonList.some(
      (p) => p.name === formContents.name
    );
    const canSubmit = pokemonNameIsValid;

    return {
      pokemonNameIsValid,
      canSubmit,
    };
  },
});
