import Joi from "joi";

const create = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().precision(2).min(0).max(100).required()
});

const update = Joi.object({
	id: Joi.string().required(),
	name: Joi.string(),
	price: Joi.number().precision(2).min(0).max(100)
});

export default { create, update };