import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { RequestContext } from 'next/dist/server/base-server';

type Props = {
	session?: Session;
};

export default function Home({ session }: Props) {
	return (
		<Layout session={session}>
			<div>main</div>
		</Layout>
	);
}
export const getServerSideProps = async (context: RequestContext) => {
	const session = await getSession(context);
	return {
		props: {
			session,
		},
	};
};
