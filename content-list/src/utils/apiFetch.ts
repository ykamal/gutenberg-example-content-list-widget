import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

export const fetchPostTypes = (
	setterFn: (any) => void,
	setBusy: (boolean) => void,
) => {
	apiFetch({
		path: "/wp/v2/types",
	})
		.then((resp) => {
			const postTypes = Object.keys(resp).map((item) => {
				const { name, slug } = resp[item];
				if (
					slug !== "attachment" &&
					!slug.startsWith("wp_") &&
					!slug.startsWith("nav_")
				) {
					return {
						value: slug,
						label: name,
					};
				}
			});
			setterFn(postTypes.filter((p) => p));
		})
		.catch((error) => {
			console.error(error);
		})
		.finally(() => setBusy(false));
};

export const fetchPosts = (
	setterFn: (any) => void,
	setBusy: (boolean) => void,
	searchTerm = "",
	perPage: number = 20,
	type: string[] = [],
) => {
	const queryParams = {
		search: searchTerm,
		per_page: perPage,
		subtype: type,
	};
	apiFetch({
		path: addQueryArgs("/wp/v2/search", queryParams),
	})
		.then((resp) => {
			const posts = resp.map((p) => ({ value: p.id, label: p.title }));
			setterFn(posts);
		})
		.catch((error) => {
			console.error(error);
		})
		.finally(() => setBusy(false));
};
