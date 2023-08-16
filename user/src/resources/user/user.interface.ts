import { Document } from "mongoose";

export default interface User extends Document {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	password?: string;
	age?: number;
	photo?: string;
	matchPassword: (enteredPassword: string) => Promise<boolean>;
}