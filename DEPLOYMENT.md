# VivaLang — Deployment Guide

This guide details how to deploy **VivaLang** to production on **Vercel** (Recommended), **Render**, or a **VPS / Docker**.

---

## 🚀 Option 1: Vercel (Recommended — Free & 2-Minute Setup)

Vercel is built by the creators of Next.js and provides zero-config global deployment.

### Step 1: Push Code to GitHub
Open your terminal in `C:\Users\HP\Downloads\project_german` and run:

```bash
git init
git add .
git commit -m "Initial commit for VivaLang AI Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vivalang.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New..."** → **"Project"**.
3. Import your `vivalang` repository.
4. (Optional) Under **Environment Variables**, add:
   - Key: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: `YOUR_GEMINI_API_KEY`
5. Click **Deploy**.

Vercel will build your app and generate a live URL like `https://vivalang.vercel.app`!

---

## 🌐 Option 2: Render / Railway

1. Push your repository to GitHub.
2. Go to [render.com](https://render.com) and create a **Web Service**.
3. Connect your GitHub repository.
4. Set Build Command: `npm run build`
5. Set Start Command: `npm run start`
6. Click **Create Web Service**.

---

## 🐳 Option 3: Node.js Production Server (VPS / EC2)

To run the built app on your own Linux server or Windows VPS:

```bash
# 1. Install dependencies
npm install

# 2. Build the optimized production bundle
npm run build

# 3. Start the production server on port 3000
npm run start
```

For background process management on Linux, use PM2:
```bash
npm install -g pm2
pm2 start npm --name "vivalang" -- start
```
