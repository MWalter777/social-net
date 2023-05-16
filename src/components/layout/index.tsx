import React, { ReactElement } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import Head from 'next/head';

type Props = {
	children: ReactElement | ReactElement[] | string;
	title?: string;
	description?: string;
};

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
			<div className='flex flex-col'>
				<nav className='flex flex-col'>
					<ResponsiveAppBar />
				</nav>
				<main className='m-4'>{children}</main>
			</div>
		</div>
	);
};

export default Layout;