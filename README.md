# 🚀 NexusOS Ecosystem

A "Personal Operating System" - a unified productivity suite that synchronizes your professional and personal life across desktop and mobile.

## 📋 Overview

NexusOS eliminates the need for separate apps for tasks, notes, and finance by providing a single, authenticated source of truth. It features a modular architecture where users can toggle features on/off based on their needs.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Web**: React 18, Tailwind CSS, Vite
- **Mobile**: React Native (Expo) - Coming Soon
- **Package Manager**: pnpm
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
nexus-os/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── core/        # Auth, DB, Middleware
│   │   └── modules/     # [tasks/, finance/, notes/]
│   └── server.js        # Entry point
├── web-app/             # React Web Application
│   └── src/
│       ├── core/        # Layout, Redux Store
│       └── features/    # [tasks/, finance/, notes/]
├── mobile-app/          # React Native (Expo) - Coming Soon
└── docs/                # PRD and Security docs
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Prashant29062003/nexus-os.git
cd nexus-os
```

2. Install dependencies:
```bash
pnpm install
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
PORT=5000
```

4. Start the backend server:
```bash
pnpm dev
```

The API will be available at `http://localhost:5000`

### Web App Setup

1. Navigate to web-app directory:
```bash
cd web-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The web app will be available at `http://localhost:5173`

## 🧪 Testing

### Backend Tests

```bash
cd backend
pnpm test              # Run tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Generate coverage report
```

## 🔧 Code Quality

### Backend

```bash
cd backend
pnpm lint              # Check for linting issues
pnpm lint:fix          # Auto-fix linting issues
pnpm format            # Format code with Prettier
pnpm format:check      # Check formatting
```

### Web App

```bash
cd web-app
pnpm lint              # Check for linting issues
```

## 📦 Available Scripts

### Backend
- `pnpm start` - Start production server
- `pnpm dev` - Start development server with auto-reload
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Web App
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🏗️ Architecture

### Modular Design

NexusOS uses a **Feature-Folder Pattern** that decouples modules from the core engine:

- **Core**: Handles Database connection, JWT Verification, Global Error Handling, and User Profiles
- **Modules**: Each module (Tasks, Finance, Notes) contains its own `routes`, `controller`, and `model`

### Core Modules

| Module | Web Feature | Mobile Feature |
|--------|-------------|----------------|
| **Tasks** | Drag-and-drop Kanban board | List view with swipe gestures |
| **Finance** | Analytics charts | Quick expense entry |
| **Notes** | Markdown editor with preview | Minimalist text editor |

## 🔒 Security

This project follows strict security practices outlined in `docs/SECURITY`:

- JWT with Refresh Tokens
- Password Hashing (bcrypt)
- Owner-Only Rule (Data Isolation)
- Input Sanitization (NoSQL Injection Protection)
- Secure Communication (CORS, Helmet.js)
- Environment Integrity (.env for secrets)

## 📝 Documentation

- [PRD](docs/PRD.md) - Product Requirements Document
- [SECURITY](docs/SECURITY) - Security Guidelines

## 🚧 Roadmap

- [x] Project setup and structure
- [x] Backend server with MongoDB connection
- [x] Code quality tools (ESLint, Prettier, Jest)
- [ ] Authentication implementation
- [ ] Tasks module
- [ ] Finance module
- [ ] Notes module
- [ ] Web app UI
- [ ] Mobile app development
- [ ] Real-time sync (Socket.io)
- [ ] Offline capability

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Prashant
