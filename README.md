# 🏨 n8n Hotel Nodes

[![n8n Version](https://img.shields.io/badge/n8n-1.115.0-blue.svg)](https://n8n.io)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

**Professional n8n custom nodes for hotel management automation.**

Streamline your PMS operations, invoicing, smart locks, and guest registration with this comprehensive suite of n8n nodes designed specifically for the hospitality industry.

---

## 📋 Quick Navigation

- **[Quick Start](#-quick-start)** - Get up and running in 5 minutes
- **[Available Nodes](#-available-nodes)** - See what's included
- **[Installation](#-installation)** - Development and production setup
- **[Documentation](#-documentation)** - Detailed guides
- **[Contributing](#-contributing)** - How to help improve this project

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/guilleumes/n8n-hotel-nodes.git
cd n8n-hotel-nodes

# Install dependencies
npm install

# Build nodes
npm run build

# The compiled nodes will be in dist/
```

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md).

---

## 📦 Available Nodes

### 🏨 **Beds24** (3 nodes)
Complete integration with Beds24 PMS API.

- **Beds24** - Full CRUD operations (bookings, properties, rooms, calendars)
- **Beds24 Paginated** - Handle large data volumes efficiently
- **Beds24 Trigger** - Real-time webhooks for instant updates

### 💰 **Cuentica**
Spanish invoicing and accounting automation.

- **Cuentica** - Invoice creation, client management, accounting reports

### 📋 **Parte Viajeros**
Automated guest registration for Spanish authorities (Mossos d'Esquadra).

- **ParteViajeros** - Generate official TXT files automatically

### 🔐 **TtLock** (Planned)
Smart lock control and access management.

- **TtLock** - Generate temporary codes, manage permissions

### 📤 **Upload Mossos** (Planned)
Automated daily submission of guest registration files.

- **UploadMossos** - Automated login and file upload using Puppeteer

---

## 💡 Why This Project?

This project was born from real-world needs in hotel management:

- ✅ **Save Time**: Automate repetitive tasks
- ✅ **Reduce Errors**: Eliminate manual data entry
- ✅ **Integration**: Connect your tools seamlessly
- ✅ **Compliance**: Automated guest registration for legal requirements
- ✅ **Scalability**: Manage multiple properties efficiently

---

## 🛠️ Installation

### For Development

See [QUICKSTART.md](QUICKSTART.md) for step-by-step instructions.

### For Production (VPS/Docker)

```bash
# On your server
cd /opt
git clone https://github.com/guilleumes/n8n-hotel-nodes.git
cd n8n-hotel-nodes
npm install
npm run build

# Mount in Docker Compose
# See documentation for details
```

---

## 📚 Documentation

- **[SESSION.md](SESSION.md)** - Current development session notes
- **[QUICKSTART.md](QUICKSTART.md)** - Fast setup guide
- **Project Wiki** - Coming soon

---

## 🔗 Related Projects

- **Main Project**: [GUILLEUMES_2026](https://github.com/guilleumes/GUILLEUMES_2026) - Hotel management system
- **n8n**: [n8n.io](https://n8n.io) - Workflow automation platform

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/guilleumes/n8n-hotel-nodes/issues)
- **n8n Community**: [Community Forum](https://community.n8n.io)

---

## 📊 Project Status

| Node | Version | Status | Last Updated |
|------|---------|--------|--------------|
| Beds24 | 1.0.0 | ✅ Stable | 2025-10-08 |
| Cuentica | 1.0.0 | ✅ Stable | 2025-10-08 |
| ParteViajeros | 1.0.0 | ✅ Stable | 2025-10-08 |
| TtLock | - | 🔜 Planned | - |
| UploadMossos | - | 🔜 Planned | - |

---

**Built with ❤️ by the Guilleumes team**
