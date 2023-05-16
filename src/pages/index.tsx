import Layout from '@/components/layout';
import Post from '@/components/posts';

export default function Home() {
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				<Post />
				<Post />
				<Post />
			</div>
		</Layout>
	);
}
