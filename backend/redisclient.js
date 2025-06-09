// redisClient.js
const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379", // Adjust if using remote Redis
});

client.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log("✅ Connected to Redis");
  }
}

connectRedis();

module.exports = client;
