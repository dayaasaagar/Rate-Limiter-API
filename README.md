# 🚀 Real-Time Rate Limiting System with Redis, Express.js & React

This project implements a rate-limiting system using **Node.js**, **Express**, **Redis**, and a simple **React frontend dashboard** to monitor real-time allowed and blocked requests.

---

## 📦 Features

- ⏱️ **Rate Limiting**: Limits incoming requests per IP using Redis.
- 📊 **Stats Endpoint**: Tracks and exposes allowed and blocked requests.
- ⚠️ **Slack Alerting** (Ongoing): Sends alerts when requests reach 90% of the limit.
- 💻 **React Dashboard**: (Ongoing) View allowed/blocked request counts in real-time.
- 🐳 **Docker-ready** (Ongoing)

---

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js, Redis, Axios
- **Frontend**: React.js (via Create React App)
- **Database**: Redis (can run via WSL, Docker, or local install)

---

## 🔧 Configuration

### 1. Backend

#### 📁 `/backend`

```bash
cd backend
npm install
