# Hasinthaka Portfolio & Admin Control Center

A modern, high-performance developer portfolio and content management dashboard built with Next.js 16 (App Router), React 19, Framer Motion, and Tailwind CSS.

---

## 🔐 Admin Authentication & Password Hash Guide

The Admin Dashboard (`/admin`) uses secure **SHA-256 Password Hashing** with timing-safe comparison. Plaintext passwords are never stored in code or environment variables.

### 1. How to Generate a New SHA-256 Password Hash

You can generate a SHA-256 hash for your custom password using any of the following methods:

#### Option A: Using Node.js (Windows PowerShell / Command Prompt / Terminal)
Run this single command in your terminal (replace `MyNewSecretPassword123` with your desired password):

```powershell
node -e "console.log(require('crypto').createHash('sha256').update('MyNewSecretPassword123').digest('hex'))"
```

#### Option B: Using Linux / macOS Terminal
```bash
echo -n "MyNewSecretPassword123" | sha256sum
```

#### Option C: Using Browser Developer Tools Console
Open F12 Developer Tools in Chrome/Edge, paste this script into the Console tab, and press Enter:

```javascript
async function getHash(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
await getHash("MyNewSecretPassword123");
```

---

### 2. How to Set / Update the Admin Password

#### For Local Development (`.env.local`):
Open `.env.local` in the project root and set `ADMIN_PASSWORD_HASH` to your generated 64-character SHA-256 hash:

```env
ADMIN_PASSWORD_HASH="8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
```
*(Note: The default hash above corresponds to password: `admin123`)*

#### For Production (Vercel Deployment):
1. Go to your project on **Vercel Dashboard**.
2. Navigate to **Settings** -> **Environment Variables**.
3. Add a new variable:
   - **Key**: `ADMIN_PASSWORD_HASH`
   - **Value**: `<Your 64-character SHA-256 Hash>`
4. Click **Save** and redeploy your project.

---

## ☁️ Vercel Blob Cloud Storage Setup

Image uploads (Project gallery photos, Experience company logos, Profile pictures) are handled directly via **Vercel Blob Storage**.

1. Go to your Vercel Dashboard -> **Storage** -> **Create Database** -> Select **Vercel Blob**.
2. Click **Connect to Project** and select this portfolio repository.
3. Vercel will automatically configure the `BLOB_READ_WRITE_TOKEN` environment variable.

---

## 🚀 Development & Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```
