const Tag = require('../models/tag.model');    

const ATRIBUTOS_EXCLUIDOS = ['updatedAt'];
 
// CREAR ETIQUETA
const crearTag = async (req, res) => {
  const { name } = req.body;
  try {
    const nuevoNombre = name.toLowerCase();

    const nuevaEtiqueta = await Tag.create({ name: nuevoNombre });
    res.status(201).json(nuevaEtiqueta);
  } catch (error) {
    res.status(500).json({ message: 'Error interno al crear la etiqueta.', details: error.message });
  }
};

// OBTENER TODAS LAS ETIQUETAS (Lista)
const obtenerTags = async (req, res) => {
  try {
    const etiquetas = await Tag.find().sort({ name: 1 }); // orden alfabético
    res.status(200).json(etiquetas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las etiquetas.', details: error.message });
  }
};

// OBTENER UNA ETIQUETA POR ID (Detalle)
const obtenerTag = async (req, res) => {
  const { idTag } = req.params;
  try {
    const tag = await Tag.findById(idTag).populate('posts', 'description idUsercreatedAt');
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la etiqueta.', details: error.message });
  }
};

// ACTUALIZAR ETIQUETA
const actualizarTag = async (req, res) => {
  const { idTag } = req.params;
  const { name } = req.body;

  try {
    const nuevoNombre = name.toLowerCase();
    const tagActualizada = await Tag.findByIdAndUpdate(
      idTag,
      { name: nuevoNombre },
      { new: true, runValidators: true }
    );
    res.status(200).json(tagActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la etiqueta.', details: error.message });
  }
};

// ELIMINAR ETIQUETA
const eliminarTag = async (req, res) => {
  const { idTag } = req.params;
  try {
    const tagEliminada = await Tag.findByIdAndDelete(idTag);
    res.status(200).json({ message: `Etiqueta "${tagEliminada.name}" eliminada correctamente.` });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la etiqueta.', details: error.message });
  }
};

module.exports = {
    crearTag,
    obtenerTag,
    obtenerTags,
    actualizarTag,
    eliminarTag
};  