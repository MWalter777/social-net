import React from 'react';
import UserHeader from './UserHeader';

const Post = () => {
	return (
		<div className='w-full bg-white text-primary flex flex-col p-2 gap-2 rounded-sm shadow-lg'>
			<UserHeader />
			<div className='text-gray-700'>
				<p className='text-justify px-1 text-sm md:text-base'>
					Nostrud sit minim aliqua pariatur do in nisi eu nulla eu nisi. Ipsum
					commodo amet dolor elit non esse. Aliqua ad dolor do exercitation
					nostrud nulla.
				</p>
			</div>
		</div>
	);
};

export default Post;
