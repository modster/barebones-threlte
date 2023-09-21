

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.08d8c98c.js","_app/immutable/chunks/scheduler.d10c18d3.js","_app/immutable/chunks/index.0e3523c9.js","_app/immutable/chunks/index.ea8823cf.js"];
export const stylesheets = [];
export const fonts = [];
