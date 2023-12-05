import React from "react";
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {
	__experimentalHeading as Heading,
	__experimentalText as Text,
	SearchControl,
	SelectControl,
	TextControl,
} from "@wordpress/components";

import "./editor.scss";
import { TEXT_DOMAIN } from "./constants";
import { fetchPostTypes, fetchPosts } from "./utils/apiFetch";

export default function Edit({ attributes, setAttributes, isSelected }) {
	console.log({ attributes });
	const [postTypeBusy, setPostTypeBusy] = useState(false);
	const [wpPostsBusy, setWpPostsBusy] = useState(false);

	const [wpPostTypes, setWPPostTypes] = useState<any[]>([]);
	const [wPPosts, setWPPosts] = useState<any[]>([]);

	// form controls
	const [blockTitle, setBlockTitle] = useState(attributes.blockTitle);
	const [postTypes, setPostTypes] = useState<any[]>(attributes.postTypes);
	const [excludedPosts, setExcludedPosts] = useState<any[]>(
		attributes.excludedPosts,
	);
	const [postSearchInput, setPostSearchInput] = useState("");
	const [debouncedPostSearchInput, setDebouncedPostSearchInput] = useState("");
	const [perPage, setPerPage] = useState(attributes.perPage);
	const [orderBy, setOrderBy] = useState(attributes.orderBy);
	const [order, setOrder] = useState(attributes.order);

	const orderByOptions = [
		{ label: "Name", value: "name" },
		{ label: "Publishing Date", value: "date" },
	];

	const orderOptions = [
		{ label: "Ascending", value: "ASC" },
		{ label: "Descending", value: "DESC" },
	];

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			setDebouncedPostSearchInput(postSearchInput);
		}, 700);

		return () => {
			clearTimeout(debounceTimer);
		};
	}, [postSearchInput]);

	useEffect(() => {
		setPostTypeBusy(true);

		fetchPostTypes(setWPPostTypes, setPostTypeBusy);
	}, []);

	useEffect(() => {
		setAttributes({
			perPage,
			postTypes,
			blockTitle,
			excludedPosts,
			orderBy,
			order,
		});
	}, [blockTitle, postTypes, excludedPosts, perPage, orderBy, order]);

	useEffect(() => {
		setWpPostsBusy(true);
		fetchPosts(setWPPosts, setWpPostsBusy, postSearchInput, perPage);
	}, [debouncedPostSearchInput]);

	return (
		<div {...useBlockProps()} className="yk-content-list-form">
			<Heading>{__(`Content List`, TEXT_DOMAIN)}</Heading>

			<TextControl
				label={__("Block Title", TEXT_DOMAIN)}
				value={blockTitle}
				onChange={(value) => setBlockTitle(value)}
			/>

			<TextControl
				label={__("Per page", TEXT_DOMAIN)}
				type="number"
				min={10}
				max={50}
				step={5}
				value={perPage}
				onChange={(value) => setPerPage(parseInt(value))}
			/>

			<SelectControl
				label={__("Order By", TEXT_DOMAIN)}
				value={orderBy}
				options={orderByOptions}
				onChange={(val) => setOrderBy(val)}
			/>

			<SelectControl
				label={__("Order", TEXT_DOMAIN)}
				value={order}
				options={orderOptions}
				onChange={(val) => setOrder(val)}
			/>

			<SelectControl
				label={__("Post Types", TEXT_DOMAIN)}
				value={postTypes}
				options={wpPostTypes}
				multiple
				onChange={(val) => setPostTypes(val)}
				help={__("You can select multiple values", TEXT_DOMAIN)}
				disabled={postTypeBusy}
			/>

			<Text>Exclude Posts</Text>

			<SearchControl
				label={__("Search posts", TEXT_DOMAIN)}
				value={postSearchInput}
				onChange={setPostSearchInput}
				disabled={wpPostsBusy}
			/>

			<SelectControl
				label={__("Exclude", TEXT_DOMAIN)}
				value={excludedPosts}
				options={wPPosts}
				multiple
				onChange={(val) => setExcludedPosts(val)}
				help={__("You can select multiple values", TEXT_DOMAIN)}
				disabled={wpPostsBusy}
			/>
		</div>
	);
}
