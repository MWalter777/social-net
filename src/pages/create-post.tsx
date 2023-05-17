import React, { useState } from 'react';
import Layout from '@/components/layout';
import { FileUploader } from 'react-drag-drop-files';
import { FaTrashAlt } from 'react-icons/fa';
import TextField from '@/components/Input/TextField';
import { Button, TextareaAutosize } from '@mui/material';
import { MdOutlineTitle } from 'react-icons/md';
import { imageToBase64 } from '@/utils/simpleImageHandle';
import { IPostImages } from '@/interface/IPostImages';

const fileTypes = ['JPEG', 'PNG', 'GIF'];

const sendFiles = async (files: File[]) => {
	if (!files.length) return [];
	const images = await Promise.all(files.map(imageToBase64));
	const data: IPostImages = await (
		await fetch('/api/cloudinary', {
			method: 'POST',
			body: JSON.stringify({ images }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	).json();
	return data.images;
};

const CreatePost = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);
	const [data, setData] = useState({
		title: {
			value: '',
			error: '',
		},
		body: {
			value: '',
			error: '',
		},
		error: '',
	});
	const handleChange = (files: FileList) => {
		setFiles(Array.from(files));
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data.title.value) {
			setData({
				...data,
				title: { ...data.title, error: 'Title is required' },
			});
			return;
		}
		if (!data.body.value) {
			setData({
				...data,
				body: { ...data.body, error: 'Body is required' },
			});
			return;
		}
		setUploading(true);
		try {
			const images = await sendFiles(files);
			const imagesUrl = images.map((image) => image.secure_url);
		} catch (err) {
			console.log(err);
		} finally {
			setUploading(false);
		}
	};
	const removeFile = (name: string) => {
		const newFiles = files.filter((file) => file.name !== name);
		setFiles(newFiles);
	};
	const handleInputChange = (e: {
		target: { name: string; value: string };
	}) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: { value, error: '' }, error: '' });
	};

	console.log(data);

	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				<form
					className='w-full md:w-10/12 lg:w-8/12 bg-white text-primary flex flex-col p-2 md:p-4 lg:p-8 gap-2 rounded-sm shadow-lg items-center justify-center'
					onSubmit={onSubmit}
				>
					<div className='px-4 w-full flex justify-between'>
						<h1 className='font-bold'>New Post</h1>
						<Button disabled={uploading} className='custom-btn' type='submit'>
							Save
						</Button>
					</div>
					<div className='w-full flex flex-col'>
						<TextField
							StartAdornment={MdOutlineTitle}
							id='title'
							label='title'
							onChange={handleInputChange}
							value={data.title.value}
						/>
						<span className='w-full text-red-700 text-xs px-4'>
							{data.title.error}
						</span>
					</div>
					<div className='px-4 w-full'>
						<TextareaAutosize
							className='w-full h-32 p-2 border border-primary rounded-lg outline-none text-gray-700 text-sm'
							minRows={3}
							placeholder='Body'
							name='body'
							id='body'
							onChange={handleInputChange}
							value={data.body.value}
						/>
						<span className='w-full text-red-700 text-xs'>
							{data.body.error}
						</span>
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
