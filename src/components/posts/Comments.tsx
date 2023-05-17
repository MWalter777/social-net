import React from 'react';
import UserHeader from './UserHeader';
import { IComment } from '@/interface/IComment';

type Props = {
	comment: IComment;
};

const Comments = ({ comment }: Props) => {
	return (
		<div className='w-full md:w-10/12 lg:w-8/12 p-2 bg-white text-sm text-justify'>
			<UserHeader noShowPost {...comment.user} postId={comment.post.id} />
			<div className='w-full text-justify p-1 my-4'>
				<p className='text-gray-700'>{comment.body}</p>
			</div>
		</div>
	);
};

export default Comments;
