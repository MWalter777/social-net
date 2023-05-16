import { getShortNumber } from '@/utils/getNumbers';
import { IconButton } from '@mui/material';
import React from 'react';
import { FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa';

const PostActions = () => {
	return (
		<div className='w-full h-5 flex justify-between sm:justify-start sm:gap-4'>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }}>
					<FaHeart className={`w-5 text-gray-300`} />
				</IconButton>
				<span className='text-xs'>{getShortNumber(400_000)}</span>
			</div>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }}>
					<FaCommentAlt className={`w-5 text-primary`} />
				</IconButton>
				<span className='text-xs'>{getShortNumber(4_000_000)}</span>
			</div>
			<div className='flex items-center gap-2'>
				<IconButton sx={{ p: 0 }}>
					<FaShare className={`w-5 text-primary`} />
				</IconButton>
				<span className='text-xs'>{getShortNumber(400_000_000)}</span>
			</div>
		</div>
	);
};

export default PostActions;
