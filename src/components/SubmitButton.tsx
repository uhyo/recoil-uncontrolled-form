import { FC } from "react";
import { useRecoilValue } from "recoil";
import { field } from "../dataflow/utils/field";
import { validationState } from "../dataflow/validation";

export const SubmitButton: FC = () => {
  const canSubmit = useRecoilValue(field(validationState, "canSubmit"));
  return (
    <button type="submit" disabled={!canSubmit}>
      送信
    </button>
  );
};
