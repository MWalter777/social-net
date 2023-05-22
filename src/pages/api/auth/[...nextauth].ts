import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import GitlabProvider from 'next-auth/providers/gitlab';
import { getAccessToken } from '@/api/requests';
import { SECRET_TOKEN } from '@/constant/token';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions: AuthOptions = {
	secret: SECRET_TOKEN,
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: SECRET_TOKEN,
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
		}),
		GitlabProvider({
			clientId: process.env.GITLAB_ID || '',
			clientSecret: process.env.GITLAB_SECRET || '',
		}),
	],
};

export default (req: NextApiRequest, res: NextApiResponse) => {
	const addCookie = (accessToken: string) => {
		res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/;`);
	};
	const signInCallback = async ({
		user,
		account,
	}: {
		user: any;
		account: any;
	}) => {
		if (!user || !user.email || !user.id || !user.email) return false;
		if (account && account.provider === 'github') {
			try {
				const data = await getAccessToken({
					provider: account.provider,
					id: user.id,
					email: user.email,
					name: user.name || '',
					token: account.access_token || '',
				});
				if (data.accessToken) {
					Object.assign(user, { accessToken: data.accessToken });
					console.log('adding cookie');
					addCookie(data.accessToken);
					return true;
				}
			} catch (err) {
				console.log(err);
			}
		}
		return false;
	};
	return NextAuth(req, res, {
		...authOptions,
		callbacks: { signIn: signInCallback },
	});
};
