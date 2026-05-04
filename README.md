# HR Recruitment SaaS - Complete Integration

A production-ready HR Recruitment platform with full backend-frontend integration, featuring job posting, candidate management, interview scheduling, and billing.

## 🎯 Overview

This is a complete Software-as-a-Service (SaaS) platform for HR recruitment built with:
- **Backend**: Node.js + Express + MySQL
- **Frontend**: React + Vite + Tailwind CSS
- **Authentication**: JWT with role-based access control
- **Database**: MySQL with comprehensive schema

---

## ✨ Features

### 🏢 Company Management
- Company registration and login
- Team member management
- Role-based access control (Admin, HR, Recruiter)
- Company profile management

### 💼 Job Management
- Create and post job openings
- Edit job descriptions and requirements
- Track applicant count per job
- Close/reopen jobs
- Salary range specification
- Department organization

### 👥 Candidate Management
- Add candidates manually
- Track candidate pipeline stages (Applied → Screening → Interview → Selected/Rejected)
- Update candidate information
- Search and filter candidates
- Skills tracking
- Resume URL management
- Source tracking (LinkedIn, referral, etc.)

### 📞 Interview Scheduling
- Schedule interviews with candidates
- Assign interviewers
- Track interview status
- Reschedule/cancel interviews
- Interview notes and feedback

### ⭐ Candidate Evaluation
- Add detailed notes for candidates
- Rate candidate performance (1-5 stars)
- Track average ratings
- Export rating reports

### 📊 Analytics Dashboard
- Real-time statistics (open jobs, total candidates, interviews today, hired this month)
- Candidate pipeline visualization
- Recent candidates activity
- Upcoming interviews
- Top performers ranking
- Job-wise statistics

### 💳 Billing & Subscriptions
- Multiple subscription plans (Free, Pro, Enterprise)
- Plan upgrades/downgrades
- Invoice management
- Usage tracking

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **MySQL** 5.7+
- **npm** or **yarn**

### Automatic Setup (Windows)
```bash
# Double-click this file
startup.bat
```

### Automatic Setup (Mac/Linux)
```bash
bash startup.sh
```

### Manual Setup

**1. Backend Setup**
```bash
cd Backend/Server
npm install
cp .env.example .env
# Update .env with your MySQL credentials
npm start
```

**2. Frontend Setup (new terminal)**
```bash
cd Frontend
npm install
npm run dev
```

**3. Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## 📁 Project Structure

```
Hr_SAAS/
├── Backend/
│   └── Server/
│       ├── src/
│       │   ├── app.js                 # Express app
│       │   ├── database.sql           # Database schema
│       │   ├── config/
│       │   │   └── db.js              # Database connection
│       │   ├── controllers/           # Business logic
│       │   │   ├── authController.js
│       │   │   ├── candidateController.js
│       │   │   ├── jobController.js
│       │   │   ├── dashboardController.js
│       │   │   ├── interviewController.js
│       │   │   ├── notesController.js
│       │   │   ├── teamController.js
│       │   │   └── subscriptionController.js
│       │   ├── routes/                # API endpoints
│       │   ├── middleware/
│       │   │   ├── authMiddleware.js
│       │   │   ├── roleMiddleware.js
│       │   │   └── errorMiddleware.js
│       │   └── utils/
│       │       ├── validators.js
│       │       ├── generateToken.js
│       │       └── errorHandler.js
│       ├── .env                       # Configuration (create from .env.example)
│       ├── .env.example               # Template
│       ├── package.json
│       ├── API_DOCUMENTATION.md       # Full API reference
│       ├── IMPLEMENTATION_SUMMARY.md  # Feature checklist
│       └── README.md                  # Backend setup guide
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                    # Main component
│   │   ├── main.jsx                   # Entry point
│   │   ├── index.css                  # Global styles
│   │   ├── components/
│   │   │   ├── common/                # Reusable UI components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Table.jsx
│   │   │   └── layout/                # Page layout
│   │   │       ├── AppLayout.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Auth state management
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Landing.jsx
│   │   │   │   └── Pricing.jsx
│   │   │   └── private/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Jobs.jsx
│   │   │       ├── Candidates.jsx
│   │   │       ├── Team.jsx
│   │   │       ├── Billing.jsx
│   │   │       ├── Profile.jsx
│   │   │       └── Settings.jsx
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleBasedRoute.jsx
│   │   ├── services/                  # API integration
│   │   │   ├── api.js                 # Axios instance with interceptors
│   │   │   ├── authService.js
│   │   │   ├── jobService.js
│   │   │   ├── candidateService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── interviewService.js
│   │   │   ├── notesService.js
│   │   │   ├── teamService.js
│   │   │   └── subscriptionService.js
│   │   └── utils/
│   │       ├── helpers.js
│   │       └── errorHandler.js
│   ├── .env                           # Configuration
│   ├── .env.example                   # Template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── IMPLEMENTATION_GUIDE.md        # Setup guide
│   └── PRODUCTION_CHECKLIST.md        # Production readiness checklist
│
├── INTEGRATION_SUMMARY.md             # This integration overview
├── TESTING_GUIDE.md                   # Testing & debugging guide
├── PRODUCTION_DEPLOYMENT.md           # Production deployment guide
├── startup.bat                        # Windows startup script
├── startup.sh                         # Mac/Linux startup script
└── README.md                          # This file
```

