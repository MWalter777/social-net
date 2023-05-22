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
		if (!res.ok) {
			const {
				errors,
			}: { errors: { defaultMessage: string; field: string }[] } =
				await res.json();
			if (errors && Array.isArray(errors) && errors.length > 0) {
				const result = errors.map((e) => ({
					message: e.defaultMessage,
					field: e.field,
				}));
				return result;
			}
			return [{ message: 'Something went wrong', field: '' }];
		}
		const { data }: { data: R } = await res.json();
		return data;
	};

	return { postFn };
};

export default usePost;
