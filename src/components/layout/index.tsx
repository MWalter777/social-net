import React, { ReactElement } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Logo from '../Images/Logo';
import FullLogo from '../Images/FullLogo';

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
			<main>
				<Logo />
				<FullLogo />
				{children}
			</main>
		</div>
	);
};

export default Layout;
