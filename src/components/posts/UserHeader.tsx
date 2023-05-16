import {
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
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
};

const UserHeader = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const settings: Setting[] = [
		{
			id: 10,
			name: 'Show post',
			Icon: MdRemoveRedEye,
			onClick: () => {
				console.log('show post');
			},
		},
		{
			id: 20,
			name: 'Add user',
			Icon: MdAddBox,
			onClick: () => {
				console.log('MdAddBox');
			},
		},
		{
			id: 30,
			name: 'Message',
			Icon: MdMessage,
			onClick: () => {
				console.log('MdMessage');
			},
		},
		{
			id: 40,
			name: 'Report user',
			Icon: MdReportProblem,
			onClick: () => {
				console.log('report user');
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
				<Avatar src={''} />
				<div className='flex flex-col justify-between'>
					<p className='font-bold'>username</p>
					<p className='text-xs'>@username</p>
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
					{settings.map((setting) => (
						<MenuItem
							key={setting.id}
							onClick={handleCloseUserMenu}
							className='hover-primary-menu hover:text-white flex gap-2'
						>
							<setting.Icon />
							<Typography textAlign='center' onClick={setting.onClick}>
								{setting.name}
							</Typography>
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default UserHeader;
