import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './permission.validation';
import PermissionService from "./permission.service";

class PermissionController implements Controller {
	public path = '/permissions';
	public router = Router();
	private PermissionService = new PermissionService();

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

	/**
	 * Create New User
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { name } = req.body;

			const permission = await this.PermissionService.create(name);

			res.status(201).json({ permission });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Fetch All Permissions
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	private fetch = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const permissions = await this.PermissionService.fetchAll();

			res.status(200).json({ permissions });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Update permission
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	private update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { id, name } = req.body;
			const permission = await this.PermissionService.update(id, name);
			res.status(201).json({ permission });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

}

export default PermissionController;