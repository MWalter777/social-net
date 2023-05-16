import React from 'react';
import UserHeader from './UserHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';

const Post = () => {
	return (
		<div className='w-full bg-white text-primary flex flex-col p-2 gap-2 rounded-sm shadow-lg'>
			<UserHeader />
			<PostContent />
			<PostActions />
		</div>
	);
};

export default Post;
