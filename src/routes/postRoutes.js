const { Router } = require('express');
const postControllers = require('../controllers/postControllers');
const {
  validarPost,
  validarDescripcionUnica,
  validarPostExistente,
} = require('../middlewares/validatePost');

const {
  validarUsuarioExiste,
} = require('../middlewares/validateUser');

const validateComment = require('../middlewares/validateComment');
const validateTags = require('../middlewares/validateTag');

const router = Router();


// ==========================
// CRUD PRINCIPAL DEL POST
// ==========================

// Crear post
router.post(
  '/',
  validarPost,
  validarDescripcionUnica,
  validarUsuarioExiste,
  postControllers.crearPublicacion
);

// Obtener todos
router.get('/', postControllers.obtenerPublicaciones);

// Obtener uno
router.get('/:idPost', validarPostExistente, postControllers.obtenerPublicacion);

// Actualizar
router.put(
  '/:idPost',
  validarPostExistente,
  validarDescripcionUnica,
  postControllers.actualizarPublicacion
);

// Eliminar
router.delete('/:idPost', validarPostExistente, postControllers.eliminarPublicacion);

// ==========================
// RELACIONES (SIN IMÁGENES)
// ==========================

// Asociar etiquetas
router.post(
  '/:idPost/etiquetas',
  validateTags.validateTag,
  validarPostExistente,
  postControllers.asociarEtiquetas
);

// Eliminar etiqueta
router.delete(
  '/:idPost/etiquetas/:idTag',
  validateTags.validateExisteTag,
  validarPostExistente,
  postControllers.eliminarEtiqueta
);

module.exports = router;