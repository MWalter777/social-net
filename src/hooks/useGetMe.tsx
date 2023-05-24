import { IUser } from '@/interface/IUser';
import { useEffect, useState } from 'react';
import useGetData from './useGetData';

const useGetMe = () => {
	const [user, setUser] = useState<IUser>();
	const { getData, accessToken } = useGetData<IUser>('api/users/me');

	useEffect(() => {
		const user = sessionStorage.getItem('user');
		if (user) {
			setUser(JSON.parse(user));
			return;
		}
		if (accessToken) {
			getData().then((data) => {
				if (!data) return;
				sessionStorage.setItem('user', JSON.stringify(data));
				setUser(data);
			});
		}
	}, [accessToken]);
	return { user, accessToken };
};

export default useGetMe;
