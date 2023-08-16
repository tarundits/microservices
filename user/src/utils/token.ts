import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const generateToken = async (user: any) => {
	const token = jwt.sign(
		{ id: user._id, email: user.email }, 
		process.env.SECRET_KEY as Secret, 
		{ expiresIn: '1h' }
	);

	return token;
}

export {
	generateToken
}