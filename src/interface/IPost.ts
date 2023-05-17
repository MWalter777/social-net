import { IUser } from './IUser';

export interface IPost {
	id: string;
	user: IUser;
	title: string;
	body: string;
	images: IImage[];
}

export interface IImage {
	id: string;
	url: string;
	title: string;
	description: string;
}
