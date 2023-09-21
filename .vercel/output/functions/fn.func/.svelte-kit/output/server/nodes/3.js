

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/editor/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.dbaa58e8.js","_app/immutable/chunks/3.7b9a4555.js","_app/immutable/chunks/scheduler.d10c18d3.js","_app/immutable/chunks/index.0e3523c9.js","_app/immutable/chunks/index.ea8823cf.js","_app/immutable/chunks/_commonjsHelpers.2bf1a50d.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/3.2388fa67.css"];
export const fonts = [];
