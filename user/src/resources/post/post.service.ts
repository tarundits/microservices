import PostModel from "../../resources/post/post.model";
import Post from "../../resources/post/post.interface";
import CustomError from "../../utils/exceptions/custom.exception";

class PostService {
	private post = PostModel;

	/**
	 * Create a new post
	 */
	public async create(title: string, body: string): Promise<Post> {
		try {
			const post = await this.post.create({ title, body });

			return post;
		} catch (error: any) {
			throw new Error('Unable to create the post.');
		}
	}

	public async fetchAll(): Promise<Post[]> {
		try {
			const posts = await this.post.find({});

			return posts;
		} catch (error: any) {
			throw new Error('No posts exists in the database.');
		}
	}

	public async update(id: string, title: string, body: string) {
		try {
			const existingPost = await this.post.findById({_id: id});

			if(existingPost) {
				existingPost.title = title;
				existingPost.body = body;

				const updatedPost = await existingPost.save();

				return updatedPost;
			} else {
				throw new CustomError('PostNotFoundError', 'Post not found.', 'ObjectId');
			}

		} catch (error: any) {
			if (error.name === 'PostNotFoundError' && error.kind === 'ObjectId') {
				throw new CustomError('PostNotFoundError', 'Post not found.', 'ObjectId');
			} else {
				throw new CustomError('UpdateError', 'Unable to update the post.');
			}
		}
	}
}

export default PostService;