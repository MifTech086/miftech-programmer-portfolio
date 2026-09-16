# MifTech — Programmer & Full-Stack Developer Portfolio

A futuristic, 2030-inspired personal portfolio for a programmer and web developer. The site is designed to help potential clients discover the developer, view projects and send a work inquiry.

## Project structure
- `frontend/` — HTML, CSS, JavaScript and visual assets
- `backend/` — Node.js + Express contact API

## Frontend
Open `frontend/index.html` with VS Code Live Server or another static web server.

## Backend
```bash
cd backend
npm install
npm start
```
The API runs on `http://localhost:5000` by default.

## Contact form
The form sends inquiries to the backend. For email delivery, copy `.env.example` to `.env` and configure the mail settings. **Never upload `.env` to GitHub.**

## Before public deployment
1. Deploy the frontend to GitHub Pages or another static host.
2. Deploy the backend to a Node.js-compatible host.
3. Change the frontend API URL from `http://localhost:5000` to the deployed backend URL.
4. Set `FRONTEND_ORIGIN` on the backend to the deployed frontend URL.
5. Add real social/profile links when ready.

## Note
The portfolio intentionally uses a futuristic CSS/code visual instead of a personal portrait or architecture imagery.
