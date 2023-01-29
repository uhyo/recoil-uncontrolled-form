import { RecoilValueReadOnly, selectorFamily } from "recoil";

const _field = selectorFamily<
  unknown,
  {
    selector: RecoilValueReadOnly<Record<PropertyKey, unknown>>;
    key: PropertyKey;
  }
>({
  key: "dataflow/utils/field",
  get:
    ({ selector, key }) =>
    ({ get }) =>
      get(selector)[key],
});

export const field: <T, K extends keyof T>(
  selector: RecoilValueReadOnly<T>,
  key: K
) => RecoilValueReadOnly<T[K]> = (selector, key) =>
  _field({
    selector: selector as RecoilValueReadOnly<any>,
    key,
  }) as RecoilValueReadOnly<any>;
