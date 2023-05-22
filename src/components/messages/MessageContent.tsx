import React from 'react';
import MessageContentItem from './MessageContentItem';
import { IMessage } from '@/interface/IMessage';

type Props = {
	myId: string;
	messages: IMessage[];
};

const MessageContent = ({ messages, myId }: Props) => {
	return (
		<div className='h-full overflow-hidden py-4'>
			<div className='h-full overflow-y-auto'>
				<div className='grid grid-cols-12 gap-y-2'>
					{messages.map((message) => (
						<MessageContentItem
							key={message.id}
							message={message.message}
							sender={message.user.id === myId}
							username={message.user.username}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MessageContent;