---

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hr_saas

# Security
JWT_SECRET=your_very_long_random_secret_key_min_32_chars
NODE_ENV=development

# Server
PORT=5000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Payment (optional)
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=HR Recruitment SaaS
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [API_DOCUMENTATION.md](Backend/Server/API_DOCUMENTATION.md) | Complete REST API reference with examples |
| [IMPLEMENTATION_SUMMARY.md](Backend/Server/IMPLEMENTATION_SUMMARY.md) | Feature checklist and backend summary |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | How to test API and UI, debugging tips |
| [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) | Production deployment & security guide |
| [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) | Integration overview and checklist |

---

## 🔐 Security Features

### Implemented
✅ JWT authentication with 7-day expiration  
✅ Password hashing with bcryptjs  
✅ Input validation on all endpoints  
✅ CORS protection  
✅ SQL parameterized queries  
✅ Role-based access control  
✅ Token refresh mechanism  
✅ Automatic logout on 401  

### Recommended for Production
🔧 HTTPS/SSL certificates  
🔧 Rate limiting (express-rate-limit)  
🔧 Security headers (helmet)  
🔧 CSRF protection  
🔧 API key management  
🔧 Database encryption  
🔧 Audit logging  

---

## 🧪 Testing

### Test the Integration

1. **Register Company**
   ```
   POST http://localhost:5000/api/auth/company/register
   ```

2. **Login**
   ```
   POST http://localhost:5000/api/auth/company/login
   ```

3. **Create Job**
   ```
   POST http://localhost:5000/api/jobs
   ```

4. **Add Candidate**
   ```
   POST http://localhost:5000/api/candidates
   ```

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing instructions.

---

## 🚀 Deployment

### Production Checklist

- [ ] Update all environment variables
- [ ] Configure MySQL with production credentials
- [ ] Set up SSL/TLS certificates
- [ ] Enable rate limiting
- [ ] Configure security headers
- [ ] Set up monitoring and logging
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Load test the application
- [ ] Configure CDN for static assets

See [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) for complete deployment guide.

---

## 📊 API Endpoints Summary

### Authentication
```
POST   /api/auth/company/register      Register company
POST   /api/auth/company/login         Company login
POST   /api/auth/register              Add team member
POST   /api/auth/login                 Team member login
GET    /api/auth/me                    Current user profile
```

### Jobs
```
GET    /api/jobs                       List all jobs
POST   /api/jobs                       Create job
GET    /api/jobs/:id                   Get job details
PUT    /api/jobs/:id                   Update job
DELETE /api/jobs/:id                   Delete job
```

### Candidates
```
GET    /api/candidates                 List candidates
POST   /api/candidates                 Add candidate
GET    /api/candidates/:id             Get candidate details
PUT    /api/candidates/:id             Update candidate
PUT    /api/candidates/:id/stage       Update candidate stage
DELETE /api/candidates/:id             Delete candidate
```

### Dashboard
```
GET    /api/dashboard/stats            Key metrics
GET    /api/dashboard/detailed         Detailed dashboard data
```

### Interviews
```
GET    /api/interviews                 List interviews
POST   /api/interviews                 Schedule interview
PUT    /api/interviews/:id/complete    Complete interview
PUT    /api/interviews/:id/cancel      Cancel interview
```

### Notes & Ratings
```
GET    /api/notes/candidate/:id        Get candidate notes
POST   /api/notes                      Add note
PUT    /api/notes/:id                  Update note
DELETE /api/notes/:id                  Delete note
```

See [API_DOCUMENTATION.md](Backend/Server/API_DOCUMENTATION.md) for complete details.

---

## 🐛 Troubleshooting

### Backend Won't Start
```
Error: connect ECONNREFUSED
→ MySQL not running. Start MySQL service.
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
→ Change PORT in .env or kill process on port 5000
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
→ Check FRONTEND_URL in backend .env matches your frontend URL
```

### Database Connection Failed
```
Error: ER_ACCESS_DENIED_FOR_USER
→ Check DB_USER, DB_PASSWORD, DB_HOST in .env
```

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for more debugging tips.

---

## 📈 Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- CSS minification with Tailwind
- Efficient re-renders with React hooks

### Backend
- Database query optimization
- Connection pooling
- Request caching ready
- Pagination implemented

---

## 🔄 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Backend: `Backend/Server/src/`
   - Frontend: `Frontend/src/`

3. **Test Changes**
   ```bash
   # Backend tests
   npm test

   # Frontend tests
   npm run test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📞 Support & Contact

- **Documentation**: See files in project root
- **API Reference**: [Backend/Server/API_DOCUMENTATION.md](Backend/Server/API_DOCUMENTATION.md)
- **Deployment Guide**: [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
- **Testing Guide**: [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🎉 Ready to Go!

Your HR Recruitment SaaS is fully integrated and production-ready. 

**Next Steps:**
1. ✅ Run `startup.bat` (Windows) or `bash startup.sh` (Mac/Linux)
2. ✅ Open http://localhost:5173
3. ✅ Register your company
4. ✅ Start posting jobs and managing candidates!

**For Production:**
- Follow [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
- Set up monitoring and backups
- Configure security and SSL
- Deploy to your server

---

**Created with ❤️ | Fully Integrated | Production Ready**

