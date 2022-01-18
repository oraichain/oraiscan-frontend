export const getContentApiUrl = (owner, repo, path, ref = "master") => {
	const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
	console.log("url: ", url);
	return url;
};

export const extractSource = source => {
	const sourceParts = source.split("/");
	const domainIndex = sourceParts.findIndex(sourcePart => sourcePart.includes("github"));

	if (domainIndex === -1) {
		return null;
	}
	console.log("source parts: ", sourceParts);

	const owner = sourceParts[domainIndex + 1];
	const repo = sourceParts[domainIndex + 2];
	const ref = sourceParts[domainIndex + 4];
	const start = sourceParts.indexOf(ref) + 1;
	const end = sourceParts.length;
	let path = "";
	let indexPath = start;
	while (indexPath !== end) {
		path = path.concat(`${sourceParts[indexPath]}/`);
		indexPath += 1;
	}
	console.log("path: ", path);
	path = path.concat("src");
	return {
		owner: owner,
		repo: repo,
		path: path,
		ref: ref,
	};
};

export const getAuthorization = () => {
	return "Bearer " + (process.env.REACT_APP_GITHUB_ACCESS_TOKEN || "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");
};
