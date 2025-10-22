# Testing Checklist - NeoVedic Website

This document provides a comprehensive checklist to verify all functionality works correctly after setup.

## 🔧 Pre-Testing Setup

### 1. Environment Verification
- [ ] Node.js version 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (`npm install` completed successfully)
- [ ] `.env` file exists with proper configuration
- [ ] Build process works (`npm run build` completes without errors)

### 2. Server Startup Tests
- [ ] Development server starts (`npm run dev`)
- [ ] Production build and server start (`npm run build && npm start`)
- [ ] Health endpoint responds (`GET /health`)
- [ ] No critical errors in console logs
- [ ] Server binds to correct host and port

## 🌐 Frontend Page Testing

### Core Pages
Test each page loads without errors and displays content:

- [ ] **Home** (`/`) 
  - Hero section displays
  - Navigation works
  - Page renders completely
  
- [ ] **Services** (`/services`)
  - Service cards display
  - Links to service details work
  
- [ ] **Team** (`/team`)
  - Team member profiles display
  - Images load correctly
  
- [ ] **Clients** (`/clients`)
  - Client testimonials display
  - Content renders properly
  
- [ ] **Career** (`/career`)
  - Job listings display
  - Application form accessible
  
- [ ] **Blog** (`/blog`)
  - Blog posts list displays
  - Individual blog links work
  
- [ ] **Contact** (`/contact`)
  - Contact form displays
  - Form submission works
  
- [ ] **FAQ** (`/faq`)
  - FAQ items display
  - Accordion functionality works
  
- [ ] **Hire Resources** (`/hire-resources`)
  - Resource information displays
  - Contact options work

### Service Detail Pages
- [ ] **Web Development** (`/services/web-development`)
- [ ] **DevOps** (`/services/devops`)
- [ ] **Cloud** (`/services/cloud`)
- [ ] **Marketing** (`/services/marketing`)

### Error Handling
- [ ] **404 Page** (invalid URL)
  - Custom not-found page displays
  - Navigation back to home works

## 🔌 API Endpoint Testing

### Health Check
- [ ] `GET /api/health` returns status information
- [ ] Response includes database status
- [ ] Response includes server configuration

### Contact Functionality
- [ ] `POST /api/contact` accepts form submissions
- [ ] `GET /api/contact` returns submissions (if accessible)
- [ ] Form validation works properly
- [ ] Error handling for invalid data

### Job Applications
- [ ] `POST /api/job-applications` accepts applications
- [ ] `GET /api/job-applications` returns applications (if accessible)
- [ ] Resume upload functionality works
- [ ] File size and type validation works

### Blog System
- [ ] `GET /api/blogs` returns blog list
- [ ] `GET /api/blogs/:slug` returns individual blog
- [ ] 404 handling for non-existent blogs

## 🗄️ Database Testing

### MongoDB Mode
- [ ] Connection to MongoDB successful
- [ ] Data persistence works
- [ ] CRUD operations function properly
- [ ] Error handling for connection failures

### Mock Data Mode
- [ ] Mock data system activates when MongoDB unavailable
- [ ] All API endpoints work with mock data
- [ ] Data structure matches expected format
- [ ] Fallback activation is logged properly

## 🎨 UI/UX Testing

### Responsive Design
- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Navigation adapts to screen size

### Interactive Elements
- [ ] Navigation menu works
- [ ] Buttons respond to clicks
- [ ] Forms accept input
- [ ] Links navigate correctly
- [ ] Hover effects work

### Performance
- [ ] Pages load within reasonable time (< 3 seconds)
- [ ] Images load properly
- [ ] No console errors
- [ ] Smooth scrolling and transitions

## 🔒 Error Handling Testing

### Server Errors
- [ ] Graceful handling of port conflicts
- [ ] Proper error messages for configuration issues
- [ ] Fallback behavior when services unavailable
- [ ] Logging of errors for debugging

### Client Errors
- [ ] Network error handling
- [ ] Form validation errors display
- [ ] Loading states show appropriately
- [ ] User-friendly error messages

## 🚀 Production Readiness

### Build Process
- [ ] Production build completes successfully
- [ ] Static files serve correctly
- [ ] Environment variables work in production
- [ ] No development-only code in production build

### Performance Optimization
- [ ] Bundle size warnings addressed
- [ ] Images optimized
- [ ] Unused code eliminated
- [ ] Caching headers set appropriately

## 📋 Manual Testing Scenarios

### New Developer Setup
1. [ ] Clone repository
2. [ ] Run `npm install`
3. [ ] Copy/create `.env` file
4. [ ] Run `npm run dev`
5. [ ] Access application in browser
6. [ ] Verify all pages load

### Production Deployment
1. [ ] Run `npm run build`
2. [ ] Run `npm start`
3. [ ] Test in production-like environment
4. [ ] Verify all functionality works
5. [ ] Check performance metrics

### Database Scenarios
1. [ ] Test with MongoDB connection
2. [ ] Test with MongoDB unavailable
3. [ ] Test fallback to mock data
4. [ ] Verify data persistence

## 🐛 Common Issues Checklist

### Windows Compatibility
- [ ] npm scripts work in PowerShell
- [ ] npm scripts work in Command Prompt
- [ ] Environment variables set correctly
- [ ] File paths resolve properly

### Port and Network
- [ ] Server binds to correct interface
- [ ] Port conflicts handled gracefully
- [ ] Health checks pass
- [ ] API endpoints accessible

### Dependencies
- [ ] All packages installed correctly
- [ ] No missing peer dependencies
- [ ] TypeScript compilation successful
- [ ] No security vulnerabilities

## ✅ Testing Commands

Run these commands to verify functionality:

```bash
# Install and build
npm install
npm run build

# Start development server
npm run dev

# Test health endpoint (in another terminal)
curl http://127.0.0.1:5000/health

# Test API endpoints
curl -X POST http://127.0.0.1:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Start production server
npm start
```

## 📊 Success Criteria

The application is considered fully functional when:

- [ ] All pages load without errors
- [ ] All API endpoints respond correctly
- [ ] Database connection works (or fallback activates)
- [ ] Forms submit successfully
- [ ] Navigation works across all pages
- [ ] Responsive design functions properly
- [ ] No critical console errors
- [ ] Health checks pass
- [ ] Production build works correctly

## 🔍 Debugging Tips

If tests fail:

1. **Check Console Logs**: Look for error messages in browser and server console
2. **Verify Environment**: Ensure `.env` file has correct values
3. **Test Network**: Use browser dev tools to check API requests
4. **Check Dependencies**: Run `npm install` again if needed
5. **Clear Cache**: Hard refresh browser or clear build cache
6. **Test Isolation**: Test individual components/pages separately

## 📝 Test Results Template

Use this template to document test results:

```
Date: ___________
Tester: ___________
Environment: [ ] Development [ ] Production
OS: ___________
Browser: ___________

Frontend Pages: ___/13 passing
API Endpoints: ___/8 passing
Database Tests: ___/4 passing
Error Handling: ___/4 passing

Critical Issues Found:
- 
- 

Minor Issues Found:
- 
- 

Overall Status: [ ] PASS [ ] FAIL
Notes:
```