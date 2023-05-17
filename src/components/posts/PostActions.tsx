import { getShortNumber } from '@/utils/getNumbers';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa';

type Props = {
	postId: string;
};

const PostActions = ({ postId }: Props) => {
	const handleLike = () => {
		console.log('like', postId);
	};

	const handleShare = () => {
		console.log('share', postId);
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
				<Link href={'/p/1'} id='comment'>
					<FaCommentAlt className={`w-5 text-primary`} />
				</Link>
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
