import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import LogoFull from '@/assets/logo-full.png';
import Logo from '@/assets/logo.png';
import { IPost } from '@/interface/IPost';
import { validateImageUrl } from '@/utils/validateImage';

type Props = {
	noShowPost?: boolean;
	post: IPost;
};

const PostContent = ({ noShowPost = false, post }: Props) => {
	return (
		<div className='text-gray-700'>
			<pre
				className={`text-justify px-1 text-sm md:text-base font-sans ${
					!noShowPost && 'truncate-3'
				}`}
			>
				{post.body}
			</pre>
			{post.images.length > 0 && (
				<div>
					<Carousel showThumbs={false}>
						{post.images
							.filter((img) => validateImageUrl(img.url))
							.map((image) => (
								<div key={image.id}>
									<Image src={image.url} width={100} height={100} alt='logo' />
								</div>
							))}
					</Carousel>
				</div>
			)}
		</div>
	);
};

export default PostContent;
