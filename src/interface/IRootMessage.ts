import { IUser } from './IUser';

export interface IRootMessage {
	createAt: string;
	id: number;
	lastMessage: string;
	readIt: boolean;
	recipient: IUser;
	sender: IUser;
}
