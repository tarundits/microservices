import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import validator from 'validator';
import User from './user.interface';

const UserSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid(), 
		},
		first_name: {
			type: String,
			trim: true,
			required: true,
		},
		last_name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			minlength: [8, 'Password must be more than 8 characters'],
			select: true,
		},
		age: {
			type: Number,
		},
		photo: {
			type: String,
			default: 'default.png',
		},
	},
	{
		timestamps: true
	}
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password || '');
};

export default model<User>('User', UserSchema);