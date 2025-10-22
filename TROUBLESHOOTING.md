# Troubleshooting Guide - NeoVedic Website

This guide provides detailed solutions for common issues you might encounter when setting up and running the NeoVedic website.

## 🚨 Critical Issues

### 1. Server Won't Start

#### Symptom: `npm run dev` or `npm start` fails immediately

**Possible Causes & Solutions:**

**A. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- **Solution 1**: The app automatically finds an available port
- **Solution 2**: Set a different port: `PORT=3000 npm run dev`
- **Solution 3**: Kill process using port: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

**B. Permission Denied**
```
Error: listen EACCES: permission denied 0.0.0.0:5000
```
- **Solution**: Use a port above 1024: `PORT=8000 npm run dev`
- **Alternative**: Run as administrator (not recommended)

**C. Host Binding Issues**
```
Error: getaddrinfo ENOTFOUND 0.0.0.0
```
- **Solution**: Change host in `.env`: `HOST=127.0.0.1` or `HOST=localhost`

### 2. MongoDB Connection Issues

#### Symptom: Database connection errors in console

**A. Connection String Invalid**
```
MongoServerError: bad auth : authentication failed
```
- **Solution 1**: Verify MongoDB URI in `.env`
- **Solution 2**: Enable mock data: `ENABLE_MOCK_DATA=true`
- **Solution 3**: Check MongoDB Atlas whitelist settings

**B. Network Timeout**
```
MongooseServerSelectionError: connect ETIMEDOUT
```
- **Solution 1**: Check internet connection
- **Solution 2**: Use mock data mode: `ENABLE_MOCK_DATA=true`
- **Solution 3**: Verify MongoDB cluster is running

**C. Automatic Fallback**
```
⚠️ MongoDB connection failed - falling back to mock data
```
- **This is normal**: App continues with mock data
- **To fix**: Check MongoDB URI and network connectivity

### 3. Build Failures

#### Symptom: `npm run build` fails with errors

**A. TypeScript Errors**
```
error TS2307: Cannot find module '@/components/ui/button'
```
- **Solution**: Check `tsconfig.json` path mapping
- **Fix**: Ensure all imports use correct paths
- **Command**: `npm run check` to see all TypeScript errors

**B. Missing Dependencies**
```
Module not found: Can't resolve 'some-package'
```
- **Solution**: Install missing package: `npm install some-package`
- **Alternative**: Clear and reinstall: `rm -rf node_modules && npm install`

**C. Memory Issues**
```
JavaScript heap out of memory
```
- **Solution**: Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run build`

## 🔧 Development Issues

### 4. Hot Reload Not Working

#### Symptom: Changes don't reflect in browser

**Solutions:**
1. **Hard Refresh**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. **Restart Dev Server**: `Ctrl+C` then `npm run dev`
3. **Clear Browser Cache**: Open DevTools → Application → Clear Storage
4. **Check File Permissions**: Ensure files are not read-only
5. **Disable Browser Extensions**: Some extensions block hot reload

### 5. API Endpoints Not Working

#### Symptom: Frontend can't connect to backend

**A. CORS Issues**
```
Access to fetch at 'http://localhost:5000/api/health' from origin 'http://localhost:3000' has been blocked by CORS policy
```
- **Check**: Ensure frontend and backend run on same port in development
- **Verify**: Development server should serve both frontend and API

**B. Wrong API URL**
```
GET http://localhost:3000/api/health 404 (Not Found)
```
- **Solution**: API should be on same port as frontend in development
- **Check**: Server logs for actual port being used

### 6. Frontend Pages Not Loading

#### Symptom: Blank page or loading spinner

**A. JavaScript Errors**
- **Check**: Browser console for error messages
- **Common Fix**: Clear browser cache and hard refresh
- **Debug**: Open DevTools → Console tab

**B. Routing Issues**
```
Cannot GET /services
```
- **In Development**: Should work automatically with Vite
- **In Production**: Ensure server serves `index.html` for all routes

**C. Component Errors**
```
Error: Cannot read property 'map' of undefined
```
- **Solution**: Check if data is loading properly
- **Debug**: Add loading states and error boundaries

## 🖥️ Windows-Specific Issues

### 7. npm Script Errors

#### Symptom: Environment variable syntax errors

**A. PowerShell Execution Policy**
```
cannot be loaded because running scripts is disabled on this system
```
- **Solution**: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

**B. Command Not Found**
```
'cross-env' is not recognized as an internal or external command
```
- **Solution**: Install cross-env: `npm install cross-env`
- **Alternative**: Use PowerShell: `$env:NODE_ENV="development"; tsx server/index.ts`

**C. Path Issues**
```
The system cannot find the path specified
```
- **Solution**: Use forward slashes in paths
- **Check**: Ensure all file paths exist

### 8. File Permission Issues

#### Symptom: Cannot write files or access directories

**Solutions:**
1. **Run as Administrator**: Right-click terminal → "Run as administrator"
2. **Check Antivirus**: Temporarily disable real-time protection
3. **File Permissions**: Right-click folder → Properties → Security → Full Control

## 🌐 Network and Connectivity

### 9. Cannot Access Application

#### Symptom: Browser shows "This site can't be reached"

**A. Wrong URL**
- **Check**: Console output for actual server address
- **Try**: `http://127.0.0.1:5000` instead of `http://localhost:5000`

