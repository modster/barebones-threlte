export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.2bd21b42.js","app":"_app/immutable/entry/app.d331a122.js","imports":["_app/immutable/entry/start.2bd21b42.js","_app/immutable/chunks/scheduler.5ead0948.js","_app/immutable/chunks/singletons.b97290c3.js","_app/immutable/chunks/index.cae1bb1e.js","_app/immutable/entry/app.d331a122.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.5ead0948.js","_app/immutable/chunks/index.096152c6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
