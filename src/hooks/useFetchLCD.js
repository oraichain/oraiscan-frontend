import { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";

const lcdApi = config.LCD_API;

export default function useFetchLCD(url) {
	const [result, setResult] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`${lcdApi}/${url}`);
				if (!!response) {
					const data = response.data;
					setResult(data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return {
		result,
		loading,
		error,
	};
}
