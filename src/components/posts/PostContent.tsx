import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import LogoFull from '@/assets/logo-full.png';
import Logo from '@/assets/logo.png';

const PostContent = () => {
	return (
		<div className='text-gray-700'>
			<p className='text-justify px-1 text-sm md:text-base truncate-3'>
				Elit ipsum id elit cupidatat elit sunt adipisicing nisi esse commodo.
				Deserunt esse magna eu nisi reprehenderit mollit reprehenderit eu magna
			</p>
			<div>
				<Carousel>
					<div>
						<Image src={Logo} alt='logo' />
						<p className='legend'>Legend 1</p>
					</div>
					<div>
						<Image src={LogoFull} alt='logo' />
						<p className='legend'>Legend 2</p>
					</div>
					<div>
						<Image src={Logo} alt='logo' />
						<p className='legend'>Legend 3</p>
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default PostContent;
