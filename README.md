# 🚀 URL-Shortener

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/ob22a/URL-Shortener?style=for-the-badge)](https://github.com/ob22a/URL-Shortener/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/ob22a/URL-Shortener?style=for-the-badge)](https://github.com/ob22a/URL-Shortener/network)

[![GitHub issues](https://img.shields.io/github/issues/ob22a/URL-Shortener?style=for-the-badge)](https://github.com/ob22a/URL-Shortener/issues)

[![GitHub license](https://img.shields.io/github/license/ob22a/URL-Shortener?style=for-the-badge)](LICENSE)

**A simple, efficient, and blazing-fast URL shortener built with a modern React, Node.js, TypeScript, MongoDB, and Redis stack.**

[Live Demo](https://url-shortener-client-7v14.onrender.com/)

</div>

## 📖 Overview

This project is a robust, full-stack URL shortening service designed for speed and reliability. It provides a user-friendly interface to convert long, cumbersome URLs into concise, shareable short links, which then redirect efficiently to their original destinations. The application leverages a powerful combination of modern web technologies to deliver a seamless user experience and a highly performant backend.

## ✨ Features

-   🎯 **Efficient URL Generation**: Quickly generate short URLs from any valid long URL.
-   ⚡ **Blazing-Fast Redirection**: Utilizes Redis caching for near-instantaneous redirection from short links.
-   🗄️ **Persistent Storage**: Securely stores original URLs in a MongoDB database.
-   ⚛️ **Modern User Interface**: A dynamic and responsive frontend built with React for intuitive interactions.
-   🔐 **Unique Short Codes**: Generates unique and collision-resistant short codes for each URL.
-   💻 **API-Driven Backend**: A clean and well-structured API built with Node.js and Express.js.
-   📏 **Type Safety**: Enhanced code quality and maintainability through TypeScript across the entire stack.

## 🖥️ Screenshots

<img width="1906" height="857" alt="image" src="https://github.com/user-attachments/assets/ec82ff90-4c86-42f1-b91d-bc83f97db111" />
<img width="1874" height="852" alt="image" src="https://github.com/user-attachments/assets/a314cb32-dd7b-4d57-ac28-3e85e6f49a3b" />

## 🛠️ Tech Stack

**Frontend:**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Backend:**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Database:**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**DevOps:**

![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

## 🚀 Quick Start

To get this project up and running locally, you'll need to set up both the client (frontend) and server (backend).

### Prerequisites
-   **Node.js**: v18.x or higher
-   **npm**: v9.x or higher (comes with Node.js)
-   **MongoDB**: An instance running locally or a cloud-hosted service (e.g., MongoDB Atlas).
-   **Redis**: An instance running locally or a cloud-hosted service (e.g., Redis Cloud).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ob22a/URL-Shortener.git
    cd URL-Shortener
    ```

2.  **Server Setup**
    Navigate to the `server` directory, install dependencies, and configure environment variables.
    ```bash
    cd server
    npm install
    cp .env.example .env
    ```
    Open the newly created `.env` file and configure your environment variables:
    ```ini
    # .env (in server directory)
    PORT=5000 # Or any desired port for the backend
    MONGO_URI="mongodb://localhost:27017/urlshortener" # Your MongoDB connection string
    REDIS_URL="redis://localhost:6379" # Your Redis connection string
    CLIENT_URL="http://localhost:3000" # URL where your frontend will be running
    ```

3.  **Client Setup**
    Navigate to the `client` directory, install dependencies, and configure environment variables.
    ```bash
    cd ../client
    npm install
    cp .env.example .env
    ```
    Open the newly created `.env` file and configure your environment variables:
    ```ini
    # .env (in client directory)
    VITE_SERVER_URL="http://localhost:5000" # URL where your backend will be running
    ```

### Running the Application

1.  **Start the Backend Server**
    In the `server` directory:
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:5000` (or the `PORT` you configured).

2.  **Start the Frontend Development Server**
    In the `client` directory:
    ```bash
    npm run dev
    ```
    The frontend application will start on `http://localhost:3000` (or the default port for Vite).

3.  **Open your browser**
    Visit `http://localhost:3000` to access the URL Shortener application.

## 📁 Project Structure

```
URL-Shortener/
├── .gitignore
├── client/                 # Frontend React application
│   ├── public/             # Static assets (e.g., index.html)
│   ├── src/                # React source code
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable React components
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Entry point for React app
│   │   └── index.css       # Global styles
│   ├── .env.example        # Client environment variables example
│   ├── package.json        # Client dependencies and scripts
│   ├── tsconfig.json       # TypeScript configuration for client
│   └── vite.config.ts      # Vite build configuration
└── server/                 # Backend Node.js/Express.js application
    ├── src/                # Server source code
    │   ├── config/         # Database and Redis connection setup
    │   ├── controllers/    # Request handlers for routes
    │   ├── models/         # MongoDB schemas (e.g., Url.ts)
    │   ├── routes/         # API route definitions (e.g., url.routes.ts)
    │   ├── services/       # Business logic (e.g., URL generation)
    │   ├── utils/          # Utility functions (e.g., error handling)
    │   └── app.ts          # Main Express application setup
    ├── .env.example        # Server environment variables example
    ├── package.json        # Server dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration for server
    └── README.md           # Server-specific README (if present)
```

## ⚙️ Configuration

### Environment Variables

Both the client and server components rely on environment variables for sensitive information and configuration. Please ensure you create a `.env` file in both the `client` and `server` directories based on the provided `.env.example` files.

#### Server (`server/.env`)

| Variable     | Description                                           | Default                                      | Required |
|:-------------|:------------------------------------------------------|:---------------------------------------------|:---------|
| `PORT`       | Port for the backend server to listen on             | `5000`                                       | Yes      |
| `MONGO_URI`  | Connection string for your MongoDB database          | `mongodb://localhost:27017/urlshortener`     | Yes      |
| `REDIS_URL`  | Connection string for your Redis instance            | `redis://localhost:6379`                     | Yes      |
| `CLIENT_URL` | URL of the frontend application (for CORS)           | `http://localhost:3000`                      | Yes      |

---

#### Client (`client/.env`)

| Variable          | Description                                  | Default                 | Required |
|:------------------|:---------------------------------------------|:------------------------|:---------|
| `VITE_SERVER_URL` | Base URL of the backend API server           | `http://localhost:5000` | Yes      |

## 🔧 Development

### Available Scripts

### Server (`server/package.json`)

| Command          | Description                              |
|:-----------------|:------------------------------------------|
| `npm run dev`    | Starts the server in development mode     |
| `npm run build`  | Compiles TypeScript to JavaScript         |
| `npm start`      | Starts the compiled server                |

---

### Client (`client/package.json`)

| Command            | Description                                         |
|:-------------------|:-----------------------------------------------------|
| `npm run dev`      | Starts the client in development mode (Vite)        |
| `npm run build`    | Builds the client for production                    |
| `npm run preview`  | Serves the production build locally for testing     |


### Development Workflow
For typical development, you'll need two terminal windows: one for running the backend server and another for the frontend development server. Any changes saved in either the `client` or `server` directories will trigger hot reloading/recompilation as appropriate.

### Production Build

#### Client
To create a production-ready build of the frontend:
```bash
cd client
npm run build
```
This will generate optimized static assets in the `client/dist` directory.

#### Server
To compile the backend code for production:
```bash
cd server
npm run build
```
This will compile the TypeScript source into JavaScript files in the `server/dist` directory. You can then run the compiled server using `npm start`.

### Deployment Options

-   **Render**: As indicated by the live demo, the client can be easily deployed to services like Render, Netlify, or Vercel by pointing them to the `client` directory and configuring the build command (`npm run build`). The backend can also be deployed to Render as a Node.js service.
-   **Docker**: A `Dockerfile` could be added to containerize both the client (as a static web server) and the server for deployment to any container-orchestration platform like Kubernetes.

## 📚 API Reference

The backend exposes a simple RESTful API for URL shortening and redirection.

### Endpoints

#### `POST /api/shorten`
Shortens a given long URL.

-   **Request Body:**
    ```json
    {
      "longUrl": "https://example.com/this-is-a-very-long-url-that-needs-to-be-shortened"
    }
    ```
-   **Response (Success - 201 Created):**
    ```json
    {
      "shortUrl": "http://localhost:5000/xyz789",
      "longUrl": "https://example.com/this-is-a-very-long-url-that-needs-to-be-shortened"
    }
    ```
-   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Invalid URL provided."
    }
    ```

#### `GET /:shortCode`
Redirects to the original long URL associated with the short code.

-   **Example:** Navigating to `http://localhost:5000/xyz789` will redirect to `https://example.com/this-is-a-very-long-url-that-needs-to-be-shortened`.
-   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Short URL not found."
    }
    ```

## 🤝 Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

### Development Setup for Contributors
Follow the [Quick Start](#quick-start) guide to set up your local development environment. Ensure all prerequisites are met and both client and server are running.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.


## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/ob22a/URL-Shortener/issues)
-   [ob22a](https://url-shortener-bd4b.onrender.com/Dzo0Y3r)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [ob22a](https://url-shortener-bd4b.onrender.com/Dzo0Y3r)

</div>

