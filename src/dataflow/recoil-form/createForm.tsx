import { FC, MutableRefObject, useEffect, useRef } from "react";
import { RecoilValueReadOnly, selectorFamily } from "recoil";
import { formRefState } from "./formData";

export const recoilFormBrand = Symbol("recoilFormBrand");

export type CreateFormInput<ElementName extends string> = {
  elements: readonly ElementName[];
};

export type RecoilForm<ElementName extends string> = {
  Form: FC<JSX.IntrinsicElements["form"]>;
  Input: FC<
    JSX.IntrinsicElements["input"] & {
      name: ElementName;
    }
  >;
};

export type RecoilFormState<ElementName extends string> = RecoilValueReadOnly<
  RecoilForm<ElementName>
> & {
  [recoilFormBrand]: {
    elements: readonly ElementName[];
    formKey: number;
  };
};

const _recoilForm = selectorFamily<
  RecoilForm<string>,
  CreateFormInput<string> & {
    formKey: number;
  }
>({
  key: "__recoil-form__",
  get:
    ({ formKey, elements }) =>
    ({ getCallback }) => {
      const formRef = getCallback(({ set }) => (form: HTMLFormElement) => {
        set(formRefState(formKey), form);
      });
      return {
        Form: (props) => {
          return <form {...props} ref={formRef} />;
        },
        Input: (props) => <input {...props} />,
        [recoilFormBrand]: {
          elements,
        },
      };
    },
});

let formKeyCounter = 1;

export function recoilForm<ElementName extends string>(
  options: CreateFormInput<ElementName>
): RecoilFormState<ElementName> {
  const formKey = formKeyCounter++;
  return Object.assign(
    _recoilForm({
      ...options,
      formKey,
    }) as unknown as RecoilValueReadOnly<RecoilForm<ElementName>>,
    {
      [recoilFormBrand]: {
        elements: options.elements,
        formKey,
      },
    }
  );
}
