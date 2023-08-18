import PermissionModel from "./permission.model";
import Permission from "./permission.interface";
import CustomError from "@/utils/exceptions/custom.exception";

class PermissionService {
	private permission = PermissionModel;

	/**
	 * Create a new permission
	 */
	public async create(name: string): Promise<Permission> {
		try {
			const  permission = await this.permission.create({ name });
			return permission;
		} catch (error: any) {
			if (error.code === 11000) {
				throw new Error('This permission already exists.');
			} else {
				throw new Error('Unable to create the permission.');
			}
		}
	}

	/**
	 * Fetch all users
	 */
	public async fetchAll(): Promise<Permission[]> {
		try {
			const permissions = await this.permission.find({});

			return permissions;
		} catch (error: any) {
			throw new Error('No permissions exists in the database.');
		}
	}

	/**
	 * Updates the particular permission.
	 */
	public async update(id: string, name: string): Promise<Permission> {
		try {
			const existingPermission = await this.permission.findById({ _id: id });

			if(existingPermission) {
				existingPermission.name = name;

				const updatedPermission = await existingPermission.save();
				return updatedPermission;
			} else {
				throw new CustomError('PermissionNotFoundError', 'Permission not found.', 'ObjectId');
			}
		} catch (error: any) {
			if (error.name === 'PermissionNotFoundError' && error.kind === 'ObjectId') {
				throw new CustomError('PermissionNotFoundError', 'Permission not found.', 'ObjectId');
			} else {
				throw new CustomError('UpdateError', 'Unable to update the permission.');
			}
		}
	}
}

export default PermissionService;