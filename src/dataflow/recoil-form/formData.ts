import { atomFamily, DefaultValue, RecoilValueReadOnly } from "recoil";
import { recoilFormBrand, RecoilFormState } from "./createForm";

export const formRefState = atomFamily<HTMLFormElement, number>({
  key: "__recoil-form__/formRef",
  dangerouslyAllowMutability: true,
});

const _formData = atomFamily<Record<string, string>, RecoilFormState<string>>({
  key: "__recoil-form__/formData",
  effects: (formState) => [
    ({ getPromise, setSelf, resetSelf }) => {
      type State = {
        form: HTMLFormElement | null;
        cleanup: () => void;
      };
      let state: State = {
        form: null,
        cleanup: () => {},
      };
      queryAndSet();
      const observer = new MutationObserver(() => {
        queryAndSet();
      });
      observer.observe(document, {
        childList: true,
        subtree: true,
      });
      return () => {
        state.cleanup();
        observer.disconnect();
      };
      function queryAndSet() {
        (async () => {
          const formElm = await getPromise(
            formRefState(formState[recoilFormBrand].formKey)
          );
          if (!formElm.isConnected) {
            state.cleanup();
            state = {
              form: null,
              cleanup: () => {},
            };
            resetSelf();
            return;
          }
          if (formElm === state.form) {
            return;
          }
          state.cleanup();

          if (formElm instanceof HTMLFormElement) {
            const obj: Record<string, string | null> = Object.fromEntries(
              formState[recoilFormBrand].elements.map((key) => {
                const control = formElm.elements.namedItem(key);
                if (control instanceof HTMLInputElement) {
                  return [key, control.value];
                } else {
                  return [key, null];
                }
              })
            );
            if (Object.values(obj).some((value) => value === null)) {
              resetSelf();
              return;
            }
            setSelf(obj as Record<string, string>);
            const inputHandler = (e: Event) => {
              const target = e.target;
              if (!(target instanceof HTMLInputElement)) {
                return;
              }
              const name = target.name;
              const value = target.value;
              setSelf((current) => {
                if (current instanceof DefaultValue) {
                  return current;
                }
                if (current[name] === value) {
                  return current;
                }
                return {
                  ...current,
                  [name]: value,
                };
              });
            };
            formElm.addEventListener("input", inputHandler);
            state = {
              form: formElm,
              cleanup: () => {
                formElm.removeEventListener("input", inputHandler);
              },
            };
          } else {
            resetSelf();
          }
        })().catch((error) => {
          setSelf(Promise.reject(error));
        });
      }
    },
  ],
});

export function formData<ElementName extends string>(
  input: RecoilFormState<ElementName>
): RecoilValueReadOnly<Record<ElementName, string>> {
  return _formData(input as unknown as RecoilFormState<string>);
}
