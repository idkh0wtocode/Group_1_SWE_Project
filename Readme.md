# Super Mega Magic Marketplace

A full-stack marketplace application with real-time messaging, product listings, and shopping cart.

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

## Running the Application

### Frontend (React - Port 5173)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Django - Port 8000)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Messaging Server (Node - Port 5000)
```bash
cd backend/messaging
npm install
node index.js
```

## Test Accounts
- Username: test | Password: test123 (Admin)
- Username: alice | Password: alice123
- Username: bob | Password: bob123

## Features
- Real-time messaging with Socket.io between users
- Product marketplace with search and filter
- Shopping cart functionality
- User authentication with JWT tokens
- Admin dashboard and user management

## Tech Stack
- Frontend: React, Vite, Bootstrap 5
- Backend: Django, REST Framework, PostgreSQL
- Messaging: Node.js, Express, Socket.io
- Database: PostgreSQL with UUID support

## Project Structure
```
backend/
├── messaging/          # Real-time messaging server
├── users/              # User authentication
├── products/           # Product management
├── orders/             # Orders management
└── cart/               # Shopping cart

frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── main.jsx
└── index.html
```

## Contributing
When working on features, ensure:
- All three servers (frontend, backend, messaging) are running
- Test with provided test accounts
- Maintain Bootstrap 5 styling consistency
- Test messaging functionality end-to-end
