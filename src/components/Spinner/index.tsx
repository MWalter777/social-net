import { SpinnerT } from '@/interface/SpinnerT';
import React, { ReactElement } from 'react';

type Props = {
	type?: SpinnerT;
};

const spinners = {
	default: (
		<div className='lds-spinner'>
			{[...Array(12)].map((_, index) => (
				<div key={index}></div>
			))}
		</div>
	),
	ripple: (
		<div className='lds-ripple'>
			<div></div>
			<div></div>
		</div>
	),
	hourglass: <div className='lds-hourglass'></div>,
	roller: (
		<div className='lds-roller'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	),
};

const Spinner = ({ type = 'default' }: Props): ReactElement => {
	return spinners[type];
};

export default Spinner;
