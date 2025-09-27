# Contributing Guide

Welcome! This document outlines how to contribute to the Art01 platform, our development workflow, and coding standards.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Branching Strategy](#branching-strategy)
- [Commit Messages](#commit-messages)
- [Code Review](#code-review)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager
- Git
- SQLite3 (for local database)
- Python 3.11+ (for ML service)

### Clone and Install
```bash
git clone https://github.com/username/art01.git
cd art01
pnpm install
```

### Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Database Setup
```bash
cd apps/web
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed  # if seed script available
```

### Start Development
```bash
# Frontend
cd apps/web
pnpm dev

# ML Service (in another terminal)
cd ../../ml-service
pip install -r requirements.txt
uvicorn app:app --reload
```

## Development Environment

### Project Structure
```
art01/
├── apps/web/                 # Next.js frontend
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities and configs
│   ├── styles/               # Global styles
│   └── public/               # Static assets
├── prisma/                   # Database schema and migrations
├── ml-service/              # FastAPI ML service
├── scripts/                  # Utility scripts
├── docs/                     # Documentation
└── public/uploads/          # File uploads
```

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: SQLite (local), PostgreSQL (cloud)
- **Authentication**: NextAuth.js
- **ML Service**: FastAPI, scikit-learn, PyTorch
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod validation

## Code Style

### TypeScript/React
- Use TypeScript for all new code
- Prefer functional components with hooks
- Use const assertions for literal types
- Destructure props at function signature
- Use descriptive variable names

```typescript
// ✅ Good
interface Props {
  readonly userName: string
  readonly onSubmit: (data: FormData) => void
}

function UserCard({ userName, onSubmit }: Props) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(new FormData(event.target as HTMLFormElement))
  }

  return (
    <form onSubmit={handleSubmit}>
      <span>{userName}</span>
    </form>
  )
}

// ❌ Avoid
const UserCard = (props) => {
  return <div>{props.userName}</div>
}
```

### Database/Prisma
- Use descriptive table and column names
- Define relations explicitly
- Use enums for fixed values
- Add database indexes for frequently queried fields

### Python/ML Service
- Follow PEP 8 style guide
- Use type hints for function parameters
- Structure code with classes for ML models
- Add docstrings to functions and classes

## Testing

### Frontend Testing
```bash
# Unit tests
pnpm test

# E2E tests (if configured)
pnpm test:e2e
```

### Manual Testing Checklist
- [ ] Authentication flows work correctly
- [ ] Forms validate properly
- [ ] API endpoints return expected responses
- [ ] Charts display with sample data
- [ ] Responsive design on mobile devices
- [ ] Error states are handled gracefully

### Database Testing
```bash
# Migration testing
pnpm prisma migrate deploy

# Data integrity checks
pnpm prisma studio  # Manual inspection
```

## Submitting Changes

### Pull Request Process
1. **Fork** the repository
2. **Clone** your fork locally
3. Create a **feature branch** from `develop`
4. **Commit** your changes
5. **Push** to your fork
6. Create a **Pull Request** to `develop`

### PR Requirements
- **Title**: Clear, descriptive summary under 50 characters
- **Description**: Detailed explanation of changes
- **Screenshots**: For UI changes
- **Testing**: How to test the changes
- **Related Issues**: Link to related issues or user stories

### PR Template (Suggested)
```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring

## Testing
Describe how you tested these changes:
1. 
2. 

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have added tests where appropriate
- [ ] Documentation has been updated
- [ ] My changes generate no new warnings

## Screenshots (if applicable)
```

## Branching Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Integration branch for features

### Feature Branches
- `feature/description`: New features
- `bugfix/issue-description`: Bug fixes
- `hotfix/urgent-fix`: Critical production fixes

### Branch Naming Convention
```
<type>/<scope>-<description>

Types: feature, bugfix, hotfix, refactor, docs, test
Scope: optional, e.g., api, ui, db
Description: kebab-case, concise
```

Examples:
- `feature/user-authentication`
- `bugfix/login-validation`
- `docs/api-endpoints`

## Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add GitHub OAuth login

Implement GitHub OAuth provider for user authentication.
Users can now sign in with their GitHub account.

Closes #123
```

```
fix(api): handle null values in assessment scores

Prevent API from crashing when assessment score is null.
Added null checks in /api/assessment endpoint.

Fixes #456
```

## Code Review

### Review Checklist
- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Tests are included or updated
- [ ] Documentation is updated
- [ ] Security considerations addressed
- [ ] Performance impact evaluated
- [ ] Database queries are optimized

### Code Review Guidelines
- **Constructive feedback**: Focus on improving code, not criticizing author
- **Specific comments**: Reference line numbers and suggest alternatives
- **Explain reasoning**: Understand why decisions were made
- **Knowledge sharing**: Help reviewers learn new patterns

### Approving PRs
PRs require approval from at least one maintainer and:
- No failing tests
- Positive code review
- Documentation updated
- Database migrations included if needed

## Communication

### Issues and Discussions
- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for general questions and ideas
- Check existing issues before creating duplicates

### Community Guidelines
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Share knowledge and best practices

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

Thank you for contributing to Art01! Your efforts help support artists and build better communities.
