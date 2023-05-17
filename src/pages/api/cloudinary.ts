import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

// Configuration
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
	api_key: process.env.CLOUDINARY_API_KEY || '',
	api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

type Data = {
	name?: string;
	error?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ images: cloudinary.UploadApiResponse[] } | Data>
) {
	if (req.method === 'POST') {
		const { images: imagesBase64 }: { images: string[] } = req.body;
		const images = await Promise.all(
			imagesBase64.map((image) =>
				cloudinary.v2.uploader.upload(image, function (error, result) {
					console.log(result, error);
				})
			)
		);

		res.status(200).json({ images });
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
