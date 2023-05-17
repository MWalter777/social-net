import React, { useState } from 'react';
import Layout from '@/components/layout';
import { FileUploader } from 'react-drag-drop-files';
import { FaTrashAlt } from 'react-icons/fa';
import TextField from '@/components/Input/TextField';
import { Button, TextareaAutosize } from '@mui/material';
import { MdOutlineTitle } from 'react-icons/md';
import { imageToBase64 } from '@/utils/simpleImageHandle';

const fileTypes = ['JPEG', 'PNG', 'GIF'];

const sendFiles = async (files: File[]) => {
	const images = await Promise.all(files.map(imageToBase64));
	const data = await (
		await fetch('/api/cloudinary', {
			method: 'POST',
			body: JSON.stringify({ images }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	).json();
	console.log(data);
	return data;
};

const CreatePost = () => {
	const [files, setFiles] = useState<File[]>([]);
	const handleChange = (files: FileList) => {
		setFiles(Array.from(files));
	};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendFiles(files);
	};
	const removeFile = (name: string) => {
		const newFiles = files.filter((file) => file.name !== name);
		setFiles(newFiles);
	};
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				<form
					className='w-full md:w-10/12 lg:w-8/12 bg-white text-primary flex flex-col p-2 md:p-4 lg:p-8 gap-2 rounded-sm shadow-lg items-center justify-center'
					onSubmit={onSubmit}
				>
					<div className='px-4 w-full flex justify-between'>
						<h1 className='font-bold'>New Post</h1>
						<Button className='custom-btn' type='submit'>
							Save
						</Button>
					</div>
					<TextField
						StartAdornment={MdOutlineTitle}
						id='title'
						label='title'
						onChange={() => {}}
						value=''
					/>
					<div className='px-4 w-full'>
						<TextareaAutosize
							className='w-full h-32 p-2 border border-primary rounded-lg outline-none text-gray-700 text-sm'
							minRows={3}
							placeholder='Body'
						/>
					</div>
					<div className='max-w-[508px] w-full justify-center items-center px-4 overflow-hidden drag-and-drop-files'>
						<FileUploader
							multiple={true}
							handleChange={handleChange}
							name='files'
							types={fileTypes}
						/>
						<div className='flex flex-col gap-2 my-4'>
							{files.map((file, index) => (
								<div
									key={index}
									className='flex justify-between items-center px-2 py-1 bg-primary bg-opacity-80 rounded-xl text-white'
								>
									{file.name}
									<FaTrashAlt
										className='cursor-pointer'
										onClick={() => removeFile(file.name)}
									/>
								</div>
							))}
						</div>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default CreatePost;
