import React from 'react';
import FullLogo from '@/components/Images/FullLogo';
import { BsGit, BsGoogle, BsGithub } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { RequestContext } from 'next/dist/server/base-server';
import { getSession } from 'next-auth/react';

const Login = () => {
	const loginWithGoogle = () => {
		signIn('google', {
			callbackUrl: `${process.env.NEXT_PUBLIC_URL}validate-account`,
		});
	};
	const loginWithGithub = () => {
		signIn('github', {
			callbackUrl: `${process.env.NEXT_PUBLIC_URL}validate-account`,
		});
	};
	const loginWithGitlab = () => {
		signIn('gitlab', {
			callbackUrl: `${process.env.NEXT_PUBLIC_URL}validate-account`,
		});
	};
	return (
		<div className='w-full h-screen flex flex-col items-center justify-center'>
			<div className='bg-white w-11/12 md:w-4/12 lg:3/12  shadow-xl rounded-xl mb-32'>
				<header className='bg-primary h-10 rounded-t-xl'>
					<FullLogo className='px-2 h-10 w-28' fill='#fff' fillText='#fff' />
				</header>
				<div className='flex flex-col gap-6 my-4 items-center'>
					<div className='flex justify-center gap-4'>
						<BsGoogle
							className='text-primary text-4xl cursor-pointer'
							onClick={loginWithGoogle}
						/>
						<BsGithub
							className='text-primary text-4xl cursor-pointer'
							onClick={loginWithGithub}
						/>
						<BsGit
							className='text-primary text-4xl cursor-pointer'
							onClick={loginWithGitlab}
						/>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export const getServerSideProps = async (context: RequestContext) => {
	const session = await getSession(context);
	if (!session)
		return {
			props: {},
		};
	return {
		redirect: {
			destination: '/',
		},
	};
};

export default Login;
