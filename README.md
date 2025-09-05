# 🔗 URL Shortener

This project is a **URL Shortener** built with **Node.js**, **TypeScript**, **Fastify**, **PostgreSQL**, and **Redis**, fully containerized using **Docker** and **Docker Compose**.  

It allows you to shorten links and access them quickly, simply, and in a scalable way.  

---

## 🚀 Tech Stack
- [Node.js](https://nodejs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Fastify](https://fastify.dev/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Redis](https://redis.io/)  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

## 📦 How to Run

1. **Clone the repository:**
  ```bash
   git clone https://github.com/EnzoRochaBrito/url-shortener.git
   cd url-shortener
  ```
2. **Start the containers with Docker Compose:**
  ```bash
   docker-compose up --build
  ```
3. **The service will be available at:**
  ```bash
   http://localhost:9999
  ```

## 🌐 Simple Frontend (optional)

Inside the frontend ``folder``, you will find a basic HTML page that allows you to use the URL shortener without needing tools like Postman or Insomnia.

Just open the index.html file in your browser and interact with the API.

## 📖 Main Endpoints

``POST /shorten`` → Shortens a URL

``GET /:code`` → Redirects to the original URL based on the generated code