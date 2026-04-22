const { Router } = require('express');
const followerControllers = require('../controllers/followerControllers'); 
const { validarAmbosUsuariosExisten, validarSeguir,validarUsuarioSeSigueASiMismo,validarDejarDeSeguir} = require('../middlewares/validateFollowers');
const {validarUsuarioExiste} = require('../middlewares/validateUser');
const router = Router();

// RUTAS DE GESTIÓN DE SEGUIDORES

// C: Seguir a otro usuario
router.post('/:followerId/follow/:followingId', validarUsuarioSeSigueASiMismo,validarAmbosUsuariosExisten,validarSeguir , followerControllers.seguirUsuario);

// D: Dejar de seguir a otro usuario
router.delete('/:followerId/unfollow/:followingId', validarAmbosUsuariosExisten , validarDejarDeSeguir, followerControllers.dejarDeSeguirUsuario);

// R: Obtener la lista de usuarios que sigue un usuario (Followings)
router.get('/:idUser/followings', validarUsuarioExiste, followerControllers.obtenerSeguidos);

// R: Obtener la lista de seguidores de un usuario (Followers)
router.get('/:idUser/followers', validarUsuarioExiste,followerControllers.obtenerSeguidores);

module.exports = router;