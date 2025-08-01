# AI Chat Application

A modern, full-stack AI chat application that allows users to interact with multiple AI providers including OpenAI, Google Gemini, OpenRouter, and GitHub Copilot. Built with React, TypeScript, and Express.js.

![AI Chat Application](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Features

### 🤖 Multi-Provider AI Support
- **OpenAI**: GPT-4o integration with chat completions
- **Google Gemini**: Gemini-2.5-flash model support
- **OpenRouter**: Access to multiple AI models including Anthropic Claude
- **GitHub Copilot**: Code-focused AI assistance

### 💬 Real-time Chat Interface
- Modern, responsive chat interface built with React
- Real-time message streaming simulation
- Typing indicators during AI response generation
- Message history persistence
- Conversation management

### 🔐 Secure API Key Management
- Client-side API key storage using sessionStorage
- No server-side persistence of sensitive credentials
- Provider-specific key management
- Secure request forwarding to AI services

### 🎨 Modern UI/UX
- Built with Radix UI components and shadcn/ui design system
- Tailwind CSS for responsive styling
- Dark/light theme support with next-themes
- Accessible and keyboard-friendly interface
- Mobile-responsive design

### 🗄️ Database Integration
- PostgreSQL database with Neon Database (serverless)
- Drizzle ORM for type-safe database operations
- Session management with connect-pg-simple
- Message and conversation persistence

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Context API + TanStack Query
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: In-memory + PostgreSQL fallback
- **API Integration**: Native SDKs for AI providers

### AI Service Integrations
- **OpenAI SDK**: Official OpenAI JavaScript SDK
- **Google GenerativeAI**: Official Google AI SDK
- **OpenRouter API**: OpenAI-compatible REST API
- **GitHub Models API**: Azure-hosted AI models

## Project Structure

```
ai-chat-application/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── contexts/          # React Context providers
│   │   │   └── ChatContext.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useChat.ts
│   │   ├── lib/               # Utility libraries
│   │   │   └── queryClient.ts
│   │   ├── pages/             # Application pages
│   │   │   ├── home.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx            # Main application component
│   │   └── main.tsx           # Application entry point
│   └── index.html             # HTML template
├── server/                     # Backend Express application
│   ├── services/              # Business logic services
│   │   └── aiProviders.ts     # AI provider integrations
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API route definitions
│   ├── storage.ts             # Data storage interfaces
│   └── vite.ts                # Vite development setup
├── shared/                     # Shared TypeScript definitions
│   └── schema.ts              # Database schema and types
├── package.json               # Project dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── drizzle.config.ts          # Drizzle ORM configuration
└── README.md                  # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js 20+ 
- PostgreSQL database (or Neon Database account)
- API keys for desired AI providers

### 1. Clone the Repository
```bash
git clone https://github.com/ariffaisalsheam/ai-chat-application.git
cd ai-chat-application
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Optional: AI Provider API Keys (can also be entered in UI)
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
GITHUB_API_KEY=your_github_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage

### Getting Started
1. **Select an AI Provider**: Choose from OpenAI, Gemini, OpenRouter, or GitHub
2. **Enter API Key**: Provide your API key for the selected provider
3. **Start Chatting**: Type your message and interact with the AI

### API Key Configuration
- API keys are stored securely in your browser's session storage
- Keys are not persisted on the server
- Each provider requires its own API key
- You can switch between providers without losing conversation history

### Supported AI Models
- **OpenAI**: GPT-4o (latest model as of May 2024)
- **Gemini**: Gemini-2.5-flash
- **OpenRouter**: Claude-3.5-sonnet (and other available models)
- **GitHub**: GPT-4o via Azure OpenAI

## API Endpoints

### Chat API
```typescript
POST /api/chat
{
  "message": "Your message here",
  "provider": "openai" | "gemini" | "openrouter" | "github",
  "apiKey": "optional_api_key",
  "conversationId": "optional_conversation_id"
}
```

### Conversations API
```typescript
GET /api/conversations          # List all conversations
GET /api/conversations/:id      # Get specific conversation
POST /api/conversations         # Create new conversation
```

### Messages API
```typescript
GET /api/conversations/:id/messages  # Get conversation messages
POST /api/messages                   # Create new message
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

### Conversations Table
```sql
CREATE TABLE conversations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id),
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id VARCHAR REFERENCES conversations(id),
  role TEXT NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

### Code Organization
- **Frontend**: Modern React with hooks and context
- **Backend**: RESTful API with Express.js
- **Database**: Type-safe operations with Drizzle ORM
- **Validation**: Zod schemas for runtime type checking
- **Styling**: Utility-first CSS with Tailwind

### Development Workflow
1. Frontend runs on Vite dev server with HMR
2. Backend runs with tsx for TypeScript execution
3. Both services run on the same port (5000) in development
4. Automatic restart on file changes

## Deployment

### Build for Production
```bash
npm run build
```

### Production Environment
- Set `NODE_ENV=production`
- Ensure DATABASE_URL is configured
- Provide necessary API keys via environment variables
- Run `npm start` to start the production server

### Deployment Platforms
- **Replit**: Native deployment support
- **Vercel**: Frontend + Serverless functions
- **Railway**: Full-stack deployment
- **Heroku**: Container or buildpack deployment
- **DigitalOcean App Platform**: Docker deployment

## Security Considerations

### API Key Security
- API keys are stored in browser sessionStorage only
- No server-side persistence of user credentials
- Keys are transmitted securely via HTTPS
- Each request validates API key format

### Data Privacy
- Conversations are stored in your private database
- No data is shared with third parties
- AI provider requests are made server-side to protect API keys
- Session management prevents unauthorized access

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Ensure TypeScript compilation: `npm run check`
5. Submit a pull request

### Code Style
- TypeScript strict mode enabled
- ESLint and Prettier configurations
- Consistent import organization
- Descriptive variable and function names

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

### Getting Help
- Check the [Issues](https://github.com/ariffaisalsheam/ai-chat-application/issues) page
- Review the documentation above
- Ensure all prerequisites are met
- Verify API keys are correctly configured

### Common Issues
1. **Database Connection**: Verify DATABASE_URL format
2. **API Key Errors**: Check key validity and provider status
3. **Build Failures**: Ensure Node.js version compatibility
4. **CORS Issues**: Verify server configuration for production

## Roadmap

### Planned Features
- [ ] User authentication and registration
- [ ] Conversation sharing and collaboration
- [ ] Custom AI model configuration
- [ ] File upload and processing
- [ ] Voice input/output support
- [ ] Plugin system for extensions
- [ ] Advanced conversation search
- [ ] Export conversation history

### Technical Improvements
- [ ] WebSocket integration for real-time updates
- [ ] Progressive Web App (PWA) support
- [ ] Enhanced error handling and retry logic
- [ ] Performance optimizations
- [ ] Comprehensive testing suite
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---

**Built with ❤️ using modern web technologies**

For questions or support, please open an issue on GitHub.