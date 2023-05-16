import FullLogo from '@/components/Images/FullLogo';
import { MdAccountCircle, MdPassword } from 'react-icons/md';
import React, { ChangeEvent } from 'react';
import TextField from '@/components/Input/TextField';
import { Button } from '@mui/material';
import { BsMicrosoft, BsGoogle, BsGithub } from 'react-icons/bs';
import Link from 'next/link';

type User = {
	username?: {
		value: string;
		error: string;
	};
	password?: {
		value: string;
		error: string;
	};
};

const Register = () => {
	const [user, setUser] = React.useState<User>({});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setUser((prev) => ({ ...prev, [name]: { value, error: '' } }));
	};
	const onSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!user.username?.value)
			return setUser((prev) => ({
				...prev,
				username: {
					error: 'Username is required',
					value: '',
					...prev.username,
				},
			}));
		if (!user.password?.value)
			return setUser((prev) => ({
				...prev,
				password: {
					error: 'Password is required',
					value: '',
					...prev.password,
				},
			}));

		console.log({ user });
	};
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='bg-white w-11/12 md:w-4/12 lg:3/12  shadow-xl rounded-xl'>
				<header className='bg-primary h-10 rounded-t-xl'>
					<FullLogo className='px-2 h-10 w-28' fill='#fff' fillText='#fff' />
				</header>
				<form
					className='flex flex-col gap-6 my-4 items-center'
					onSubmit={onSubmit}
				>
					<TextField
						id='username'
						label='username'
						StartAdornment={MdAccountCircle}
						value={user.username?.value || ''}
						onChange={onChange}
						error={user.username?.error || ''}
					/>
					<TextField
						id='password'
						label='password'
						type='password'
						StartAdornment={MdPassword}
						value={user.password?.value || ''}
						onChange={onChange}
						error={user.password?.error || ''}
					/>
					<Button
						type='submit'
						className='uppercase text-white bg-primary w-10/12 hover:bg-primary'
					>
						Register
					</Button>
					<div className='flex justify-center gap-4'>
						<BsGoogle className='text-primary text-4xl' />
						<BsGithub className='text-primary text-4xl' />
						<BsMicrosoft className='text-primary text-4xl' />
					</div>
					<div className='flex items-center'>
						<p className='text-primary text-sm'>Already have an account?</p>
						<Link href='/login' className='text-primary'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
