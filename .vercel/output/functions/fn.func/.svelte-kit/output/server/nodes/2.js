import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.17958332.js","_app/immutable/chunks/2.2a29e18d.js","_app/immutable/chunks/scheduler.5ead0948.js","_app/immutable/chunks/index.096152c6.js","_app/immutable/chunks/index.cae1bb1e.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/2.2388fa67.css"];
export const fonts = [];
