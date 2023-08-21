import { Request, Response, NextFunction } from "express";
import axios from "axios";

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers['authorization']?.split('Bearer ')[1];

		if (!token) {
			return res.status(401).json({ error: 'Unauthorized: No token provided' });
		}

		const headers = {
			'Authorization': `Bearer ${token}`,
		};
	  
		const userApiResponse = await axios.post('http://localhost:3000/api/users/verify_token', {}, {
			headers: headers,
		});
	
		if (userApiResponse.status !== 200) {
			return res.status(401).json({ error: 'Unauthorized: Invalid token' });
		}

		// req.user = userApiResponse.data;
        next();

	} catch (error: any) {
		res.status(500).json({ error: 'Token validation failed' });
	}
}

export default validateToken;