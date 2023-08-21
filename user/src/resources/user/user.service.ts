import UserModel from "./user.model";
import User from "./user.interface";
import  bcrypt from "bcrypt";
import CustomError from "@/utils/exceptions/custom.exception";

class UserService {
	private user = UserModel;

	/**
	 * Create a new user
	 */
	public async create(
		first_name: string, 
		last_name: string, 
		email: string, 
		password: string, 
		age: number, 
		photo: string
	): Promise<User> {
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await this.user.create({ 
				first_name: first_name, 
				last_name: last_name, 
				email: email, 
				password: hashedPassword, 
				age: age, 
				photo: photo 
			});

			return user;
		} catch (error: any) {
			if (error.code === 11000) {
				throw new Error('This email is already registered.');
			} else {
				throw new Error('Unable to create the user.');
			}
		}
	}

	/**
	 * Fetch all users
	 */
	public async fetchAll(): Promise<User[]> {
		try {
			const users = await this.user.find({});

			return users;
		} catch (error: any) {
			throw new Error('No users exists in the database.');
		}
	}

	/**
	 * Updates any particular user
	 */
	/*
	public async update(
		id: string,
		first_name: string, 
		last_name: string, 
		email: string, 
		password: string, 
		age: number, 
		photo: string
	) {
		try {
			const existingUser = await this.user.findById({_id: id});
			const hashedPassword = await bcrypt.hash(password, 10);

			if(existingUser) {
				existingUser.first_name = first_name;
				existingUser.last_name = last_name;
				existingUser.email = email;
				existingUser.password = hashedPassword;
				existingUser.age = age;
				existingUser.photo = photo;

				const updatedUser = await existingUser.save();

				return updatedUser;
			} else {
				throw new CustomError('UserNotFoundError', 'User not found.', 'ObjectId');
			}

		} catch (error: any) {
			if (error.name === 'UserNotFoundError' && error.kind === 'ObjectId') {
				throw new CustomError('UserNotFoundError', 'User not found.', 'ObjectId');
			} else {
				throw new CustomError('UpdateError', 'Unable to update the user.');
			}
		}
	}
	*/

	public async update(id: string, updatedFields: Partial<User>) {
		try {
		  const existingUser = await this.user.findById({ _id: id });
	  
		  if (existingUser) {
			Object.assign(existingUser, updatedFields); // Update provided fields
			const updatedUser = await existingUser.save();
			return updatedUser;
		  } else {
			throw new CustomError('UserNotFoundError', 'User not found.', 'ObjectId');
		  }
		} catch (error: any) {
		  if (error.name === 'UserNotFoundError' && error.kind === 'ObjectId') {
			throw new CustomError('UserNotFoundError', 'User not found.', 'ObjectId');
		  } else {
			throw new CustomError('UpdateError', 'Unable to update the user.');
		  }
		}
	  }
	  

	/**
	 * To check if user exists
	 */
	public async checkUser(email: string, password: string): Promise<User> {
		try {
			const existingUser: any = await this.user.findOne({ email });

			if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
				throw new CustomError('InvalidError', 'Invalid Credentials.');
			}

			return existingUser;

		} catch (error: any) {
			throw new CustomError('UserNotFoundError', 'User not found.');
		}
	}
}

export default UserService;