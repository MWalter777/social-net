import React, { useState } from 'react';
import TextField from '../Input/TextField';
import { BsSend } from 'react-icons/bs';

type NewCommentT = {
	userId: string;
	comment: string;
};

type Props = {
	userId: string;
};

const NewComment = ({ userId }: Props) => {
	const [comment, setComment] = useState<NewCommentT>({
		userId: userId,
		comment: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(comment);
		setComment({ ...comment, userId, comment: '' });
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment({ ...comment, userId, [e.target.name]: e.target.value });
	};

	return (
		<form
			action=''
			className='w-full md:w-10/12 lg:w-8/12 bg-white my-2 p-2'
			onSubmit={handleSubmit}
		>
			<TextField
				id='comment'
				StartAdornment={BsSend}
				label='comment'
				onChange={handleCommentChange}
				value={comment.comment}
				name='comment'
			/>
		</form>
	);
};

export default NewComment;
