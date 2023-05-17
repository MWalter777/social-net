import Layout from '@/components/layout';
import Post from '@/components/posts';
import { POSTS } from '@/constant/temporal';
import Link from 'next/link';
import { BsPlus } from 'react-icons/bs';

export default function Home() {
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				{POSTS.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
			<Link href='/create-post' className='fixed bottom-8 right-8'>
				<BsPlus className='bg-primary rounded-full shadow-xl text-white fixed bottom-8 right-8 cursor-pointer hover:scale-105 w-10 h-10 md:w-16 md:h-16' />
			</Link>
		</Layout>
	);
}
