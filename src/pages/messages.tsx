import React from 'react';
import Layout from '@/components/layout';
import MessageSideBar from '@/components/messages/MessageSideBar';
import MessageHeader from '@/components/messages/MessageHeader';
import MessageContent from '@/components/messages/MessageContent';
import MessageForm from '@/components/messages/MessageForm';
import { GetServerSidePropsContext } from 'next';

type Props = {
	myId: string;
};

const messages = ({ myId }: Props) => {
	return (
		<Layout>
			<div className='flex flex-row h-screen antialiased text-gray-800'>
				<MessageSideBar />
				<div className='flex flex-col h-full w-full bg-white px-4 py-6'>
					<MessageHeader />
					<MessageContent myId={myId} messages={[]} />
					<MessageForm />
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	// get accessToken from cookie
	const accessToken = context.req.cookies.accessToken;
	if (!accessToken) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	// fetch /api/users/me
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/me`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!res.ok) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const user = await res.json();

	return {
		props: {
			myId: user.id.toString(),
		},
	};
};

export default messages;
