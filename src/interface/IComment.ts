import { IPost } from './IPost';
import { IUser } from './IUser';

export interface IComment {
	id: string;
	user: IUser;
	title: string;
	body: string;
	createdAt: Date;
	post: IPost;
}
