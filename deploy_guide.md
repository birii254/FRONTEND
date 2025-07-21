# Matrix Marketplace - Free Deployment Guide

## 🚀 Free Hosting Options

### 1. Railway (Recommended)
**Free Tier**: $5 credit monthly, PostgreSQL included

1. **Setup Railway**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize project
   railway init
   ```

2. **Deploy**:
   ```bash
   # Deploy to Railway
   railway up
   
   # Add PostgreSQL
   railway add postgresql
   
   # Set environment variables
   railway variables set SECRET_KEY=your-secret-key
   railway variables set DEBUG=False
   railway variables set CLOUDINARY_CLOUD_NAME=your-cloud-name
   # ... add other variables
   ```

### 2. Heroku (Free tier discontinued, but still affordable)
1. **Install Heroku CLI**
2. **Create Procfile**:
   ```
   web: gunicorn puddle.wsgi
   release: python manage.py migrate
   ```
3. **Deploy**:
   ```bash
   heroku create matrix-marketplace
   heroku addons:create heroku-postgresql:mini
   heroku config:set SECRET_KEY=your-secret-key
   git push heroku main
   ```

### 3. Render (Free tier available)
1. **Connect GitHub repository**
2. **Set build command**: `pip install -r requirements.txt`
3. **Set start command**: `gunicorn puddle.wsgi:application`
4. **Add PostgreSQL addon**

## 🗄️ Free Database Options

### 1. Supabase (Recommended)
- **Free tier**: 500MB database, 50MB file storage
- **Setup**:
  1. Create account at supabase.com
  2. Create new project
  3. Get connection details from Settings > Database
  4. Update `.env` with connection string

### 2. PlanetScale
- **Free tier**: 1 database, 1GB storage
- **MySQL compatible**

### 3. Railway PostgreSQL
- **Included with Railway hosting**
- **Automatic setup**

## ☁️ Free Image Storage - Cloudinary

### Setup Cloudinary (Free: 25GB storage, 25GB bandwidth)
1. **Create account** at cloudinary.com
2. **Get credentials** from Dashboard
3. **Update .env**:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 📧 Free Email Service

### Gmail SMTP (Free)
1. **Enable 2FA** on Gmail account
2. **Generate App Password**:
   - Google Account > Security > App passwords
   - Generate password for "Mail"
3. **Update .env**:
   ```
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   ```

## 🔧 Environment Variables Setup

Create `.env` file:
```env
# Django
SECRET_KEY=your-super-secret-key-here
DEBUG=False
USE_SQLITE=False

# Database (from your hosting provider)
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Allowed Hosts
ALLOWED_HOSTS=your-domain.com,your-app.railway.app
```

## 🚀 Quick Deploy Commands

### Railway Deployment
```bash
# Clone and setup
git clone your-repo
cd matrix-marketplace
pip install -r requirements.txt

# Setup Railway
railway login
railway init
railway add postgresql

# Set environment variables
railway variables set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
railway variables set DEBUG=False
railway variables set CLOUDINARY_CLOUD_NAME=your-cloud-name
railway variables set CLOUDINARY_API_KEY=your-api-key
railway variables set CLOUDINARY_API_SECRET=your-api-secret
railway variables set EMAIL_HOST_USER=your-email@gmail.com
railway variables set EMAIL_HOST_PASSWORD=your-app-password

# Deploy
railway up
```

### Post-Deployment Setup
```bash
# Create superuser (run in Railway console)
python manage.py createsuperuser

# Load sample categories
python manage.py shell
# Then run category creation script
```

## 📱 Domain Setup (Optional - Free with some providers)

### Free Domain Options:
1. **Freenom** (.tk, .ml, .ga domains)
2. **GitHub Student Pack** (free .me domain)
3. **Use Railway/Render subdomain** (free)

## 🔒 Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Enable HTTPS (automatic on Railway/Render)
- [ ] Set proper `ALLOWED_HOSTS`
- [ ] Use environment variables for secrets
- [ ] Enable CSRF protection
- [ ] Set up proper CORS headers

## 📊 Monitoring (Free tiers available)

1. **Sentry** - Error tracking (free tier)
2. **LogRocket** - User session recording
3. **Google Analytics** - Traffic analytics

## 🎯 Total Monthly Cost: $0-5

With this setup, you can run Matrix Marketplace completely free or for under $5/month, making it more cost-effective than Jiji while providing superior features and performance.