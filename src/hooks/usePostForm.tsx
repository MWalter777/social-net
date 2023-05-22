import { IImage, IPost } from '@/interface/IPost';
import usePost from '@/hooks/usePost';
import { useRef, useState } from 'react';
import { IPostImages } from '@/interface/IPostImages';
import { imageToBase64 } from '@/utils/simpleImageHandle';

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
type PostToSend = Omit<IPost, 'id' | 'user' | 'images'> & {
	images: Omit<IImage, 'id'>[];
};
export const usePostForm = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [errors, setErrors] = useState<{ message: string; field: string }[]>(
		[]
	);
	const [uploading, setUploading] = useState(false);
	const { postFn } = usePost<PostToSend, IPost>('api/post/save');
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
		if (!data.title.value || data.title.value.length > 250) {
			setData({
				...data,
				title: {
					...data.title,
					error:
						data.title.value.length <= 250
							? 'Title is required'
							: 'Title should be less than 250 characters',
				},
			});
			return;
		}
		if (!data.body.value || data.body.value.length > 5000) {
			setData({
				...data,
				body: {
					...data.body,
					error:
						data.body.value.length <= 5000
							? 'Body is required'
							: 'Body should be less than 5000 characters',
				},
			});
			return;
		}
		setUploading(true);
		try {
			const images = await sendFiles(files);
			const imagesToSend: Omit<IImage, 'id'>[] = images.map((image) => ({
				url: image.url,
				publicId: image.public_id,
				assetId: image.asset_id,
				secureUrl: image.secure_url,
				format: image.format,
				type: image.type,
			}));
			const post = await postFn({
				title: data.title.value,
				body: data.body.value,
				images: imagesToSend,
			});
			if (Array.isArray(post)) {
				setErrors(post);
				return;
			}
			if (post.id) {
				setData({
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
				setFiles([]);
			}
		} catch (err) {
			console.error(err);
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

	return {
		handleChange,
		onSubmit,
		removeFile,
		handleInputChange,
		uploading,
		data,
		files,
		errors,
	};
};
