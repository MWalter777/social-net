import Layout from '@/components/layout';
import Post from '@/components/posts';
import { POSTS } from '@/constant/temporal';

export default function Home() {
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				{POSTS.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</Layout>
	);
}
