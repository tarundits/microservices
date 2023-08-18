import { model, Schema } from "mongoose";
import { nanoid } from "nanoid";
import validator from "validator";
import Role from "./role.interface";

const RoleSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid()
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		permissions: [{ type: String, ref: 'Permission' }]
	}
)

export default model<Role>('Role', RoleSchema);