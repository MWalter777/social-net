import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PAGES_URL, SETTINGS } from '@/constant/navigation';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/logo.png';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import FullLogo from '../Images/FullLogo';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';

type Props = {
	session?: Session;
};

function ResponsiveAppBar({ session }: Props) {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const { pathname } = useRouter();

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='static' style={{ backgroundColor: '#e58339' }}>
			<Container className='w-full'>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<Image src={Logo} alt='LOGO' height={40} />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
							classes={{ paper: 'w-7/12' }}
						>
							{PAGES_URL.map((page) => (
								<div
									key={page.id}
									className={`flex items-center p-2 px-4 gap-2 hover:bg-primary hover:text-white cursor-pointer ${
										pathname === page.url ? 'bg-primary text-white' : ''
									}`}
								>
									<page.Icon />
									<Link className='text-sm' href={page.url}>
										{page.name}
									</Link>
								</div>
							))}
						</Menu>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<FullLogo fill='#fff' fillText='#fff' className='w-28' />
						{PAGES_URL.map((page) => (
							<div
								key={page.id}
								className={`flex items-center h-min px-2 gap-1 hover:border-b cursor-pointer ${
									pathname === page.url ? 'border-b' : ''
								}`}
							>
								<page.Icon />
								<Link className='text-sm' href={page.url}>
									{page.name}
								</Link>
							</div>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt='Profile' src={session?.user?.image || ''} />
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
							{SETTINGS.map((setting) => (
								<MenuItem
									key={setting.id}
									onClick={handleCloseUserMenu}
									className='hover:bg-primary hover:text-white flex gap-2'
								>
									<setting.Icon />
									{setting.onClick && (
										<Typography textAlign='center' onClick={setting.onClick}>
											{setting.name}
										</Typography>
									)}
									{setting.url && (
										<Link href={setting.url}>{setting.name}</Link>
									)}
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
