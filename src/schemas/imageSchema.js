const Joi = require('joi');

const imageSchema = Joi.object({
  idPost: Joi.string().required().messages({
    "string.base": "El ID del post debe ser texto",
    "any.required": "Debe indicar a qué post pertenece la imagen",
  }),

  imageUrls: Joi.array()
    .items(
      Joi.string().uri().required().messages({
        "string.uri": "Cada URL debe ser válida",
        "any.required": "Cada URL es obligatoria"
      })
    )
    .min(1)
    .optional() // 👈 esto es lo correcto
});

module.exports = imageSchema;