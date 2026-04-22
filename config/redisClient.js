let redisClient = null;

if (process.env.REDIS_URL) {
  const redis = require("redis");

  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    connectTimeout: 10000,
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  redisClient.on("connect", () => console.log("Redis conectado OK"));

  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      console.error("Fallo al conectar con Redis:", err);
    }
  })();
} else {
  console.log("Redis desactivado (no hay REDIS_URL)");
}

module.exports = redisClient;