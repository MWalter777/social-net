import React from 'react';
import Layout from '@/components/layout';
import MessageSideBar from '@/components/messages/MessageSideBar';
import MessageHeader from '@/components/messages/MessageHeader';
import MessageContent from '@/components/messages/MessageContent';
import MessageForm from '@/components/messages/MessageForm';
import useGetMe from '@/hooks/useGetMe';
import Spinner from '@/components/Spinner';

const messages = () => {
	const { user } = useGetMe();

	return (
		<>
			{user?.id ? (
				<Layout>
					<div className='flex flex-row h-[calc(100vh-98px)] antialiased text-gray-800'>
						<MessageSideBar id={+user.id} />
						<div className='flex flex-col h-full w-full bg-white px-4 py-6'>
							<MessageHeader />
							<MessageContent myId={user?.id || ''} messages={[]} />
							<MessageForm />
						</div>
					</div>
				</Layout>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default messages;
