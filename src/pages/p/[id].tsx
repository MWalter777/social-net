import Layout from '@/components/layout';
import Post from '@/components/posts';
import Comments from '@/components/posts/Comments';
import NewComment from '@/components/posts/NewComment';
import { COMMENTS, POSTS } from '@/constant/temporal';
import { IComment } from '@/interface/IComment';
import { IPost } from '@/interface/IPost';
import React from 'react';

type Props = {
	post: IPost;
	comments: IComment[];
};
const PostID = ({ post = POSTS[0], comments = COMMENTS }: Props) => {
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

export default PostID;
