import Layout from '@/components/layout';
import Post from '@/components/posts';
import Comments from '@/components/posts/Comments';
import React from 'react';

const PostID = () => {
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				<Post noShowPost />
				<Comments />
			</div>
		</Layout>
	);
};

export default PostID;
