# Matrix Marketplace - Deployment Guide

This guide covers deploying the separated frontend and backend applications.

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

Navigate to the backend directory:
```bash
cd backend
```

1. **Update Environment Variables**:
   - Copy `.env.example` to `.env`
   - Update all values with your production credentials
   - Set `FRONTEND_URL` to your Netlify domain
   - Set `DEBUG=False` for production

2. **Database Setup**:
   - Create a PostgreSQL database on Render or use external service
   - Update database credentials in environment variables

3. **Static Files**:
   - Ensure `STATIC_ROOT` is set correctly
   - Run `python manage.py collectstatic` during build

### 2. Deploy to Render

1. **Connect Repository**:
   - Connect your GitHub repository to Render
   - Select the backend service type

2. **Configure Build Settings**:
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - Start Command: `gunicorn puddle.wsgi:application`

3. **Environment Variables**:
   - Add all variables from `backend/.env.example`
   - Use Render's environment variable interface

4. **Database Migration**:
   - Run initial migrations: `python manage.py migrate`
   - Create superuser: `python manage.py createsuperuser`
   - Create categories: `python manage.py create_categories`

## Frontend Deployment (Netlify)

### 1. Prepare Frontend for Deployment

1. **Update Environment Variables**:
   - Create `.env.production` file
   - Set `VITE_API_URL` to your Render backend URL

2. **Build Configuration**:
   - Ensure `netlify.toml` is configured correctly
   - Test build locally: `npm run build`

### 2. Deploy to Netlify

1. **Connect Repository**:
   - Connect your GitHub repository to Netlify
   - Select the frontend folder if using monorepo

2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: 18

3. **Environment Variables**:
   - Add `VITE_API_URL` pointing to your Render backend

4. **Redirects**:
   - Netlify will use the `netlify.toml` for SPA redirects

## Local Development

### Backend (Django)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate
python manage.py create_categories
python manage.py createsuperuser

# Create categories (should be automatic, but if needed)
python manage.py create_categories

### Frontend (React)
```bash
# From project root
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run development server
npm run dev
```

## API Endpoints

The backend now provides a REST API at `/api/`:

- **Authentication**: `/api/auth/`
  - `POST /api/auth/token/` - Login
  - `POST /api/auth/token/refresh/` - Refresh token
  - `POST /api/auth/register/` - Register
  - `GET /api/auth/profile/` - Get profile

- **Items**: `/api/items/`
  - `GET /api/items/items/` - List items
  - `POST /api/items/items/` - Create item
  - `GET /api/items/items/{id}/` - Get item
  - `PATCH /api/items/items/{id}/` - Update item
  - `DELETE /api/items/items/{id}/` - Delete item

- **Categories**: `/api/categories/`
- **Conversations**: `/api/conversations/`

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (development)
- Your Netlify domain (production)

Update `FRONTEND_URL` in your backend environment variables to match your Netlify domain.

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Restrict to your frontend domain only
3. **HTTPS**: Use HTTPS in production
4. **Database**: Use strong passwords and restrict access
5. **JWT Tokens**: Configure appropriate expiration times

## Monitoring and Maintenance

1. **Logs**: Monitor Render logs for backend issues
2. **Performance**: Use Render metrics for performance monitoring
3. **Updates**: Keep dependencies updated
4. **Backups**: Regular database backups
5. **SSL**: Ensure SSL certificates are valid

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Check `FRONTEND_URL` in backend settings
2. **API Not Found**: Verify `VITE_API_URL` in frontend
3. **Database Connection**: Check database credentials
4. **Static Files**: Ensure `collectstatic` runs during build
5. **Environment Variables**: Verify all required variables are set

### Debug Steps:

1. Check browser network tab for API calls
2. Review Render logs for backend errors
3. Verify environment variables are set correctly
4. Test API endpoints directly with tools like Postman
5. Check database connectivity and migrations