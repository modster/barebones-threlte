export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","github-logo-white.svg","github-logo.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.3de3b829.js","app":"_app/immutable/entry/app.63b216b0.js","imports":["_app/immutable/entry/start.3de3b829.js","_app/immutable/chunks/scheduler.d10c18d3.js","_app/immutable/chunks/singletons.d3756d01.js","_app/immutable/chunks/index.ea8823cf.js","_app/immutable/entry/app.63b216b0.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.d10c18d3.js","_app/immutable/chunks/index.0e3523c9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/editor",
				pattern: /^\/editor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
