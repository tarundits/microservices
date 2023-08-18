import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './role.validation';
import RoleService from "./role.service";

class RoleController implements Controller {
	public path = '/roles';
	public router = Router();
	private RoleService = new RoleService();

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
	 * Create New Role
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
			const { name, permissions } = req.body;

			const role = await this.RoleService.create(name, permissions);

			res.status(201).json({ role });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Fetch All Roles
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
			const roles = await this.RoleService.fetchAll();

			res.status(200).json({ roles });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Update role
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
			const { id, name, permissions } = req.body;
			const role = await this.RoleService.update(id, name, permissions);
			res.status(201).json({ role });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}
}

export default RoleController;