/**
 * snippet server
 * displays code
 * documentation
 * bookmarks
 * hashes snippets
 * meta data
 * clipboard
 * extensions?
 */
import { getStores } from "$app/stores";

/** @type {import('./$types').PageLoad}  */
export const load = async ({ parent }) => {
	const data = getStores();
	// @ts-ignore
	// @todo
	// const parentData = await parent();
	return {
		data
	};
};
