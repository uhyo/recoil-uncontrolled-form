import { selector } from "recoil";
import { domByIdState } from "./utils/domById";
import { formContents } from "./utils/formContents";
import { loadingState } from "./utils/loading";

export type ValidationState = {
  isValid: boolean;
};

const pokemonForm = formContents({
  formId: "pokemon-form",
  elementNames: ["name"],
});

export const validationState = selector<ValidationState>({
  key: "dataflow/validation",
  get({ get }) {
    const formData = get(pokemonForm);
    return {
      isValid: formData.name.length > 0,
    };
  },
});
