# 🚀 Production-Ready Full Stack Deployment using Docker + Nginx + Certbot




---

## 🌐 What is Nginx?

**Nginx** is a high-performance web server and reverse proxy server. In this project, it:

- Redirects HTTP to HTTPS
- Proxies frontend requests to `localhost:5173`
- Proxies backend API requests to `localhost:8080`
- Handles SSL termination using certificates from Let's Encrypt

---

## 🔐 What is Certbot?

**Certbot** is a tool from the Electronic Frontier Foundation (EFF) that automates the process of obtaining and renewing SSL certificates from Let's Encrypt.

In this project, Certbot is used to:

- Generate SSL certificates for your domain
- Automatically renew them before expiration

---
## 🧠 Overview

This project sets up a **production-ready environment** for deploying a full-stack web application (React frontend and Node.js backend) using:

- 🐳 Docker for containerization
- 🌐 Nginx for reverse proxy and routing
- 🔒 Certbot (Let's Encrypt) for free SSL certificates

The **frontend** is served on:
```
https://yourdomain.com
```

The **backend API** is exposed on:
```
https://api.yourdomain.com
```

Nginx handles the routing and SSL termination on the **host machine**, while the apps run inside Docker containers.

---

## 🏗 Folder Structure

```
production-setup/
├── docker-compose.yml            # Launches frontend and backend containers
├── frontend/
│   └── Dockerfile                # Dockerfile for React app
├── backend/
│   └── Dockerfile                # Dockerfile for Node.js backend
└── nginx/
    └── yourdomain.conf           # Nginx config for reverse proxy
```

---

## 🛠️ Steps to Deploy on Server

### ✅ Step 1: Clone the Repository
```bash
git clone https://github.com/priyanshujains/Domain-Mapping.git
cd production-setup
```

---

### ✅ Step 2: Update DNS Records

Make sure you point:
- `yourdomain.com` and `www.yourdomain.com` → your server's IP
- `api.yourdomain.com` → your server's IP

---

### ✅ Step 3: Copy Nginx Config to Server

```bash
sudo cp nginx/yourdomain.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/yourdomain.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### ✅ Step 4: Set Up Docker Containers

Make sure Docker and Docker Compose are installed. Then:

```bash
docker-compose up -d --build
```

---

### ✅ Step 5: Get SSL Certificates with Certbot

Install Certbot (if not already):

```bash
sudo apt install certbot python3-certbot-nginx
```

Generate and apply certificates:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

---

### ✅ Step 6: Enable Auto-Renewal (Optional but Recommended)

```bash
sudo crontab -e
```

Add this line to run renewals daily:

```bash
0 0 * * * /usr/bin/certbot renew --quiet
```

---

## 🐳 Docker Instructions

### 1. 🔨 Build Docker Images

```bash
# Navigate to frontend directory
cd frontend
docker build -t my-frontend .

# Navigate to backend directory
cd ../backend
docker build -t my-backend .
```

---

### 2. 🚀 Run Containers Using Docker Compose

Make sure you're in the root `production-setup/` directory:

```bash
cd ..
docker-compose up -d --build
```

---

### 3. 🧰 Nginx Setup (Host-Based Reverse Proxy)

If you're not containerizing Nginx, install it directly on the host machine:

```bash
sudo apt update
sudo apt install nginx
```

#### 📂 Copy Nginx Config

Assuming you have your config file (`yourdomain.conf`) in the `nginx/` folder:

```bash
sudo cp nginx/yourdomain.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/yourdomain.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 4. 🔐 SSL with Certbot (Let's Encrypt)

#### 1️⃣ Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
```

#### 2️⃣ Obtain SSL Certificates:

```bash
# For frontend
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# For backend subdomain
sudo certbot --nginx -d api.yourdomain.com
```

#### 3️⃣ (Optional) Auto-Renew SSL:

```bash
sudo crontab -e
# Add this line:
0 0 * * * /usr/bin/certbot renew --quiet
```

---

✅ Your full-stack application is now secured with HTTPS and reverse-proxied with Nginx.  
Frontend available at: `https://yourdomain.com`  
Backend API available at: `https://api.yourdomain.com`




