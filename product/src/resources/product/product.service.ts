import ProductModel from "./product.model";
import Product from "./product.interface";
import CustomError from "../../utils/exceptions/custom.exception";

class ProductService {
	private product = ProductModel;

	public async create(name: string, price: number): Promise<Product> {
		try {
			const product = await this.product.create({ name, price });

			return product;
		} catch (error: any) {
			throw new Error('Unable to create the product.');
		}
	}

	public async fetchAll(): Promise<Product[]> {
		try {
			const products = await this.product.find({});

			return products;
		} catch (error: any) {
			throw new Error('No posts exists in the database.');
		}
	}

	public async update(id: string, name: string, price: number) {
		try {
			const existingProduct = await this.product.findById({_id: id});

			console.log(existingProduct);

			if(existingProduct) {
				if(name) { existingProduct.name = name; }
				if(price) { existingProduct.price = price; }

				const updatedPost = await existingProduct.save();

				return updatedPost;
			} else {
				throw new CustomError('PostNotFoundError', 'Post not found.', 'ObjectId');
			}

		} catch (error: any) {
			if (error.name === 'PostNotFoundError' && error.kind === 'ObjectId') {
				throw new CustomError('PostNotFoundError', 'Post not found.', 'ObjectId');
			} else {
				throw new CustomError('UpdateError', 'Unable to update the post.');
			}
		}
	}
}

export default ProductService;