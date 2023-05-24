import { IRootMessage } from '@/interface/IRootMessage';
import React from 'react';

type Props = {
	active?: boolean;
	newMessages?: number;
	message: IRootMessage;
	id: number;
};

const getStyle = (active: boolean) => {
	if (active)
		return 'flex flex-row items-center p-4 bg-gradient-to-r from-red-100 to-transparent border-l-2 border-red-500';
	return 'relative flex flex-row items-center p-4';
};

const UserItem = ({ active = false, newMessages = 0, message, id }: Props) => {
	console.log(message.sender, id);
	return (
		<div className={getStyle(active)}>
			<div className='absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3'>
				5 min
			</div>
			<div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0'>
				T
			</div>
			<div className='flex flex-col flex-grow ml-3'>
				<div className='text-sm font-medium'>
					{message.sender.id.toString() === id?.toString()
						? message?.recipient?.name
						: message?.sender?.name}
				</div>
				<div className='text-xs truncate w-40'>{message.lastMessage}</div>
			</div>
			{newMessages > 0 && (
				<div className='flex-shrink-0 ml-2 self-end mb-1'>
					<span className='flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full'>
						{newMessages}
					</span>
				</div>
			)}
		</div>
	);
};

export default UserItem;
