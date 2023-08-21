import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/product/product.validation';
import ProductService from '../../resources/product/product.service';
import validateToken from "@/middleware/validate.token";

class ProductController implements Controller {
	public path = '/products';
	public router = Router();
	private ProductService = new ProductService();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(
			`${this.path}`,
			validationMiddleware(validate.create),
			validateToken,
			this.create
		);

		this.router.get(
			`${this.path}`,
			validateToken,
			this.fetch
		);

		this.router.put(
			`${this.path}`,
			validationMiddleware(validate.update),
			validateToken,
			this.update
		);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { name, price } = req.body;

			const product = await this.ProductService.create(name, price);

			res.status(201).json({ product });
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
			const products = await this.ProductService.fetchAll();

			res.status(200).json({ products });
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
			const { id, name, price } = req.body;
			const product = await this.ProductService.update(id, name, price);
			res.status(201).json({ product });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}
}

export default ProductController;