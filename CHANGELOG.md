# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### In Progress
- Beds24 node integration (3 nodes)
- ParteViajeros guest registration node

### Planned
- TtLock smart lock control node
- UploadMossos automated file submission node (Puppeteer)

---

## [1.0.0] - 2025-10-08

### Added
- **Initial project structure** following GUILLEUMES_2026 best practices
- **Documentation system** (README, SESSION, QUICKSTART in root)
- **TypeScript 5.6.3** configuration (modern version)
- **Build system** with gulp for icon processing
- **Cuentica node** - Complete Spanish invoicing and accounting automation
  - Invoice CRUD operations
  - Customer and provider management
  - Expense tracking
  - Company information access
  - Pagination support (max 300 items)
  - Rate limiting handling (600 req/5min, 7200/day)
- **CuenticaApi credentials** - Secure authentication with X-AUTH-TOKEN
- **Git repository** on GitHub: https://github.com/guilleumes/n8n-hotel-nodes

### Technical
- Node.js >=18.0.0 support
- npm >=9.0.0 support
- n8n-workflow >=1.0.0 compatibility
- Clean gitignore configuration
- MIT License

---

**Project started**: 2025-10-08  
**First release**: 2025-10-08
