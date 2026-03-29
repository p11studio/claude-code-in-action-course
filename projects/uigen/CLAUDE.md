# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup      # Install deps, generate Prisma client, run migrations (first-time setup)
npm run dev        # Start Next.js dev server with Turbopack
npm run build      # Build production bundle
npm test           # Run Vitest test suite
npm run db:reset   # Reset SQLite database to initial state
```

Run a single test file:
```bash
npx vitest run src/lib/__tests__/file-system.test.ts
```

## Architecture

UIGen is an AI-powered React component generator. Users describe components in natural language, Claude generates them via tool calls, and they render live in a sandboxed iframe — no files are ever written to disk.

### Data flow

```
User message → ChatInterface → /api/chat (streaming)
                                    ↓
                              Claude API + tools
                              ├─ str_replace_editor  (create/edit/view files)
                              └─ file_manager        (rename/delete files)
                                    ↓
                              VirtualFileSystem (in-memory Map)
                                    ↓
                              jsx-transformer (Babel standalone)
                                    ↓
                              sandboxed iframe preview
```

### Key layers

| Layer | Path | Notes |
|-------|------|-------|
| Streaming chat API | `src/app/api/chat/route.ts` | Uses Vercel AI SDK; streams tool calls back to client |
| Virtual file system | `src/lib/file-system.ts` | In-memory `Map<path, FileNode>`; serializable to JSON for Prisma |
| AI tools | `src/lib/tools/` | `str-replace.ts` and `file-manager.ts` — called by Claude during generation |
| Preview | `src/components/preview/PreviewFrame.tsx` | Creates import map + HTML, renders in sandboxed iframe |
| JSX transform | `src/lib/transform/jsx-transformer.ts` | Babel standalone; resolves imports to CDN URLs |
| Chat context | `src/lib/contexts/chat-context.tsx` | Wraps Vercel AI SDK `useChat`; includes file system state in each request |
| System prompt | `src/lib/prompts/generation.tsx` | Defines Claude's behavior and tool usage instructions |
| Auth | `src/lib/auth.ts` | JWT in httpOnly cookie (7-day TTL); bcrypt password hashing |
| DB | `prisma/schema.prisma` | SQLite; `Project` stores chat messages + file system as JSON strings |

### State management

- **File system state** lives in `FileSystemContext` and is passed as context to every chat request
- **Chat state** lives in `ChatContext` (Vercel AI SDK's `useChat` hook)
- Both contexts are provided at the root layout; components consume them via hooks

### AI provider fallback

If `ANTHROPIC_API_KEY` is not set, `src/lib/provider.ts` returns a `MockLanguageModel` that generates static placeholder components — useful for UI development without API credentials.

### Testing

Tests use Vitest + jsdom + React Testing Library. Test files live alongside source in `__tests__/` subdirectories.
