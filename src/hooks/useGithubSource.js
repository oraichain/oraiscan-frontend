import {useState} from "react";
import axios from "axios";
import {_} from "src/lib/scripts";
import {extractSource, getAuthorization, getContentApiUrl} from "src/helpers/github";

export default function useGithubSource() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetch = async source => {
		if (_.isNil(source)) {
			return;
		}

		const result = extractSource(source);

		if (_.isNil(result)) {
			return;
		}
		const {owner, repo, path: folderPath, ref} = result;

		setLoading(true);
		const folderUrl = getContentApiUrl(owner, repo, folderPath, ref);
		const authorization = getAuthorization();

		let config = {};
		if (authorization) {
			config = {
				headers: {Authorization: authorization},
			};
		}

		try {
			const folderResponse = await axios.get(folderUrl, config);
			const newData = [];

			if (!Array.isArray(folderResponse?.data)) {
				throw new Error("Folder response is not valid");
			}

			for (let i = 0; i < folderResponse.data.length; i++) {
				const item = folderResponse.data[i];
				const filePath = folderPath + "/" + item.name;
				const fileUrl = getContentApiUrl(owner, repo, filePath, ref);
				const fileResponse = await axios.get(fileUrl, config);
				if (_.isNil(fileResponse?.data?.name) || _.isNil(fileResponse?.data?.download_url)) {
					throw new Error("Download url is not valid");
				}

				const name = fileResponse.data.name;
				const downloadUrlResponse = await axios.get(fileResponse.data.download_url);
				if (_.isNil(downloadUrlResponse?.data)) {
					throw new Error("Download url response is not valid");
				}
				const content = downloadUrlResponse.data;
				newData.push({
					name: name,
					content: content,
				});
			}
			setData(newData);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	return {
		data,
		loading,
		error,
		fetch,
	};
}
