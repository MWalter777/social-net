import React from 'react';
import UserItem from './UserItem';
import { IRootMessage } from '@/interface/IRootMessage';
import useGetListData from '@/hooks/useGetListData';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Spinner from '../Spinner';

type Props = {
	id: number;
};

const MessageSideBar = ({ id }: Props) => {
	const {
		loading,
		hasNext,
		onLoadMore,
		data: users,
	} = useGetListData<IRootMessage>(`api/messages/${id}`);
	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage: hasNext,
		onLoadMore,
		disabled: false,
		rootMargin: '0px 0px 400px 0px',
	});
	return (
		<div className='flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4'>
			<div className='flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4'>
				<div className='flex flex-row items-center'>
					<div className='flex flex-row items-center'>
						<div className='text-xl font-semibold'>Messages</div>
						<div className='flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium'>
							{users.length}
						</div>
					</div>
				</div>
				<div className='mt-2 border border-red-600 overflow-y-auto myScroll overflow-x-hidden'>
					<div className='flex flex-col -mx-4 pr-1'>
						{users.map((user, index) => (
							<UserItem key={index} message={user} />
						))}
						{hasNext && (
							<div className='w-full flex justify-center' ref={sentryRef}>
								<Spinner />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageSideBar;
