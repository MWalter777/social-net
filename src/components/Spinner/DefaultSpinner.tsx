import React from 'react';

const DefaultSpinner = () => {
	return (
		<div className='lds-spinner'>
			{[...Array(12)].map((_, index) => (
				<div key={index}></div>
			))}
		</div>
	);
};

export default DefaultSpinner;
