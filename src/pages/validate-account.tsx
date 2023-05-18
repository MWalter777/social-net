import React from 'react';
import Spinner from '@/components/Spinner';
import { SpinnerT } from '@/interface/SpinnerT';
import { RequestContext } from 'next/dist/server/base-server';
import { getSession } from 'next-auth/react';

const ValidateAccount = () => {
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
};

export const getServerSideProps = async (context: RequestContext) => {
	const session = await getSession(context);
	if (!session || !session.user || !session.user.email || !session.user.name)
		return {
			redirect: {
				destination: '/login?error=cannotValidateAccount',
			},
		};
	return {
		redirect: {
			destination: '/',
		},
	};
};

export default ValidateAccount;
