import React from 'react';
import UserItem from './UserItem';

const MessageSideBar = () => {
	return (
		<div className='flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4'>
			<div className='flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4'>
				<div className='flex flex-row items-center'>
					<div className='flex flex-row items-center'>
						<div className='text-xl font-semibold'>Messages</div>
						<div className='flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium'>
							5
						</div>
					</div>
				</div>
				<div className='mt-2'>
					<div className='flex flex-col -mx-4'>
						<UserItem newMessages={4} />
						<UserItem />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageSideBar;
