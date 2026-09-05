# Anurag Pandey — Personal Introduction

A modern, responsive personal introduction website built with **React, Vite and Tailwind CSS**.

The website presents my background, interests, skills, projects and ways to connect with me through a clean, cinematic interface.

It also includes a collection of small interactive experiments and games built directly into the website.

## 🌐 Live Demo

**Live Website:**  
https://anurag-intro.vercel.app

**GitHub Repository:**  
https://github.com/Anuragp2077/anurag-intro

---

## ✨ Features

### 🎨 Interface

- Responsive design for desktop, tablet and mobile
- Cinematic modern UI
- Dark / light mode
- Theme preference persisted using LocalStorage
- Smooth scrolling navigation
- Scroll progress indicator
- Interactive hover effects
- Mouse-based parallax effects on the hero section
- Scroll reveal animations
- Mobile-friendly navigation
- Desktop experience notice for smaller screens

### 👨‍💻 Personal Sections

- Personal introduction
- About section
- Interests and hobbies
- Technical skills
- Project showcase
- Contact and social links

### 🎮 Interactive Playground

The website includes a dedicated interactive playground containing:

- 🐍 Snake
- 🎹 Piano
- ⚡ Reaction Test
- 🥁 Drum Pad

These experiments use browser APIs and JavaScript to create interactive experiences directly in the webpage.

### 🎵 Ambient Music

- Optional ambient background music
- Manual play / pause control
- Looping audio
- Volume-controlled playback
- Music preference stored using LocalStorage

---

## 🛠️ Tech Stack

- **React**
- **JavaScript**
- **Vite**
- **Tailwind CSS**
- **Web Audio API**
- **LocalStorage**
- **Git & GitHub**
- **Vercel**

---

## 📂 Project Structure

```text
anurag-intro/
├── public/
├── src/
│   ├── assets/
│   │   ├── profile.png
│   │   └── ambience.mp3
│   │
│   ├── components/
│   │   ├── About.jsx
│   │   ├── AmbientMusic.jsx
│   │   ├── Contact.jsx
│   │   ├── DesktopNotice.jsx
│   │   ├── DrumPad.jsx
│   │   ├── Hero.jsx
│   │   ├── Interests.jsx
│   │   ├── Navbar.jsx
│   │   ├── Piano.jsx
│   │   ├── Playground.jsx
│   │   ├── Projects.jsx
│   │   ├── ReactionTest.jsx
│   │   ├── Reveal.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Skills.jsx
│   │   ├── SnakeGame.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
