import {
	AiFillFire,
	AiOutlineHome,
	AiOutlineMessage,
	AiOutlineUserAdd,
} from 'react-icons/ai';
import { MdGroups } from 'react-icons/md';

export const PAGES_URL = [
	{
		id: 1,
		name: 'Home',
		url: '/',
		Icon: AiOutlineHome,
	},
	{
		id: 2,
		name: 'My Posts',
		url: '/my-posts',
		Icon: AiFillFire,
	},
	{
		id: 20,
		name: 'Groups',
		url: '/groups',
		Icon: MdGroups,
	},
	{
		id: 30,
		name: 'Messages',
		url: '/messages',
		Icon: AiOutlineMessage,
	},
	{
		id: 40,
		name: 'Users',
		url: '/users',
		Icon: AiOutlineUserAdd,
	},
];
