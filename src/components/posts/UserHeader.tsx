import {
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { MouseEvent, useState } from 'react';
import { IconType } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
	MdAddBox,
	MdMessage,
	MdRemoveRedEye,
	MdReportProblem,
} from 'react-icons/md';

type Setting = {
	id: number;
	name: string;
	Icon: IconType;
	onClick?: () => void;
	link?: string;
};

type Props = {
	id: string;
	name: string;
	avatar: string;
	postId: string;
	username: string;
	noShowPost?: boolean;
};

const UserHeader = ({
	noShowPost = false,
	avatar,
	id,
	name,
	username,
	postId,
}: Props) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const settings: Setting[] = [
		{
			id: 10,
			name: 'Show post',
			Icon: MdRemoveRedEye,
			link: `/p/${postId}`,
		},
		{
			id: 20,
			name: 'Add user',
			Icon: MdAddBox,
			onClick: () => {
				console.log('MdAddBox', id);
			},
		},
		{
			id: 30,
			name: 'Message',
			Icon: MdMessage,
			onClick: () => {
				console.log('MdMessage', id);
			},
		},
		{
			id: 40,
			name: 'Report user',
			Icon: MdReportProblem,
			onClick: () => {
				console.log('report user', id);
			},
		},
	];

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<div className='flex justify-between items-center'>
			<div className='flex gap-4 items-center'>
				<Avatar src={avatar} />
				<div className='flex flex-col justify-between'>
					<p className='font-bold'>{name}</p>
					<p className='text-xs'>{username}</p>
				</div>
			</div>
			<div>
				<Tooltip title='Open settings'>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<BsThreeDotsVertical />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id='menu-appbar'
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{settings.slice(+noShowPost).map((setting) => (
						<MenuItem
							key={setting.id}
							onClick={handleCloseUserMenu}
							className='hover-primary-menu hover:text-white flex gap-2'
						>
							<setting.Icon />
							{setting.onClick && (
								<Typography textAlign='center' onClick={setting.onClick}>
									{setting.name}
								</Typography>
							)}
							{setting.link && (
								<Link href={setting.link}>
									<Typography textAlign='center'>{setting.name}</Typography>
								</Link>
							)}
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default UserHeader;