**B. Firewall Blocking**
- **Solution**: Add exception for Node.js in Windows Firewall
- **Alternative**: Use `HOST=127.0.0.1` in `.env`

**C. Proxy Issues**
- **Check**: Corporate proxy settings
- **Solution**: Configure npm proxy: `npm config set proxy http://proxy:port`

### 10. Slow Performance

#### Symptom: Application loads slowly

**A. Development Mode**
- **Normal**: Development builds are larger and slower
- **Test Production**: `npm run build && npm start`

**B. Large Bundle Size**
```
(!) Some chunks are larger than 500 kB after minification
```
- **Solution**: Use dynamic imports for large components
- **Check**: Build output for specific large files

**C. Network Issues**
- **Check**: Browser DevTools → Network tab
- **Solution**: Optimize images and assets

## 🔍 Debugging Strategies

### General Debugging Steps

1. **Check Console Logs**
   - Browser console (F12)
   - Server console (terminal)
   - Look for error messages and stack traces

2. **Verify Environment**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 8+
   ```

3. **Test Health Endpoint**
   ```bash
   curl http://127.0.0.1:5000/health
   # or visit in browser
   ```

4. **Check File Structure**
   ```bash
   ls -la  # Verify all files exist
   cat .env  # Check environment variables
   ```

5. **Clean Installation**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Advanced Debugging

1. **Enable Debug Logging**
   ```bash
   LOG_LEVEL=debug npm run dev
   ```

2. **Check Network Requests**
   - Open DevTools → Network tab
   - Look for failed requests (red entries)
   - Check request/response details

3. **Inspect Database Connection**
   - Visit `/api/health` endpoint
   - Check database status in response

4. **Test Individual Components**
   - Comment out problematic code sections
   - Test pages individually
   - Use browser React DevTools

## 📞 Getting Help

### Before Asking for Help

1. **Check This Guide**: Look for your specific error message
2. **Search Console Logs**: Copy exact error messages
3. **Test Basic Functionality**: Try `npm run build` and `npm start`
4. **Document Steps**: Note what you were doing when error occurred

### Information to Provide

When reporting issues, include:

- **Operating System**: Windows version
- **Node.js Version**: `node --version`
- **npm Version**: `npm --version`
- **Error Message**: Full error text from console
- **Steps to Reproduce**: What you did before the error
- **Environment**: Development or production
- **Browser**: If frontend issue

### Quick Fixes to Try First

1. **Restart Everything**
   ```bash
   # Stop all processes (Ctrl+C)
   npm run dev
   ```

2. **Clear All Caches**
   ```bash
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

3. **Reset Environment**
   ```bash
   # Copy .env.example to .env (if exists)
   # Or verify .env has correct values
   ```

4. **Test Minimal Setup**
   ```bash
   ENABLE_MOCK_DATA=true npm run dev
   ```

## ✅ Success Indicators

Your setup is working correctly when:

- [ ] `npm run dev` starts without errors
- [ ] Browser shows application at `http://127.0.0.1:5000`
- [ ] All main pages load (Home, Services, Contact, etc.)
- [ ] Console shows no critical errors
- [ ] Health endpoint returns status: `http://127.0.0.1:5000/health`
- [ ] Contact form can be submitted
- [ ] Navigation between pages works

## 🔄 Recovery Procedures

### Complete Reset

If nothing works, try this complete reset:

```bash
# 1. Stop all processes
# Press Ctrl+C in all terminals

# 2. Clean everything
rm -rf node_modules
rm -rf dist
rm package-lock.json

# 3. Fresh install
npm install

# 4. Test build
npm run build

# 5. Start development
npm run dev
```

### Environment Reset

```bash
# 1. Backup current .env
cp .env .env.backup

# 2. Create minimal .env
echo "NODE_ENV=development" > .env
echo "PORT=5000" >> .env
echo "HOST=127.0.0.1" >> .env
echo "ENABLE_MOCK_DATA=true" >> .env

# 3. Test
npm run dev
```

This troubleshooting guide should help resolve most common issues. If you encounter problems not covered here, check the console output carefully and follow the debugging strategies provided.