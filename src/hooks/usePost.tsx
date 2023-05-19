import { BASE_BACKEND_URL } from '@/constant/urls';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const usePost = <T, B>(url = '') => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) {
			console.log('running usePost' + accessToken);
			setAccessToken(accessToken);
		}
	}, []);
	const postFn = async (body: B) => {
		const res = await fetch(`${BASE_BACKEND_URL}${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		});
		const { data }: { data: T } = await res.json();
		return data;
	};

	return { postFn };
};

export default usePost;
