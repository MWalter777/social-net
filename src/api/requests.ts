import { IResponseValidation } from '@/interface/IResponseValidation';

type Props = {
	provider: string;
	id: string;
	email: string;
	name: string;
	token: string;
};
export const getAccessToken = async ({
	email,
	id,
	name,
	provider,
	token,
}: Props) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}validate-token`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				provider,
				id,
				email,
				name,
				token,
			}),
		}
	);
	const data: IResponseValidation = await res.json();
	return data;
};
