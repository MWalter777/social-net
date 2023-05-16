import React from 'react';
import UserHeader from './UserHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';

type Props = {
	noShowPost?: boolean;
};

const Post = ({ noShowPost = false }: Props) => {
	return (
		<div className='w-full md:w-10/12 lg:w-8/12 bg-white text-primary flex flex-col p-2 md:p-4 lg:p-8 gap-2 rounded-sm shadow-lg'>
			<UserHeader noShowPost />
			<PostContent />
			<PostActions />
		</div>
	);
};

export default Post;
