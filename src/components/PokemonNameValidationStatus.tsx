import { FC } from "react";
import { useRecoilValue } from "recoil";
import { field } from "../dataflow/utils/field";
import { validationState } from "../dataflow/pokemonForm";

export const PokemonNameValidationStatus: FC = () => {
  const pokemonNameIsValid = useRecoilValue(
    field(validationState, "pokemonNameIsValid")
  );
  if (pokemonNameIsValid) {
    return (
      <p style={{ color: "green", fontSize: "0.8em" }}>
        ポケモンの名前を入力してください ✅
      </p>
    );
  } else {
    return (
      <p style={{ color: "gray", fontSize: "0.8em" }}>
        ポケモンの名前を入力してください
      </p>
    );
  }
};
