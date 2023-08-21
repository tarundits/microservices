import Joi from "joi";

const create = Joi.object({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	age: Joi.number(),
	photo: Joi.string(),
});

const update = Joi.object({
	id: Joi.string().required(),
	first_name: Joi.string(),
	last_name: Joi.string(),
	email: Joi.string(),
	password: Joi.string(),
	age: Joi.number(),
	photo: Joi.string(),
});

export default { create, update };