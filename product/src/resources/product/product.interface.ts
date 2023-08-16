import { Document } from "mongoose";

export default interface Product extends Document {
	_id: string;
	name: string;
	price: number;
}