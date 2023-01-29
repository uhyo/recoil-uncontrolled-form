import { atomFamily, selectorFamily } from "recoil";

export const domByIdState = atomFamily<HTMLElement, string>({
  key: "dataflow/utils/domById",
  effects: (id) => [
    ({ setSelf, resetSelf }) => {
      queryAndSet();
      const observer = new MutationObserver((events) => {
        queryAndSet();
      });
      observer.observe(document, {
        childList: true,
        subtree: true,
      });
      return () => {
        observer.disconnect();
      };
      function queryAndSet() {
        const elm = document.getElementById(id);
        if (elm !== null) {
          setSelf(elm);
        } else {
          resetSelf();
        }
      }
    },
  ],
  dangerouslyAllowMutability: true,
});
