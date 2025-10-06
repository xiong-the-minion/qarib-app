# Qarib App - Bilingual Meeting Intelligence Platform

A full-stack application for meeting intelligence and knowledge production with support for Arabic and English. Built with Django REST Framework backend and React/Vite frontend, featuring automatic transcript analysis, tag generation, and speaker identification.

## Quick Setup

```bash
# Clone and start
git clone https://github.com/xiong-the-minion/qarib-app.git
cd qarib-app
docker-compose build
docker-compose up -d

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:8000
```

## Development Setup

### Using Docker (Recommended)
```bash
# Start with hot reloading
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Setup
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py import_transcripts
python manage.py runserver

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## AI Tools Used

**Cursor AI** - Primary IDE for code editing, refactoring, and real-time assistance with code completion and error detection.

**Claude (Anthropic)** - Architecture planning, code generation, problem solving, documentation, and Docker configuration.

The development workflow involved using Cursor for rapid development and immediate feedback, while Claude handled complex problem-solving and architectural decisions. Both tools worked together iteratively with real-time testing and validation.

## Time Breakdown

- **Backend Development**: ~45 minutes
- **Frontend Development**: ~4 hours  
- **Docker Setup**: ~30 minutes
- **Total Development Time**: ~5.25 hours

## Architecture

### Backend (Django REST Framework)
- Models: Transcript, Speaker, Tag, TranscriptTag
- RESTful API endpoints with automatic serialization
- Automatic tag generation based on content analysis
- Speaker identification and percentage calculation
- Bilingual support with CORS configuration
- Management commands for data import

### Frontend (React + Vite)
- React 19 with TypeScript
- Tailwind CSS for styling
- React Context API for state management
- react-i18next for Arabic/English support
- Vite for fast development and building

### Database
- Development: SQLite (included)

## Docker Commands

```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# Start with development frontend (hot reloading)
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Clean up everything
docker-compose down -v --remove-orphans
```

## Known Limitations

**Current Limitations**
- Using SQLite for development (not production-ready for scale)
- No user authentication system implemented
- No file upload interface (transcripts imported via management command)
- No WebSocket support for live updates
- Basic error handling (needs improvement for production)
- Limited test coverage (unit tests not implemented)
- No caching or optimization for large datasets
- Basic CORS setup (needs hardening for production)

**Technical Debt**
- Some TypeScript type definitions could be more strict
- Generic error messages (need user-friendly messages)
- Basic loading indicators (could be more sophisticated)

**Scalability Considerations**
- SQLite won't scale beyond single server
- Local file storage (needs cloud storage for production)
- No logging or monitoring system
- No backup strategy

## Environment Variables

Create a `.env` file in the root directory:

```env
# Django Settings
DEBUG=1
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,backend,frontend

# Database
DATABASE_URL=sqlite:///db.sqlite3

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:5173
```

## API Endpoints

### Transcripts
- `GET /api/transcripts/` - List all transcripts
- `GET /api/transcripts/{id}/` - Get specific transcript

### Management Commands
```bash
# Import sample transcripts
docker-compose exec backend python manage.py import_transcripts

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```

## Browser Support

- Chrome: 90+
- Firefox: 88+
- Safari: 14+
- Edge: 90+
