<<<<<<< HEAD
# Matrix Marketplace

A modern B2B marketplace platform with separate frontend and backend.

## Project Structure

```
├── backend/          # Django REST API
├── src/             # React frontend
├── public/          # Static assets
└── deployment files
```

## Quick Start

### Frontend (React)
```bash
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Update .env with your values
python manage.py migrate
python manage.py create_categories
python manage.py runserver
```

## Deployment

- **Frontend**: Deploy to Netlify
- **Backend**: Deploy to Render

See `deployment-guide.md` for detailed instructions.

## Features

- JWT Authentication
- Item Management
- Real-time Messaging
- Image Upload (Cloudinary)
- Advanced Search & Filtering
- User Profiles & Reviews
- Admin Dashboard
- Mobile Responsive

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- React Router
- React Query
- Zustand

**Backend:**
- Django 4.2
- Django REST Framework
- PostgreSQL
- Cloudinary
- Redis
- JWT Authentication
=======
# Puddle | Django

Learn how to build a simple online market place website using Django.

This repository is a part of a video tutorial I created for FreeCodeCamp

My channel:
[CodeWithStein](https://www.youtube.com/channel/UCfVoYvY8BfTDeF63JQmQJvg/?sub_confirmation=1)

## Author
This repository and video is created by CodeWithStein. Check out my website for more information.

[Code With Stein - Website](https://codewithstein.com)
>>>>>>> dc22459be0e21219d2396b1747c1f9107812fc5c
