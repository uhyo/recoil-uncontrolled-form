import { atom } from "recoil";

export const loadingState = atom<never>({
  key: "dataflow/utils/loading",
});
