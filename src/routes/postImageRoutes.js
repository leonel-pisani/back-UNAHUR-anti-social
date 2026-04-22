const { Router } = require('express');
const PostImage = require('../models/postimage.model');

const router = Router();


// ==========================
// GET imágenes por post
// ==========================
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const images = await PostImage.find({ idPost: postId });

    const response = images.map(img => ({
      id: img._id,
      url: img.imageUrl
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// POST imagen (1 por request)
// ==========================
router.post('/', async (req, res) => {
  const { url, postId } = req.body;

  if (!postId || !url) {
    return res.status(400).json({
      error: 'Falta url o postId'
    });
  }

  try {
    const nuevaImagen = await PostImage.create({
      idPost: postId,
      imageUrl: url
    });

    res.status(201).json({
      id: nuevaImagen._id,
      url: nuevaImagen.imageUrl,
      postId: nuevaImagen.idPost
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;