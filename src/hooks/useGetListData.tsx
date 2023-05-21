import { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '@/constant/urls';
import { DataWithPatination } from '@/interface/DataWithPagination';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import useDebounce from './useDebounce';

const useGetListData = <T,>(url = '') => {
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [accessToken, setAccessToken] = useState('');
	const { debounce } = useDebounce(1000);
	const router = useRouter();
	const [data, setData] = useState<DataWithPatination<T>>({
		data: [],
		currentPage: 0,
		hasNext: false,
		hasPrevious: false,
		totalElements: 0,
		totalPages: 0,
	});

	const getData = async (page: number) => {
		const res = await fetch(`${BASE_BACKEND_URL}${url}?page=${page}&size=6`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (res.status === 401 || res.status === 403) {
			Cookies.remove('accessToken');
			router.push('/login');
			return;
		}

		if (res.status !== 200) {
			router.push('/404');
			return;
		}

		const response: DataWithPatination<T> = await res.json();
		setData((prev) => ({
			...prev,
			...response,
			data: [...prev.data, ...response.data],
		}));
		setLoading(false);
	};

	const onLoadMore = () => {
		setLoading(true);
		console.log('onLoadMore');
		debounce(() => {
			setPage((prev) => prev + 1);
		});
	};

	useEffect(() => {
		if (accessToken && page >= 0) getData(page);
	}, [page, accessToken]);

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) {
			setAccessToken(accessToken);
		}
	}, []);

	return { ...data, onLoadMore, loading };
};

export default useGetListData;
