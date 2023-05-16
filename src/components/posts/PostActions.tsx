import { getShortNumber } from '@/utils/getNumbers';
import { IconButton } from '@mui/material';
import React from 'react';
import { FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa';

const PostActions = () => {
	const handleLike = () => {
		console.log('like');
	};

	const handleComment = () => {
		console.log('comment');
	};

	const handleShare = () => {
		console.log('share');
	};

	return (
		<div className='w-full h-5 flex justify-between sm:justify-start sm:gap-4'>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }} id='like' onClick={handleLike}>
					<FaHeart className={`w-5 text-gray-300`} />
				</IconButton>
				<label htmlFor='like' className='text-xs'>
					{getShortNumber(400_000)}
				</label>
			</div>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }} id='comment' onClick={handleComment}>
					<FaCommentAlt className={`w-5 text-primary`} />
				</IconButton>
				<label htmlFor='comment' className='text-xs'>
					{getShortNumber(4_000_000)}
				</label>
			</div>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }} id='share' onClick={handleShare}>
					<FaShare className={`w-5 text-primary`} />
				</IconButton>
				<label htmlFor='share' className='text-xs'>
					{getShortNumber(400_000_000)}
				</label>
			</div>
		</div>
	);
};

export default PostActions;
