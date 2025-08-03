# LearnEd - Australian EdTech Prototype

A comprehensive modern learning platform built for the Australian education market, focusing on senior secondary students (Years 11-12) preparing for university entrance.

## 🎯 Market Positioning

**Target Market**: Australian EdTech sector valued at $4.2B
- **Primary Users**: Senior secondary students (Years 11-12)  
- **Secondary Users**: Teachers and educators
- **Focus**: University pathway preparation and ATAR optimization

## ✨ Features

### Student Platform
- 📚 **Interactive Course Management** - HSC-aligned subjects
- 📅 **Smart Study Planner** - AI-optimized scheduling
- 📊 **Progress Tracking** - Real-time analytics and insights
- 🎯 **University Pathways** - ATAR tracking and university prerequisite mapping
- 🌙 **Dark Mode Support** - Modern, accessible design
- 📱 **Fully Responsive** - Mobile-first approach

### Teacher Platform
- 👩‍🏫 **Teacher Dashboard** - Student monitoring and analytics
- 📝 **Assessment Management** - Create and track assessments
- 📊 **Student Progress Reports** - Comprehensive analytics
- 🎓 **Course Administration** - Manage multiple classes

### Technical Features
- 🔐 **Role-based Authentication** - JWT-based security
- 🗄️ **Comprehensive Database** - 100 sample students, 10 teachers
- 🏫 **Australian Curriculum Aligned** - ACARA standards
- 🎓 **University Integration** - All major Australian universities
- 📈 **Analytics Ready** - Built for learning insights

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS

### DevOps & Testing
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (production)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm 8+

### Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd learned
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
cp packages/api/.env.example packages/api/.env
```

3. **Database Setup**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. **Start Development Servers**
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

### Demo Credentials

**Students:**
- `matthew.king1@student.learned.edu.au` / `student123`
- `ethan.jackson2@student.learned.edu.au` / `student123`

**Teachers:**
- `drsarahchen@learned.edu.au` / `teacher123`
- `mrdavidthompson@learned.edu.au` / `teacher123`

## 🧪 Testing

### Run Tests
```bash
# API tests
npm run test --workspace=packages/api

# Frontend tests
npm run test --workspace=apps/web

# All tests with coverage
npm run test:coverage
```

### Test Coverage
- ✅ Authentication flows
- ✅ User role validation
- ✅ JWT token management
- ✅ Database schema validation
- ✅ API endpoint testing

## 🐳 Production Deployment

### Docker Compose (Recommended)

1. **Build and Start**
```bash
docker-compose up -d
```

2. **Access Application**
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **Database**: PostgreSQL on port 5432

### Manual Deployment

1. **Build Applications**
```bash
npm run build
```

2. **Environment Variables**
```bash
export NODE_ENV=production
export DATABASE_URL="postgresql://user:pass@localhost:5432/learned"
export JWT_SECRET="your-secure-secret"
```

3. **Database Migration**
```bash
npm run db:push --workspace=packages/api
npm run db:seed --workspace=packages/api
```

4. **Start Services**
```bash
npm start --workspace=packages/api
# Serve built frontend with nginx or similar
```

## 📊 Sample Data

The platform comes pre-loaded with comprehensive sample data:

- **100 Students**: 50 Year 11, 50 Year 12
- **10 Teachers**: Across Mathematics, Science, English, Humanities, Commerce
- **34 Courses**: All major HSC subjects
- **University Pathways**: 10 major Australian universities
- **Assessment System**: Quizzes, assignments, and exams
- **Progress Tracking**: Realistic completion data

## 🎓 University Integration

**Supported Universities:**
- University of Sydney
- University of Melbourne  
- Australian National University
- University of New South Wales
- Monash University
- University of Queensland
- University of Western Australia
- University of Adelaide
- Macquarie University
- University of Technology Sydney

**Features:**
- ATAR requirement mapping
- Subject prerequisite tracking
- Course recommendation engine
- University pathway planning

## 📁 Project Structure

```
learned/
├── apps/
│   ├── web/              # React frontend application
│   └── mobile/           # React Native app (planned)
├── packages/
│   ├── api/              # Express.js backend API
│   ├── types/            # Shared TypeScript types
│   ├── ui/               # Shared UI components
│   └── utils/            # Shared utilities
├── docker-compose.yml    # Production deployment
└── package.json          # Workspace configuration
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both API and web servers
- `npm run build` - Build all applications
- `npm run test` - Run all tests
- `npm run setup` - Complete setup (install + database + seed)

### API (`packages/api`)
- `npm run dev` - Start API development server
- `npm run build` - Build API for production
- `npm run test` - Run API tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

### Web (`apps/web`)
- `npm run dev` - Start web development server
- `npm run build` - Build for production
- `npm run test` - Run frontend tests
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## 🌟 Key Differentiators

### Market Advantages
1. **Australian-First Design** - Built specifically for the Australian education system
2. **University-Ready** - Direct integration with ATAR and university requirements
3. **Teacher-Focused** - Addresses critical teacher shortage with support tools
4. **Evidence-Based** - Built-in analytics for measuring learning outcomes
5. **Scalable Architecture** - Ready for thousands of students and hundreds of schools

### Technical Advantages
1. **Modern Stack** - Latest React, TypeScript, and Node.js
2. **Type Safety** - End-to-end TypeScript for reliability
3. **Performance** - Optimized for speed and responsiveness
4. **Security** - Production-ready authentication and authorization
5. **Maintainable** - Clean architecture with comprehensive testing

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core platform with authentication
- ✅ Student and teacher dashboards
- ✅ Course management system
- ✅ University pathway planning

### Phase 2 (Next 3 months)
- 🔄 AI-powered tutoring integration
- 🔄 Advanced analytics and reporting
- 🔄 Mobile application
- 🔄 Parent/guardian portal

### Phase 3 (6 months)
- 🔄 Integration with school management systems
- 🔄 Advanced assessment tools
- 🔄 Collaborative learning features
- 🔄 Government reporting compliance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Australian Education Research Community** for curriculum standards
- **EduGrowth** for market insights and support
- **Open Source Community** for the excellent tools and frameworks
- **Australian EdTech Sector** for inspiration and market validation

---

**Built with ❤️ in Australia for Australian Education**

Ready to transform education in Australia? [Get in touch](mailto:contact@learned.edu.au) to discuss partnerships, pilot programs, or investment opportunities.
