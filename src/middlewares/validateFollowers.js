const { User } = require("../models/user.model");

const validarAmbosUsuariosExisten = async (req, res, next) => {
  try {
    const { followerId, followingId } = req.params;

    const [follower, following] = await Promise.all([
      User.findById(followerId),
      User.findById(followingId),
    ]);

    if (!follower || !following) {
      return res.status(404).json({
        message: "Uno o ambos usuarios no existen.",
      });
    }

    req.follower = follower;
    req.following = following;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validarSeguir = async (req, res, next) => {
  try {
    const follower = req.follower;
    const following = req.following;

    if (!Array.isArray(follower.seguidos)) {
      follower.seguidos = [];
    }

    if (follower.seguidos.includes(following._id)) {
      return res
        .status(409)
        .json({ message: "El usuario ya sigue a este otro usuario." });
    }

    next();
  } catch (error) {
    console.error("Error en validarSeguir:", error);
    res.status(500).json({ message: "Error al validar la acción de seguir." });
  }
};

const validarUsuarioSeSigueASiMismo = async (req,res,next) => {
  const { followerId, followingId } = req.params;
  const follower = await User.findById(followerId);  //no los uso? tengo que eliminar esta linea?
  const following = await User.findById(followingId); //no los uso? tengo que eliminar esta linea?
  if (followerId === followingId) {
    return res.status(400).json({ message: 'Un usuario no puede seguirse a sí mismo.' });
  }
  next()
}

const validarDejarDeSeguir = async (req, res, next) => {
  try {
    const follower = req.follower;
    const following = req.following;

    if (!Array.isArray(follower.seguidos)) {
      follower.seguidos = [];
    }

    if (!follower.seguidos.includes(following._id)) {
      return res
        .status(404)
        .json({ message: 'La relación de seguimiento no existía.' });
    }

    next();
  } catch (error) {
    console.error("Error en validarDejarDeSeguir:", error);
    res.status(500).json({ message: "Error al validar la acción de dejar de seguir." });
  }
};



module.exports = { validarAmbosUsuariosExisten, validarSeguir, validarUsuarioSeSigueASiMismo, validarDejarDeSeguir }; 