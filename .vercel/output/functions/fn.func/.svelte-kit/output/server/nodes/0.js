

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.e9e4e4e2.js","_app/immutable/chunks/scheduler.5ead0948.js","_app/immutable/chunks/index.096152c6.js","_app/immutable/chunks/index.cae1bb1e.js"];
export const stylesheets = ["_app/immutable/assets/0.0a3a3a06.css"];
export const fonts = [];
