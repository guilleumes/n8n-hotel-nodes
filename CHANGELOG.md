# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-10-08

### Changed
- **BREAKING**: Migrated from npm to pnpm 8.15.0
- **BREAKING**: Updated TypeScript from 4.8.4 to 5.9.3
- **BREAKING**: Removed gulp build system, replaced with Node.js scripts
- Fixed NodeConnectionType compilation errors using string literals
- Fixed all TypeScript `unknown` type errors in catch blocks
- Modernized tsconfig.json to target ES2022

### Added
- ESLint configuration with TypeScript support
- Prettier configuration for code formatting
- Modern build script `scripts/copy-assets.js`
- Development scripts: `pnpm dev`, `pnpm format`, `pnpm lint`

### Removed
- gulp and gulpfile.js
- npm-specific files (package-lock.json)
- Unnecessary documentation files (ERRORS.md, refactoring plans)

## [1.0.0] - 2025-10-07

### Added
- **Beds24 nodes** (3 variants: standard, paginated, trigger)
  - Full CRUD operations for bookings and properties
  - Webhook support for real-time updates
  - Pagination for large datasets
- **Cuentica node** - Spanish invoicing and accounting automation
  - Invoice CRUD operations
  - Customer and provider management
  - Expense tracking
  - Company information access
- **Initial project structure** following n8n best practices
- **Documentation** (README, SESSION, QUICKSTART)
- MIT License

---

**Project URL**: https://github.com/guilleumes/n8n-hotel-nodes
