import { IUser } from './IUser';

export interface IPost {
	id?: string;
	user?: IUser;
	title: string;
	body: string;
	images: IImage[];
}

export interface IImage {
	id?: string;
	assetId: string;
	publicId: string;
	url: string;
	secureUrl: string;
	format: string;
	type: string;
}
