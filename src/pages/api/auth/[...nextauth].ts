import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import GitlabProvider from 'next-auth/providers/gitlab';
import { IResponseValidation } from '@/interface/IResponseValidation';

export const authOptions: AuthOptions = {
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
	callbacks: {
		async signIn({ user, account }) {
			if (!user || !user.email || !user.id || !user.email) return false;
			if (account && account.provider === 'github') {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}validate-token`,
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer ${account.access_token}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								provider: account.provider,
								id: user.id,
								email: user.email,
								name: user.name,
								token: account.access_token,
							}),
						}
					);
					const data: IResponseValidation = await res.json();
					if (data.accessToken) {
						account.access_token = data.accessToken;
						console.log('signIn', account);
						return true;
					}
				} catch (err) {
					console.log(err);
				}
			}
			return false;
		},
	},
};

export default NextAuth(authOptions);
