import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/post/post.validation';
import PostService from '../../resources/post/post.service';

class PostController implements Controller {
	public path = '/posts';
	public router = Router();
	private PostService = new PostService();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(
			`${this.path}`,
			validationMiddleware(validate.create),
			this.create
		);

		this.router.get(
			`${this.path}`,
			this.fetch
		);

		this.router.put(
			`${this.path}`,
			validationMiddleware(validate.update),
			this.update
		);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { title, body } = req.body;

			const post = await this.PostService.create(title, body);

			res.status(201).json({ post });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	private fetch = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const posts = await this.PostService.fetchAll();

			res.status(200).json({ posts });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	private update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { id, title, body } = req.body;
			const post = await this.PostService.update(id, title, body);
			res.status(201).json({ post });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}
}

export default PostController;