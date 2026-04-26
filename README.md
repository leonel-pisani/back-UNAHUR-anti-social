# 🚀 Anti-Social Backend

Backend de la aplicación **UnaHur Anti-Social Net**, una red social desarrollada como trabajo práctico.

👉 Este proyecto representa la API REST que consume el frontend.
👉 Podés ver el frontend acá: **https://github.com/leonel-pisani/front-UNAHUR-anti-social**

---

## 🧠 Descripción

Este backend permite gestionar:

* Usuarios
* Publicaciones
* Comentarios
* Seguidores
* Etiquetas
* Imágenes de posts

Incluye validaciones, cache con Redis y documentación con Swagger.

---

## 🛠️ Tecnologías utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* Redis (cache)
* Joi (validaciones)
* Swagger (documentación)
* Docker

---

## ⚙️ Instalación

```bash
git clone https://github.com/leonel-pisani/back-UNAHUR-anti-social.git
cd back-UNAHUR-anti-social
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env`:

```env
PORT=3001
MONGO_URI=mongodb://admin:admin123@localhost:27017/anti_social_db?authSource=admin
REDIS_PASSWORD=123456
REDIS_URL=redis://:123456@localhost:6379
ANTIGUEDAD_VISIBILIDAD_COMENTARIOS=6
```

---

## 🐳 Ejecutar con Docker

```bash
docker-compose up -d
```

Servicios incluidos:

* MongoDB
* Mongo Express
* Redis
* Redis Insight

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

Servidor en:

```
http://localhost:3001
```

---

## 📌 Endpoints principales

### 👤 Usuarios

* POST `/users`
* GET `/users`
* GET `/users/:idUser`
* PUT `/users/:idUser`
* DELETE `/users/:idUser`

### 📝 Posts

* POST `/posts`
* GET `/posts`
* GET `/posts/:idPost`
* PUT `/posts/:idPost`
* DELETE `/posts/:idPost`

### 💬 Comentarios

* GET `/comments/post/:postId`
* POST `/comments`

### 🏷️ Tags

* CRUD completo `/tags`

### 👥 Seguidores

* POST `/followers/:followerId/follow/:followingId`
* DELETE `/followers/:followerId/unfollow/:followingId`

---

## ⚡ Características destacadas

* ✔️ Validación de datos con Joi
* ✔️ Cache con Redis para mejorar performance
* ✔️ Arquitectura modular (routes, controllers, models)
* ✔️ Dockerizado
* ✔️ Documentación con Swagger

---

## ⚠️ Mejoras futuras

* Autenticación con JWT
* Encriptación de contraseñas (bcrypt)
* Subida de imágenes (Cloudinary / S3)
* Tests automáticos

---

## 👨‍💻 Autor

Leonel Pisani
