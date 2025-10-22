# NeoVedic Software Website

A modern full-stack web application built with React, TypeScript, Express.js, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional - app works with mock data)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio-NeoVedic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The project includes a `.env` file with default configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   HOST=127.0.0.1
   MONGODB_URI=mongodb+srv://Himanshu:Himanshu123@himanshu.pe7xrly.mongodb.net/Portfolio
   ENABLE_MOCK_DATA=false
   LOG_LEVEL=info
   ```

   **For development without MongoDB:**
   - Set `ENABLE_MOCK_DATA=true` in `.env`
   - Or remove/comment out `MONGODB_URI`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://127.0.0.1:5000` (or the port shown in console)

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## 🏗️ Project Structure

```
Portfolio-NeoVedic/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express application
│   ├── db/                 # Database models and connection
│   ├── routes.ts           # API routes
│   ├── config.ts           # Server configuration
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
├── dist/                   # Production build output
└── .env                    # Environment configuration
```

## 🌐 Main Pages

The application includes the following pages:

- **Home** (`/`) - Landing page with hero section
- **Services** (`/services`) - Service offerings
- **Team** (`/team`) - Team member profiles
- **Clients** (`/clients`) - Client testimonials
- **Career** (`/career`) - Job opportunities
- **Blog** (`/blog`) - Blog posts and articles
- **Contact** (`/contact`) - Contact form and information
- **FAQ** (`/faq`) - Frequently asked questions
- **Hire Resources** (`/hire-resources`) - Resource hiring

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `HOST` | Server host | `127.0.0.1` |
| `MONGODB_URI` | MongoDB connection string | Optional |
| `ENABLE_MOCK_DATA` | Use mock data instead of database | `false` |
| `LOG_LEVEL` | Logging level | `info` |

### Database Configuration

The application supports two modes:

1. **MongoDB Mode** (Production)
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `ENABLE_MOCK_DATA=false`

2. **Mock Data Mode** (Development)
   - Set `ENABLE_MOCK_DATA=true`
   - Or omit `MONGODB_URI`

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
**Error:** `Port 5000 is already in use`

**Solutions:**
- The app automatically finds an available port
- Check console output for the actual port being used
- Manually set a different port: `PORT=3000 npm run dev`

#### 2. MongoDB Connection Failed
**Error:** `MongoDB connection failed`

**Solutions:**
- Check your `MONGODB_URI` is correct
- Ensure MongoDB server is running
- Use mock data mode: set `ENABLE_MOCK_DATA=true`
- The app automatically falls back to mock data on connection failure

#### 3. npm Scripts Not Working on Windows
**Error:** Environment variable syntax errors

**Solutions:**
- Ensure `cross-env` is installed: `npm install cross-env`
- Use PowerShell or Command Prompt (not Git Bash)
- Try: `npx cross-env NODE_ENV=development tsx server/index.ts`

#### 4. Build Failures
**Error:** TypeScript compilation errors

**Solutions:**
- Run type checking: `npm run check`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for missing dependencies

#### 5. Frontend Not Loading
**Error:** Blank page or loading issues

**Solutions:**
- Check browser console for errors
- Ensure development server is running
- Try hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Check if port is accessible: visit `http://127.0.0.1:5000/health`

### Development Tips

1. **Hot Reload Issues**
   - Restart the dev server: `Ctrl+C` then `npm run dev`
   - Clear browser cache
   - Check file permissions

2. **Performance Issues**
   - Use `npm run build` to test production build
   - Check for large bundle warnings in build output
   - Monitor memory usage in development

3. **API Issues**
   - Check `/health` endpoint for server status
   - Monitor server logs in console
   - Verify API routes in `server/routes.ts`

## 🔍 Health Checks

The application includes built-in health monitoring:

- **Health Endpoint:** `GET /health`
- **Startup Checks:** Automatic server and database validation
- **Error Handling:** Graceful fallbacks for common issues

Example health response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "port": 5000,
  "host": "127.0.0.1",
  "environment": "development",
  "database": "mongodb"
}
```

## 🛠️ Development Workflow

1. **Start Development**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Frontend: Edit files in `client/src/`
   - Backend: Edit files in `server/`
   - Shared: Edit files in `shared/`

3. **Test Changes**
   - Frontend changes auto-reload
   - Backend changes require server restart
   - Check console for errors

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📞 Support

If you encounter issues not covered in this guide:

1. Check the console output for detailed error messages
2. Verify all prerequisites are installed correctly
3. Ensure environment variables are set properly
4. Try the troubleshooting steps above

## 🔄 Version Information

- **Node.js:** v18+ required
- **npm:** v8+ recommended
- **TypeScript:** v5.6.3
- **React:** v18.3.1
- **Express:** v4.21.2