

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9a93d37b.js","_app/immutable/chunks/scheduler.5ead0948.js","_app/immutable/chunks/index.096152c6.js","_app/immutable/chunks/singletons.b97290c3.js","_app/immutable/chunks/index.cae1bb1e.js"];
export const stylesheets = [];
export const fonts = [];
