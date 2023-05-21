import Layout from '@/components/layout';
import Post from '@/components/posts';
import Comments from '@/components/posts/Comments';
import NewComment from '@/components/posts/NewComment';
import { COMMENTS } from '@/constant/temporal';
import { BASE_BACKEND_URL } from '@/constant/urls';
import { IComment } from '@/interface/IComment';
import { IPost } from '@/interface/IPost';
import { GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';

type Props = {
	post: IPost;
};
const PostID = ({ post }: Props) => {
	const [comments, setComments] = useState<IComment[]>(COMMENTS);
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				<Post noShowPost post={post} />
				<NewComment userId={post.user.id} />
				{comments.map((comment) => (
					<Comments key={comment.id} comment={comment} />
				))}
			</div>
		</Layout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { params } = context;
	const id = params?.id && !Number.isNaN(params.id) ? +params.id : 0;
	console.log({ id });
	if (id <= 0)
		return {
			redirect: {
				destination: '/404',
			},
		};
	const accessToken = context.req.cookies.accessToken;
	const res = await fetch(`${BASE_BACKEND_URL}api/post/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const { data }: { data: IPost } = await res.json();
	if (!data)
		return {
			redirect: {
				destination: '/404',
			},
		};
	return {
		props: {
			post: data,
		},
	};
}

export default PostID;
