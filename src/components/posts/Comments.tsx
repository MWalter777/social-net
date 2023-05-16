import React from 'react';
import UserHeader from './UserHeader';

const Comments = () => {
	return (
		<div className='w-full md:w-10/12 lg:w-8/12 p-2 bg-white text-sm text-justify'>
			<UserHeader noShowPost />
			<div className='w-full text-justify p-1 my-4'>
				<p className='text-gray-700'>
					Ullamco ex reprehenderit consectetur occaecat occaecat excepteur
					adipisicing ipsum ad eiusmod. Voluptate cillum sint elit enim qui et
					ut exercitation. Nulla sit eiusmod eu commodo ex. Exercitation et
					dolor veniam voluptate aliquip incididunt laborum eiusmod eiusmod
					mollit nulla in velit. Anim voluptate exercitation reprehenderit
					adipisicing minim consectetur. Labore dolor sint eu mollit sit elit
					amet tempor. Id minim dolore excepteur consequat eiusmod.
				</p>
			</div>
		</div>
	);
};

export default Comments;
