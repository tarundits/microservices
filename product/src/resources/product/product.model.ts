import { Schema, model } from "mongoose";
import { nanoid } from 'nanoid';
import Product from "./product.interface";

const ProductSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid(), 
		},
		name: { 
			type: String, 
			required: true 
		},
		price: { 
			type: Number, 
			required: true 
		},
	},
	{
		timestamps: true
	}
);

export default model<Product>('Post', ProductSchema);