import Layout from '@/components/layout';
import UserHeader from '@/components/posts/UserHeader';

export default function Home() {
	return (
		<Layout>
			<div className='w-full flex flex-col'>
				<div className='w-full bg-white text-primary flex flex-col p-2 rounded-sm shadow-lg'>
					<UserHeader />
					<div>askjhdfkj</div>
				</div>
			</div>
		</Layout>
	);
}
