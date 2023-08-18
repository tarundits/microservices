import { Document } from "mongoose";

export default interface Permission extends Document {
	_id: string;
	name: string;
}