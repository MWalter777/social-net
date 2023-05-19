import React, { ReactElement, useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { SpinnerT } from '@/interface/SpinnerT';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

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
	const { data, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login');
	}, [status]);
	if (status === 'loading' || status === 'unauthenticated') {
		const randomSpinner: SpinnerT[] = [
			'default',
			'ripple',
			'hourglass',
			'roller',
			'default',
		];
		return (
			<div className='w-full h-screen bg-primary flex justify-center items-center'>
				<Spinner
					type={randomSpinner[Math.floor(Math.random() * randomSpinner.length)]}
				/>
			</div>
		);
	}
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex flex-col'>
				<nav className='flex flex-col'>
					<ResponsiveAppBar data={data} />
				</nav>
				<main className='my-4 mx-1'>{children}</main>
			</div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
