import React from 'react';
import Layout from '@/components/layout';
import { GetServerSidePropsContext } from 'next';
import PostLists from '@/components/posts/PostLists';

type Props = {
	myId: number;
};

const MyPost = ({ myId }: Props) => {
	return (
		<Layout>
			<PostLists url={`api/post/user/${myId}`} />
		</Layout>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	// get accessToken from cookie
	const accessToken = context.req.cookies.accessToken;
	if (!accessToken) {
		console.log('no access token');
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
		console.log('not ok');
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
			myId: user.id,
		},
	};
};

export default MyPost;
