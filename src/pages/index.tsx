import Layout from '@/components/layout';
import Post from '@/components/posts';
import { BASE_BACKEND_URL } from '@/constant/urls';
import { IPost } from '@/interface/IPost';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { BsPlus } from 'react-icons/bs';

type Props = {
	posts: IPost[];
};

const Home = ({ posts }: Props) => {
	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
			<Link href='/create-post' className='fixed bottom-8 right-8'>
				<BsPlus className='bg-primary rounded-full shadow-xl text-white fixed bottom-8 right-8 cursor-pointer hover:scale-105 w-10 h-10 md:w-16 md:h-16' />
			</Link>
		</Layout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const accessToken = context.req.cookies.accessToken;
	const res = await fetch(`${BASE_BACKEND_URL}api/post`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const { data }: { data: IPost[] } = await res.json();
	return {
		props: {
			posts: data,
		},
	};
}

export default Home;
