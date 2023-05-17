import React from 'react';
import UserHeader from './UserHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import { IPost } from '@/interface/IPost';

type Props = {
	noShowPost?: boolean;
	post: IPost;
};

const Post = ({ noShowPost = false, post }: Props) => {
	return (
		<div className='w-full md:w-10/12 lg:w-8/12 bg-white text-primary flex flex-col p-2 md:p-4 lg:p-8 gap-2 rounded-sm shadow-lg'>
			<UserHeader {...post.user} postId={post.id} noShowPost={noShowPost} />
			<PostContent post={post} noShowPost={noShowPost} />
			<PostActions postId={post.id} />
		</div>
	);
};

export default Post;
