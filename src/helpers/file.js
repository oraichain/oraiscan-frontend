export const getContentApiUrl = (owner, repo, path) => {
	return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
};
