import React from 'react';
import UserHeader from '../posts/UserHeader';

type Props = {
	username?: string;
};

const MessageHeader = ({ username = '@username' }: Props) => {
	return (
		<div className='flex flex-row items-center py-4 px-6 rounded-2xl shadow text-primary'>
			<UserHeader
				avatar=''
				id='1'
				name='Username'
				postId=''
				username='username'
				noShowPost
				className='w-full'
			/>
		</div>
	);
};

export default MessageHeader;
