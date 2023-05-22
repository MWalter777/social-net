import { IUser } from './IUser';

export interface IMessage {
	id: number;
	message: string;
	date: Date;
	user: IUser;
}
