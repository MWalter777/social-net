import {
	AiFillFire,
	AiOutlineHome,
	AiOutlineMessage,
	AiOutlineUserAdd,
	AiOutlineLogout,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdGroups } from 'react-icons/md';

import { signOut } from 'next-auth/react';

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

export const SETTINGS = [
	{
		id: 1,
		name: 'Profile',
		url: '/profile',
		Icon: CgProfile,
	},
	{
		id: 2,
		name: 'logout',
		onClick: () => signOut(),
		Icon: AiOutlineLogout,
	},
];
