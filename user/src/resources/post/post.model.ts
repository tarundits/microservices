import { Schema, model } from "mongoose";
import { nanoid } from 'nanoid';
import Post from "@/resources/post/post.interface";

const PostSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid(), 
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		body: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default model<Post>('Post', PostSchema);