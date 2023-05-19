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

export const usePostForm = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);
	const { postFn } = usePost<IPost, IPost>('api/post/save');
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
		console.log(Array.from(files));
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
			const imagesToSend: IImage[] = images.map((image) => ({
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
	};
};
