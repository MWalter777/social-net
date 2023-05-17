// Convert Base64 to image
export function base64ToImage(base64Data: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();

		image.onload = () => {
			resolve(image);
		};

		image.onerror = (error) => {
			reject(error);
		};

		image.src = base64Data;
	});
}

// Convert image: File to Base64
export function imageToBase64(
	image: File
): Promise<string | ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(image);
	});
}
