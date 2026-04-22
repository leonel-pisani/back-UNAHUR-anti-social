const  Comment  = require('../models/comment.model');

const ATRIBUTOS_EXCLUIDOS = ['updatedAt']; 

// ACTUALIZAR COMENTARIO 
const actualizarComentario = async (req, res) => {
  const { idComment } = req.params;
  const { content } = req.body;

  try {
    const comentarioActualizado = await Comment.findByIdAndUpdate(
      idComment,
      { content },
      { new: true, runValidators: true } 
    ).select('-__v'); 

    res.status(200).json(comentarioActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el comentario.', error: error.message });
  }
};

// ELIMINAR COMENTARIO
const eliminarComentario = async (req, res) => {
  const { idComment } = req.params;

  try {
    const comentarioEliminado = await Comment.findByIdAndDelete(idComment);
    res
      .status(200)
      .json({ message: `Comentario ID: ${idComment} eliminado correctamente.`, eliminado:comentarioEliminado });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el comentario.",
      error: error.message,
    });
  }
};

module.exports = {
    actualizarComentario,
    eliminarComentario
}; 