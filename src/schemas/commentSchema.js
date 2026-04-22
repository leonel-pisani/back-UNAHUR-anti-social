const Joi = require('joi');

const createCommentSchema = Joi.object({
  userId: Joi.string().required(),
  postId: Joi.string().required(),
  content: Joi.string().trim().min(1).max(500).required()
});

const updateCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .required()
    .messages({
      'string.base': 'El campo content debe ser texto',
      'string.empty': 'El campo content no puede estar vacío',
      'string.min': 'El comentario debe tener al menos 1 carácter',
      'string.max': 'El comentario no puede exceder 500 caracteres',
      'any.required': 'El campo content es obligatorio'
    })
});

module.exports = {
  createCommentSchema,
  updateCommentSchema
};  