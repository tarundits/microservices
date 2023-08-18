import { Document } from "mongoose";

export default interface Role extends Document {
	_id: string;
	name: string;
	permissions: string[];
}