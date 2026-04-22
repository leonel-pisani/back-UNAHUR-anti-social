const Joi = require('joi');
const imageSchema = require('../schemas/imageSchema');
const PostImage = require('../models/postimage.model');
const Post = require('../models/post.model');

const validarImagen = (req, res, next) => {
  if (!req.body.idPost && req.params.idPost) {
    req.body.idPost = req.params.idPost;
  }

  const { error, value } = imageSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const mensajes = error.details.map((err) => err.message);
    return res.status(400).json({ errors: mensajes });
  }
  req.body = value;
  next();
};

const validarPostExistente = async (req, res, next) => {
  try {
    const { idPost } = req.body;
    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({ error: "El post asociado no existe" });
    }
    req.post = post;
    next();
  } catch (err) {
    res.status(500).json({ error: "Error al verificar el post" });
  }
};

const validarImagenDuplicada = async (req, res, next) => {
  try {
    const { imageUrls } = req.body;

    for (const url of imageUrls) {
      const imagenExistente = await PostImage.findOne({ imageUrl: url });
      if (imagenExistente) {
        return res.status(400).json({ error: `Ya existe una imagen con la URL: ${url}` });
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Error al verificar las imágenes" });
  }
};

module.exports = {
  validarImagen,
  validarPostExistente,
  validarImagenDuplicada,
};