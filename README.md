# LearnEd - Modern Learning Platform

A modern, interactive learning platform built with React, TypeScript, and Tailwind CSS.

## Features

- 📚 Interactive course management
- 📅 Smart study planner
- 📊 Progress tracking
- 🎯 Personalized learning paths
- 🌙 Dark mode support
- 📱 Fully responsive design

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Query
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **UI Components:** Headless UI
- **Icons:** Heroicons
- **Build Tool:** Vite
- **Testing:** Vitest + Testing Library
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript
- **Git Hooks:** Husky + lint-staged

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+ (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/learned.git

# Navigate to the project directory
cd learned

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Check types
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage

## Project Structure

```
learned/
├── apps/
│   └── web/              # Main web application
│       ├── src/
│       │   ├── components/   # Reusable components
│       │   ├── pages/       # Page components
│       │   ├── hooks/       # Custom hooks
│       │   ├── utils/       # Utility functions
│       │   └── test/        # Test setup and utils
│       └── public/          # Static assets
├── packages/              # Shared packages
└── prisma/               # Database schema and migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.dev)
- [Heroicons](https://heroicons.com)
- [Framer Motion](https://www.framer.com/motion)