const { Router } = require('express');
const Comment = require('../models/comment.model');
const { validarCrearComentario } = require('../middlewares/validateComment');
const router = Router();

// ✅ GET comentarios por post (igual que el profe)
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const comentarios = await Comment.find({ idPost: postId })
      .populate("idUser", "nickName _id")
      .sort({ createdAt: -1 });

    const response = comentarios.map(c => ({
      id: c._id,
      content: c.content,
      createdAt: c.createdAt,
      User: {
        id: c.idUser._id,
        nickName: c.idUser.nickName
      }
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ NUEVO endpoint COMPATIBLE CON EL PROFE
router.post('/', validarCrearComentario, async (req, res) => {
  const { content, userId, postId } = req.body;

  if (!content || !userId || !postId) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const nuevo = await Comment.create({
      content,
      idUser: userId,
      idPost: postId
    });

    res.status(201).json(nuevo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;