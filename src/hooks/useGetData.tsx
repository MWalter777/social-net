import { BASE_BACKEND_URL } from '@/constant/urls';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const useGetData = <T, B>(url = '') => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) {
			setAccessToken(accessToken);
		}
	}, []);

	const getData = async () => {
		const res = await fetch(`${BASE_BACKEND_URL}${url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const { data }: { data: T } = await res.json();
		return data;
	};

	return { getData };
};

export default useGetData;
