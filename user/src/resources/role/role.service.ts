import RoleModel from "./role.model";
import Role from "./role.interface";
import PermissionModel from "../permission/permission.model";
import CustomError from "@/utils/exceptions/custom.exception";

class RoleService {
	private role = RoleModel;
	private permission = PermissionModel;

	/**
	 * Create a new role
	 */
	public async create(name: string, permissions: string): Promise<Role> {
		try {
			const permissionNames = permissions.split(',').map(permission => permission.trim());
			const existingPermissions = await this.permission.find({ name: { $in: permissionNames } });

			const permissionIds = existingPermissions.map(p => p._id);

			const newRole = await this.role.create({
				name,
				permissions: permissionIds
			});

			return newRole;

		} catch (error: any) {
			console.log("error", error);

			if (error.code === 11000) {
				throw new Error('This role already exists.');
			} else {
				throw new Error('Unable to create the role.');
			}
		}
	}

	/**
	 * Fetch all roles
	 */
	public async fetchAll(): Promise<Role[]> {
		try {
			const roles = await this.role.find({});

			return roles;
		} catch (error: any) {
			throw new Error('No permissions exists in the database.');
		}
	}

	/**
	 * Update the existing role
	 */
	public async update(id: string, name: string, permissions: string): Promise<Role> {
		try {
			// Find the role you want to edit
			const roleToUpdate = await this.role.findById(id);
			if (!roleToUpdate) {
			  throw new CustomError('Role not found', '404');
			}
	  
			// Fetch the permission objects based on the provided permission names
			const existingPermissions = await this.permission.find({ name: { $in: permissions } });
	  
			// Extract the ObjectId references from the permission objects
			const permissionIds = existingPermissions.map(p => p._id);
	  
			// Update the role's permissions array with the new permission ObjectId references
			roleToUpdate.permissions = permissionIds;
			await roleToUpdate.save();
	  
			return roleToUpdate;
		} catch (error: any) {
			console.log("error", error);

			if (error.code === 11000) {
				throw new Error('This role already exists.');
			} else {
				throw new Error('Unable to create the role.');
			}
		}
	}
}

export default RoleService;