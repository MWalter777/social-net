import React, { ChangeEvent } from 'react';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import { IconType } from 'react-icons';
import { type } from 'os';

type Props = {
	label: string;
	id: string;
	StartAdornment: IconType;
	value: string;
	name?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	error?: string;
};

const TextField = ({
	id,
	label,
	onChange,
	StartAdornment,
	value,
	name = label,
	type = 'text',
	error = '',
}: Props) => {
	return (
		<div className='w-full px-4'>
			<FormControl variant='standard' className='w-full'>
				<InputLabel
					classes={{
						filled: 'text-primary capitalize',
						animated: 'text-primary capitalize',
						standard: 'text-primary capitalize',
						focused: 'text-primary capitalize',
					}}
					htmlFor={id}
				>
					{label}
				</InputLabel>
				<Input
					id={id}
					classes={{ input: 'text-primary border-primary' }}
					value={value}
					onChange={onChange}
					name={name}
					type={type}
					startAdornment={
						<InputAdornment position='start'>
							<StartAdornment className='text-primary' />
						</InputAdornment>
					}
				/>
				<span className='text-red-900 text-xs'>{error}</span>
			</FormControl>
		</div>
	);
};

export default TextField;
