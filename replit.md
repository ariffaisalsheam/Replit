# Overview

This is an AI chat application built with React and Express that allows users to interact with multiple AI providers including OpenAI, Google Gemini, OpenRouter, and GitHub Copilot. The application features a modern chat interface with real-time messaging, conversation management, and secure API key handling. Users can switch between different AI providers and maintain persistent conversations with message history.

## Recent Changes (August 1, 2025)
- Fixed missing @google/generative-ai package installation issue that was preventing app startup
- Resolved TypeScript type errors in storage layer and chat context
- Added comprehensive README.md documentation covering entire codebase, setup, and deployment
- Prepared repository for proper naming as "ai-chat-application" instead of generic "Replit"
- Application now starts successfully and runs without errors

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system for consistent, accessible interface components
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark modes)
- **State Management**: React Context API for chat state and TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: In-memory storage with fallback to PostgreSQL session store
- **API Design**: RESTful endpoints with structured error handling and request logging

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database for production scalability
- **ORM**: Drizzle ORM with schema-first approach for type safety
- **Schema Management**: Drizzle Kit for migrations and schema validation
- **Session Storage**: API keys stored in browser sessionStorage for security
- **Memory Fallback**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **API Key Management**: Client-side storage of provider-specific API keys in sessionStorage
- **No User Authentication**: Currently operates without user accounts - conversations are session-based
- **Provider Authorization**: Each AI service requires separate API key authentication
- **Security**: API keys are not persisted server-side, only used for request forwarding

## External Service Integrations
- **OpenAI**: GPT models via official OpenAI SDK
- **Google Gemini**: Gemini Pro/Ultra models via Google GenerativeAI SDK
- **OpenRouter**: Multiple model access via OpenAI-compatible API
- **GitHub Copilot**: Code-focused AI assistance via GitHub's API
- **Real-time Features**: Typing indicators and message streaming simulation

# External Dependencies

## AI Service Providers
- OpenAI API for GPT models
- Google GenerativeAI for Gemini models  
- OpenRouter for multi-model access
- GitHub Copilot API for code assistance

## Database and Storage
- Neon Database (serverless PostgreSQL)
- Drizzle ORM for database operations
- connect-pg-simple for PostgreSQL session storage

## Frontend Libraries
- React ecosystem (React, React DOM, React Query)
- Radix UI component primitives
- Tailwind CSS for styling
- date-fns for date manipulation
- Wouter for routing

## Development and Build Tools
- Vite for frontend build and development
- TypeScript for type safety
- ESBuild for server bundling
- Replit-specific development plugins

## Backend Dependencies
- Express.js web framework
- Zod for runtime validation
- Various utility libraries for API integration