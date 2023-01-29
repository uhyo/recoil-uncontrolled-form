import { FC } from "react";
import { useRecoilValue } from "recoil";
import { validationState } from "../dataflow/validation";

export const SubmitButton: FC = () => {
  const { isValid } = useRecoilValue(validationState);
  return (
    <button type="submit" disabled={!isValid}>
      送信
    </button>
  );
};
