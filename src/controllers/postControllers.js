const mongoose = require("mongoose");
const Post = require("../models/post.model");
const PostImage = require("../models/postimage.model");
const Comment = require("../models/comment.model");
const Tag = require("../models/tag.model");

// 🔥 FORMATO COMPATIBLE CON EL PROFE
function formatPost(p) {
  return {
    id: p._id,
    description: p.description,
    User: {
      id: p.userId?._id,
      nickName: p.userId?.nickName
    },
    Tags: (p.tags || []).map(t => ({
      id: t._id,
      name: t.name
    })),
    createdAt: p.createdAt
  };
}

// ==========================
// CREAR PUBLICACIÓN
// ==========================
async function crearPublicacion(req, res) {
  const { userId, description, tagIds } = req.body;

  try {
    const nuevaPublicacion = await Post.create({
      userId,
      description
    });

    if (tagIds && tagIds.length > 0) {
      nuevaPublicacion.tags = tagIds;
      await nuevaPublicacion.save();
    }

    const post = await Post.findById(nuevaPublicacion._id)
      .populate("userId", "nickName _id")
      .populate("tags", "name");

    res.status(201).json(formatPost(post));
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la publicación.",
      error: error.message,
    });
  }
}

// ==========================
// OBTENER PUBLICACIONES
// ==========================
async function obtenerPublicaciones(req, res) {
  try {
    const { userId } = req.query;

    const filtro = userId
      ? { userId: new mongoose.Types.ObjectId(userId) }
      : {};

    const publicaciones = await Post.find(filtro)
      .populate("userId", "nickName _id")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    const response = publicaciones.map(formatPost);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener publicaciones",
      error: error.message,
    });
  }
}

// ==========================
// OBTENER UNA PUBLICACIÓN
// ==========================
async function obtenerPublicacion(req, res) {
  const { idPost } = req.params;

  try {
    const post = await Post.findById(idPost)
      .populate("userId", "nickName _id")
      .populate("tags", "name");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(formatPost(post));
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la publicación",
      error: error.message,
    });
  }
}

// ==========================
// ACTUALIZAR
// ==========================
async function actualizarPublicacion(req, res) {
  const { idPost } = req.params;
  const { description } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      idPost,
      { description },
      { new: true }
    )
      .populate("userId", "nickName _id")
      .populate("tags", "name");

    res.json(formatPost(post));
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar",
      error: error.message,
    });
  }
}

// ==========================
// ELIMINAR
// ==========================
async function eliminarPublicacion(req, res) {
  const { idPost } = req.params;

  try {
    await Post.findByIdAndDelete(idPost);
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar",
      error: error.message,
    });
  }
}

// ==========================
// NO IMPLEMENTADO (pero no rompe)
// ==========================
async function asociarEtiquetas(req, res) {
  res.json({ message: "Pendiente implementar asociarEtiquetas" });
}

async function eliminarEtiqueta(req, res) {
  res.json({ message: "Pendiente implementar eliminarEtiqueta" });
}

module.exports = {
  crearPublicacion,
  obtenerPublicaciones,
  obtenerPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
  asociarEtiquetas,
  eliminarEtiqueta
};