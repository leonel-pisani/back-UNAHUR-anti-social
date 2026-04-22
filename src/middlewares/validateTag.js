const Tag = require('../models/tag.model'); 

const validateTag = (req, res, next) => {
    const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ errors: ['El campo name es obligatorio y debe ser texto.'] });
  }

  req.body.name = name.trim().toLowerCase(); // limpieza y estandarización
  next();
};

const validateTagNoExiste = async (req, res, next) => {
  try {
    const { name } = req.body

    const existente = await Tag.findOne({ name })
    if (existente) {
      return res.status(409).json({ message: `La etiqueta "${name}" ya existe.` })
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error interno al validar etiqueta.', details: err.message });
  }
};

const validateExisteTag = async (req, res, next) => {
    const { idTag } = req.params;

    try {
      const tag = await Tag.findById(idTag);
      if (!tag) return res.status(404).json({ message: `Etiqueta con ID ${idTag} no encontrada.` });
      req.tag = tag;
      next();
  } catch (err) {
    res.status(500).json({ message: 'Error interno al validar etiqueta.', details: err.message });
  }
};

module.exports = {
    validateTag,
    validateExisteTag,
    validateTagNoExiste
};