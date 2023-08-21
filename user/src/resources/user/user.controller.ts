import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/user/user.validation';
import UserService from "./user.service";
import { generateToken } from "@/utils/token";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import MyToken from "@/utils/interfaces/token.interface";

dotenv.config();

class UserController implements Controller {
	public path = '/users';
	public router = Router();
	private UserService = new UserService();

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

		this.router.post(
			`${this.path}/login`,
			this.login
		);

		this.router.post(
			`${this.path}/verify_token`,
			this.verify
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
			const { first_name, last_name, email, password, age, photo } = req.body;

			const user = await this.UserService.create(first_name, last_name, email, password, age, photo);
			const token = await generateToken(user);

			res.status(201).json({ user, token });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Fetch All Users
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
			const users = await this.UserService.fetchAll();

			res.status(200).json({ users });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Update User
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
			const { id, ...updatedFields } = req.body;
			const user = await this.UserService.update(id, updatedFields);
			res.status(201).json({ user });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Login User
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	private login = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { email, password } = req.body;

			const user = await this.UserService.checkUser(email, password);
			const token = await generateToken(user);

			res.status(200).json({ user, token });
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}

	/**
	 * Verify Token
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	private verify = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const token = req.headers['authorization']?.split('Bearer ')[1];

			if (!token) {
				next(new HttpException(400, "Unauthorized: No token provided"));
			} else {

				jwt.verify(token, process.env.SECRET_KEY as Secret, (err, decoded) => {
					if (err) {
						return res.status(401).json({ error: 'Unauthorized: Invalid token' });
					}
	
					const decodedToken = decoded as MyToken;
		
					if (decodedToken && decodedToken.id) {
						res.sendStatus(200);
						// res.status(200).json({ "status": "Valid Token" });
					} else {
						res.sendStatus(400);
					}
				});
			}

		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	}
}

export default UserController;