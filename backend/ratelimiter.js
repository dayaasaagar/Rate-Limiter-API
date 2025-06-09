// rateLimiter.js
const redis = require("redis");
const axios = require("axios");
let allowedRequests = 0;
let blockedRequests = 0;
//const client = redis.createClient();
//client.connect();
const client = require("./redisclient");


const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 10;
const ALERT_THRESHOLD = 0.9; // 90%

async function rateLimiter(req, res, next) {
  const ip = req.ip;
  const key = `rate:${ip}`;

  try {
    let requestCount = await client.get(key);

    if (requestCount === null) {
      await client.set(key, 1, {
        EX: WINDOW_SIZE_IN_SECONDS,
        NX: true,
      });
      allowedRequests++;
      return next();
    }

    requestCount = parseInt(requestCount);

    if (requestCount >= MAX_WINDOW_REQUEST_COUNT) {
         blockedRequests++;
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    await client.incr(key);

    // Trigger alert if 90% of the limit is reached
    if (requestCount + 1 >= MAX_WINDOW_REQUEST_COUNT * ALERT_THRESHOLD) {
      console.log(`⚠️ Alert: ${ip} is nearing the rate limit.`);

      // Send alert to Slack (optional)
      await axios.post("https://hooks.slack.com/services/your/slack/webhook", {
        text: `⚠️ ${ip} has reached ${requestCount + 1} requests in ${WINDOW_SIZE_IN_SECONDS}s`,
      });
    }
         allowedRequests++;
    next();
  } catch (err) {
    console.error("Redis error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  rateLimiter,
  getStats: () => ({ allowedRequests, blockedRequests }),
};

//module.exports = rateLimiter;
