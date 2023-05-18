export interface IResponseValidation {
	accessToken: string;
	user: {
		id: string;
		username: String;
		name: String;
		email: String;
		provider: String;
		enable: true;
		createAt: String;
	};
}
