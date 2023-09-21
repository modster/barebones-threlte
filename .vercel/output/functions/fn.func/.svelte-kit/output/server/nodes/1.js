

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c86499ad.js","_app/immutable/chunks/scheduler.d10c18d3.js","_app/immutable/chunks/index.0e3523c9.js","_app/immutable/chunks/stores.7d4cfdab.js","_app/immutable/chunks/singletons.d3756d01.js","_app/immutable/chunks/index.ea8823cf.js"];
export const stylesheets = [];
export const fonts = [];
