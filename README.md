# StayConnected 🌟

<div align="center">
  <img src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1470&auto=format&fit=crop" width="600" alt="StayConnected Banner" />

  <p align="center">
    A modern Q&A platform built for knowledge sharing and community engagement
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#team">Team</a>
  </p>
</div>

## ✨ Features

### 🏠 Homepage

- Dynamic header with authentication state management
- Real-time questions feed
- Interactive leaderboard
- Dark/Light mode toggle

### 👤 User Authentication

- **Registration**
  - Email verification
  - Default avatar assignment
  - Secure password handling
- **Login**
  - Email and password validation
  - Protected route handling
  - Seamless authentication flow

### 📝 Questions

- Create detailed questions with tags
- Rich text editing support
- Advanced search and filtering
- Sort by date, status, or answers
- Tag-based categorization

### 💬 Answers

- Markdown support for detailed responses
- Best answer highlighting
- Vote system for community feedback
- Sort by relevance or date

### 👑 Leaderboard System

- Point-based ranking
- Best answer rewards
- Like/upvote system
- Activity tracking

### 👤 User Profiles

- Activity statistics
- Question and answer history

## 🛠 Tech Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Jotai
- **Form Handling**: React Hook Form + Zod
- **API Communication**: Axios + React Query
- **Routing**: React Router
- **UI Components**: shadcn/ui

## 👥 Team

Meet our amazing team of contributors who made this project possible:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/richi1213">
        <img src="https://github.com/richi1213.png" width="100px;" alt="Richi"/>
        <br />
        <sub><b>Richi</b></sub>
      </a>
      <br />
      <sub>Lead Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/sopo">
        <img src="https://github.com/sopo.png" width="100px;" alt="Sopo"/>
        <br />
        <sub><b>Sopo</b></sub>
      </a>
      <br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/anijujunashvili">
        <img src="https://github.com/anijujunashvili.png" width="100px;" alt="Ani Jujunashvili"/>
        <br />
        <sub><b>Ani Jujunashvili</b></sub>
      </a>
      <br />
      <sub>UI/UX Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/tsamkharadze">
        <img src="https://github.com/tsamkharadze.png" width="100px;" alt="T. Samkharadze"/>
        <br />
        <sub><b>T. Samkharadze</b></sub>
      </a>
      <br />
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/stayconnected.git
   ```

2. **Install dependencies**

   ```bash
   cd stayconnected
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗 Architecture

### Directory Structure

```
src/
├── components/         # Reusable UI components
├── features/          # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Route components
├── services/         # API services
├── store/            # State management
└── types/            # TypeScript definitions
```

### Key Components

#### Authentication Flow

```mermaid
graph LR
    A[Login/Register] --> B{Auth Check}
    B -->|Success| C[Protected Routes]
    B -->|Failure| D[Error Handling]
```

#### Data Flow

```mermaid
graph TD
    A[User Action] --> B[State Update]
    B --> C[API Call]
    C --> D[UI Update]
```

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

---

<div align="center">
  Made with ❤️ by the StayConnected Team
</div>
