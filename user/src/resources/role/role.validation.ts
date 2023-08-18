import Joi from "joi";

const create = Joi.object({
	name: Joi.string().required(),
	permissions: Joi.string().required(),
});

const update = Joi.object({
	id: Joi.string().required(),
	name: Joi.string(),
	permissions: Joi.string(),
});

export default { create, update };