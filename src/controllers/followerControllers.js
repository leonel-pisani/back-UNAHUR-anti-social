const { User} = require('../models/user.model');
const redisClient = require("../../config/redisClient");
const ATRIBUTOS_EXCLUIDOS_USER = ['password', 'email', 'updatedAt'];

// GESTIÓN DE RELACIONES

// SEGUIR USUARIO
const seguirUsuario = async (req, res) => {
  const { followerId, followingId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    follower.seguidos.push(following._id);
    following.seguidores.push(follower._id);

    await follower.save();
    await following.save();

    // 🔥 INVALIDAR CACHE
    if (redisClient) {
      await redisClient.del(`user:${followerId}`);
      await redisClient.del(`user:${followingId}`);
    }

    res.status(201).json({
      message: `Usuario ${followerId} ahora sigue a ${followingId}.`,
      followerId: follower._id,
      followingId: following._id
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al seguir al usuario.', error: error.message });
  }
};

// DEJAR DE SEGUIR USUARIO 
const dejarDeSeguirUsuario = async (req, res) => {
  const { followerId, followingId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({
        message: 'Uno o ambos usuarios no existen.'
      });
    }

    // 👇 eliminar relación
    follower.seguidos = follower.seguidos.filter(
      id => !id.equals(following._id)
    );

    following.seguidores = following.seguidores.filter(
      id => !id.equals(follower._id)
    );

    await follower.save();
    await following.save();

    // 🔥 INVALIDAR CACHE (IMPORTANTE)
    await redisClient.del(`user:${followerId}`);
    await redisClient.del(`user:${followingId}`);

    res.status(200).json({
      message: `El usuario ID: ${followerId} dejó de seguir al Usuario ID: ${followingId}`
    });

  } catch (error) {
    console.error('Error al dejar de seguir usuario:', error);
    res.status(500).json({
      message: 'Error al dejar de seguir al usuario.',
      error: error.message
    });
  }
};

// OBTENER LISTA DE SEGUIDOS
const obtenerSeguidos = async (req, res) => {
  const { idUser} = req.params;

  try {
    // Buscamos al usuario y poblamos el array 'seguidos'
    const usuario = await User.findById(idUser)
      .select('nickName seguidos') // seleccionamos los campos que nos interesan
      .populate({
        path: 'seguidos',
        select: 'nickName email firstName lastName' // campos a mostrar de cada seguido
      });

    res.status(200).json({
      idUser: usuario._id,
      nickName: usuario.nickName,
      followings: usuario.seguidos
    });

  } catch (error) {
    console.error('Error al obtener seguidos:', error);
    res.status(500).json({ message: 'Error al obtener la lista de seguidos.', error: error.message });
  }
};

// OBTENER LISTA DE SEGUIDORES
const obtenerSeguidores = async (req, res) => {
  const { idUser} = req.params;

  try {

    const usuario = await User.findById(idUser)
      .select('nickName seguidores') 
      .populate({
        path: 'seguidores',
        select: 'nickName email firstName lastName' 
      });

    res.status(200).json({
      idUser: usuario._id,
      nickName: usuario.nickName,
      followers: usuario.seguidores
    });

  } catch (error) {
    console.error('Error al obtener seguidores:', error);
    res.status(500).json({ message: 'Error al obtener la lista de seguidores.', error: error.message });
  }
};


module.exports = {
    seguirUsuario,
    dejarDeSeguirUsuario,
    obtenerSeguidos,
    obtenerSeguidores
}; 