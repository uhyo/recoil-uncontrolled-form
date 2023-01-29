import { atomFamily, DefaultValue, RecoilValueReadOnly } from "recoil";

export const formContents: <Keys extends string>(input: {
  formId: string;
  elementNames: readonly Keys[];
}) => RecoilValueReadOnly<Record<Keys, string>> = atomFamily<
  Record<string, string>,
  {
    formId: string;
    elementNames: readonly string[];
  }
>({
  key: "dataflow/utils/formContents",
  effects: ({ formId, elementNames }) => [
    ({ setSelf, resetSelf }) => {
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
        const formElm = document.getElementById(formId);
        if (formElm === state.form) {
          return;
        }
        state.cleanup();

        if (formElm instanceof HTMLFormElement) {
          const obj: Record<string, string | null> = Object.fromEntries(
            elementNames.map((key) => {
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
      }
    },
  ],
});
