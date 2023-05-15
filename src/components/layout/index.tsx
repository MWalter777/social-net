import React, { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// images
import Logo from '../../assets/logo.png';
import FullLogo from '../../assets/logo-full.png';
import { Autocomplete, TextField } from '@mui/material';
import { PAGES_URL } from '@/constant/navigation';
import Link from 'next/link';

type Props = {
	children: ReactElement | ReactElement[] | string;
	title?: string;
	description?: string;
};

const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{
		title: 'The Lord of the Rings: The Return of the King',
		year: 2003,
	},
];

const Layout = ({
	children,
	title = 'Social Net',
	description = 'Social Net',
}: Props) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex flex-col md:flex-row'>
				<nav className='flex flex-col'>
					{/** tablet or desktop */}
					<div className='hidden md:flex w-full h-12 shadow bg-white items-center px-5 py-1 justify-between fixed'>
						<Image src={FullLogo} alt='Logo' height={40} />
						<Autocomplete
							options={top100Films}
							getOptionLabel={(option) => option.title}
							className='w-7/12'
							disableListWrap
							renderInput={(params) => (
								<TextField
									{...params}
									variant='standard'
									placeholder='Categories'
									className='w-full'
								/>
							)}
						/>
					</div>
					{/** mobile */}
					<div className='flex w-full md:hidden h-12 shadow bg-white items-center px-5 py-1 justify-between fixed'>
						<Image src={Logo} alt='Logo' height={40} />
						<Autocomplete
							options={top100Films}
							getOptionLabel={(option) => option.title}
							className='w-9/12'
							disableListWrap
							renderInput={(params) => (
								<TextField
									{...params}
									variant='standard'
									placeholder='Categories'
									className='w-full'
								/>
							)}
						/>
					</div>
					<div className='flex gap-2 flex-col absolute -left-1 top-14 bg-white w-7/12 px-4 py-2 shadow-lg md:w-72'>
						{PAGES_URL.map((page) => (
							<div
								key={page.id}
								className='flex items-center p-2 gap-2 rounded-2xl hover:bg-gray-100 cursor-pointer'
							>
								<page.Icon />
								<Link className='text-sm' href={page.url}>
									{page.name}
								</Link>
							</div>
						))}
					</div>
				</nav>
				<main className='mt-12'>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
