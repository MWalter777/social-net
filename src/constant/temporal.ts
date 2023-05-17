import { IComment } from '@/interface/IComment';
import { IPost } from '@/interface/IPost';
import { IUser } from '@/interface/IUser';

const user: IUser = {
	id: '1',
	name: 'User 1',
	avatar: 'https://picsum.photos/200/300',
	username: 'user1',
	email: '',
};

const post1: IPost = {
	id: '1',
	title: 'Post 1',
	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliqu',
	images: [],
	user,
};

export const POSTS: IPost[] = Array(10)
	.fill(0)
	.map((post, index) => ({ ...post1, id: `${index + 1}` }));

export const COMMENTS: IComment[] = Array(10)
	.fill(0)
	.map((_, index) => ({
		id: `${index + 1}`,
		user,
		title: `Comment ${index + 1}`,
		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliqu',
		createdAt: new Date(),
		post: post1,
	}));
