const Joi = require('joi');
const Comment = require('../models/comment.model');
const { createCommentSchema, updateCommentSchema } = require('../schemas/commentSchema');

// Crear comentario
const validarCrearComentario = (req, res, next) => {
  const { error } = createCommentSchema.validate(req.body);

  if (error) {
    const mensajes = error.details.map(d => d.message);
    return res.status(400).json({ errors: mensajes });
  }

  next();
};

// Actualizar comentario
const validarActualizarComentario = (req, res, next) => {
  const { error } = updateCommentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const mensajes = error.details.map(d => d.message);
    return res.status(400).json({ errors: mensajes });
  }

  next();
};

// Existe comentario
const commentExists = async (req, res, next) => {
  try {
    const { idComment } = req.params;

    const comentario = await Comment.findById(idComment);

    if (!comentario) {
      return res.status(404).json({
        message: `Comentario con ID ${idComment} no encontrado.`,
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: 'Error interno al validar comentario.',
      error: err.message,
    });
  }
};

module.exports = {
  validarCrearComentario,
  validarActualizarComentario,
  commentExists,
};