export const getContentApiUrl = (owner, repo, path, ref = "master") => {
	return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
};

export const extractSource = source => {
	const sourceParts = source.split("/");
	const domainIndex = sourceParts.findIndex(sourcePart => sourcePart.includes("github"));

	if (domainIndex === -1) {
		return null;
	}

	const owner = sourceParts[domainIndex + 1];
	const repo = sourceParts[domainIndex + 2];
	const ref = sourceParts[sourceParts.length - 1];
	const start = source.indexOf(repo) + repo.length + 1;
	const end = source.indexOf(ref) - 1;
	let path = source.substring(start, end);
	path = path.split("/");
	path.splice(0, 2);
	path = path.join("/") + "/src";
	return {
		owner: owner,
		repo: repo,
		path: path,
		ref: ref,
	};
};
