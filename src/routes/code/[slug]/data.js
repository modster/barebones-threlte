export default [
	{
		params: `/** @type {import('./$types').PageLoad} */
		export async function load({ fetch, params }) {
			const res = await fetch('/api/items/\${params.id}');
			const item = await res.json();
		
			return { item };
		}`,
		h1: "<h1 class='h1'> </h1>"
	}
];
