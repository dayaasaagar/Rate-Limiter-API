// index.js
const express = require("express");
const {rateLimiter,getStats} = require("./ratelimiter");
const cors = require("cors");



const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

// Apply rate limiting to all routes
app.use(rateLimiter);

// Test route
app.get("/api/data", (req, res) => {
  res.json({ message: "Success! You are within the rate limit." });
});

// app.get('/stats', (req, res) => {
//   res.json({ allowed: allowedRequests, blocked: blockedRequests });
// });
app.get('/stats', (req, res) => {
  const stats = getStats();
  res.json(stats);
});
app.use((req, res, next) => {
  if (req.path === '/stats') {
    return next(); // Skip rate limiter for stats endpoint
  }
  return rateLimiter(req, res, next);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});