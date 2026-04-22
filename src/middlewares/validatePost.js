const {postSchema} = require('../schemas/postSchema');
const Post  = require('../models/post.model');

const validarPost = (req,res,next) => {

    const {error, value}= postSchema.validate(req.body, {abortEarly: false});

    if (error){
        const mensajes = error.details.map((err)=>err.message);
        return res.status(400).json({errors:mensajes});
    }

    req.body=value;
    next();
};  

const validarDescripcionUnica = async (req, res, next) => {
    const { description } = req.body;

    try {
        const postExistente = await Post.findOne({ description });
        if (postExistente && postExistente._id.toString() !== req.params.idPost) {
            return res.status(400).json({ error: "Ya existe un post con esa descripción" });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al verificar la descripción del post" });
    }
};

const validarPostExistente = async (req, res, next) => {
    const { idPost } = req.params;

    try {
        const post = await Post.findById(idPost);
        if (!post) {
            return res.status(404).json({ error: `Post con ID ${idPost} no encontrado` });
        }
        req.post = post;
        return next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al verificar el post" });
    }
};

module.exports = {
  validarPost,
  validarDescripcionUnica,
  validarPostExistente,
};