const Joi = require('joi');

const postSchema = Joi.object({
  description: Joi.string().min(1).required(),
  userId: Joi.any().required(), // 👈 CAMBIO CLAVE
  tagIds: Joi.array().items(Joi.any()).optional()
});

module.exports = { postSchema };