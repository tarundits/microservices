import { model, Schema } from "mongoose";
import { nanoid } from "nanoid";
import validator from "validator";
import Permission from "./permission.interface";

const PermissionSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid()
		},
		name: {
			type: String,
			trim: true,
			required: true,
		}
	}
);

export default model<Permission>('Permission', PermissionSchema);
