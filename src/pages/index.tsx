import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import Post from '@/components/posts';
import useGetListData from '@/hooks/useGetListData';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { IPost } from '@/interface/IPost';
import Link from 'next/link';
import { BsPlus } from 'react-icons/bs';

const Home = () => {
	const {
		data: posts,
		hasNext,
		onLoadMore,
		loading,
	} = useGetListData<IPost>('api/post');

	const [sentryRef, { rootRef }] = useInfiniteScroll({
		loading,
		hasNextPage: hasNext,
		onLoadMore,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: false,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});

	return (
		<Layout>
			<div className='w-full flex flex-col gap-1 items-center justify-center'>
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
				{hasNext && (
					<div className='w-full flex justify-center' ref={sentryRef}>
						<Spinner />
					</div>
				)}
			</div>
			<Link href='/create-post' className='fixed bottom-8 right-8'>
				<BsPlus className='bg-primary rounded-full shadow-xl text-white fixed bottom-8 right-8 cursor-pointer hover:scale-105 w-10 h-10 md:w-16 md:h-16' />
			</Link>
		</Layout>
	);
};

export default Home;
