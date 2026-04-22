console.log("UnaHur - Anti-Social net");

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./doc/swagger.yaml');

// --- Importación de Rutas ---
const userRouter = require('./routes/userRoutes');
const tagRouter = require('./routes/tagRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followerRoutes = require('./routes/followerRoutes');
const postImageRoutes = require('./routes/postImageRoutes'); // 👈 NUEVO

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🔥 RUTAS ADAPTADAS AL FRONT
app.use('/users', userRouter);
app.use('/posts', postRoutes);       // 👈 cambio clave
app.use('/tags', tagRouter);
app.use('/comments', commentRoutes); // 👈 ahora lo usa el front
app.use('/postimages', postImageRoutes); // 👈 nuevo endpoint
app.use('/followers', followerRoutes);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/anti-social';

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB correctamente"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});