import { c as create_ssr_component } from "./ssr.js";
import { s as studio, w as watch } from "./_page.js";
import Studio from "@theatre/studio";
import { w as writable } from "./index.js";
Studio.initialize();
studio.set(Studio);
const InnerStudio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { hide } = $$props;
  const hideStore = writable(hide);
  watch([studio, hideStore], ([studio2, hide2]) => {
    if (hide2) {
      studio2?.ui.hide();
    } else {
      studio2?.ui.restore();
    }
    return () => {
      studio2?.ui.hide();
    };
  });
  if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0)
    $$bindings.hide(hide);
  {
    hideStore.set(hide);
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  InnerStudio as default
};
