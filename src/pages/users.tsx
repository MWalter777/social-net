import React from 'react';
import Layout from '@/components/layout';
import useGetListData from '@/hooks/useGetListData';
import { IUser } from '@/interface/IUser';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Spinner from '@/components/Spinner';
import UserHeader from '@/components/posts/UserHeader';

const Users = () => {
	const {
		data: users,
		hasNext,
		onLoadMore,
		loading,
	} = useGetListData<IUser>('api/users');

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage: hasNext,
		onLoadMore,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: false,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});
	return (
		<Layout>
			<div className='w-full flex flex-col gap-2 items-center justify-center'>
				{users.map((user) => (
					<div
						key={user.id}
						className='w-full md:w-10/12 lg:w-8/12 bg-white text-primary flex flex-col p-2 md:p-4 lg:p-8 gap-2 rounded-sm shadow-lg'
					>
						<UserHeader
							{...user}
							avatar={user.avatar}
							postId='1'
							noShowPost={true}
						/>
					</div>
				))}
				{hasNext && (
					<div className='w-full flex justify-center' ref={sentryRef}>
						<Spinner />
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Users;
