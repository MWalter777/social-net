import React from 'react';
import Layout from '@/components/layout';
import { GetServerSidePropsContext } from 'next';
import PostLists from '@/components/posts/PostLists';
import useGetMe from '@/hooks/useGetMe';

const MyPost = () => {
	const { user } = useGetMe();
	return (
		<Layout>
			<PostLists url={`api/post/user/${user?.id}`} />
		</Layout>
	);
};

export default MyPost;
