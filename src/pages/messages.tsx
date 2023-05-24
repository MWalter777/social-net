import React from 'react';
import Layout from '@/components/layout';
import MessageSideBar from '@/components/messages/MessageSideBar';
import MessageHeader from '@/components/messages/MessageHeader';
import MessageContent from '@/components/messages/MessageContent';
import MessageForm from '@/components/messages/MessageForm';
import { GetServerSidePropsContext } from 'next';
import useGetListData from '@/hooks/useGetListData';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useGetMe from '@/hooks/useGetMe';
import { IRootMessage } from '@/interface/IRootMessage';

const messages = () => {
	const { user } = useGetMe();
	const {
		loading,
		hasNext,
		onLoadMore,
		data: users,
	} = useGetListData<IRootMessage>(`api/messages/${user?.id}`);
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
	console.log({ users });
	return (
		<Layout>
			<div className='flex flex-row h-screen antialiased text-gray-800'>
				<MessageSideBar />
				<div className='flex flex-col h-full w-full bg-white px-4 py-6'>
					<MessageHeader />
					<MessageContent myId={user?.id || ''} messages={[]} />
					<MessageForm />
				</div>
			</div>
		</Layout>
	);
};

export default messages;
