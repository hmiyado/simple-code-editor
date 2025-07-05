# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview production build locally

## Architecture

This is a React-based code editor application built with:

- **Monaco Editor**: The core editor component via `@monaco-editor/react`
- **Bulma CSS**: UI framework for styling
- **LZ-String**: URL-safe compression for sharing code via URL parameters
- **TypeScript**: Strongly typed throughout

### Key Components

- `CodeEditor` (src/editor/CodeEditor.tsx): Main editor component that handles Monaco editor integration, URL parameter reading, and state management
- `EditorControls` (src/editor/EditorControls.tsx): Language selection dropdown and URL sharing functionality
- `Timer` (src/timer/Timer.tsx): Countdown timer component with minute/second controls
- `Language` (src/editor/Language.ts): Type definitions and utilities for supported programming languages
- `QueryParams` (src/editor/QueryParams.ts): URL parameter pattern definitions for code and language
- `UrlEncoder` (src/util/urlEncoder.ts): LZ-String wrapper for compressing/decompressing code in URLs

### URL Sharing System

The application uses URL parameters to share code:

- Code content is compressed using LZ-String and stored in URL parameter `c` (or `code`)
- Language is stored in URL parameter `l` (or `lang`/`language`)
- The `generateShareableURL` function creates shareable links

### Supported Languages

JavaScript, TypeScript, Python, Kotlin, Swift, C++ - defined in `Language.ts` with Monaco editor identifiers.

## Deployment

- `npm run predeploy` - Build for deployment
- `npm run deploy` - Deploy to GitHub Pages with custom domain
- GitHub Actions auto-deploys on push to main branch
- Deployed to: https://simple-code-editor.miyado.dev

## Code Quality

- ESLint configured with React and TypeScript rules
- Prettier for code formatting
- Husky + lint-staged for pre-commit hooks
- TypeScript strict mode enabled
