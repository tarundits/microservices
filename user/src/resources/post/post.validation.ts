import Joi from "joi";

const create = Joi.object({
	title: Joi.string().required(),
	body: Joi.string().required()
});

const update = Joi.object({
	id: Joi.string().required(),
	title: Joi.string().required(),
	body: Joi.string().required()
});

export default { create, update };