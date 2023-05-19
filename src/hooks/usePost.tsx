import { BASE_BACKEND_URL } from '@/constant/urls';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const usePost = <T, R>(url = '') => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) {
			setAccessToken(accessToken);
		}
	}, []);
	const postFn = async (body: T) => {
		const res = await fetch(`${BASE_BACKEND_URL}${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		});
		const { data }: { data: R } = await res.json();
		return data;
	};

	return { postFn };
};

export default usePost;
