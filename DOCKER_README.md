# Qarib App - Docker Setup

This project uses Docker to run both the frontend (React/Vite) and backend (Django) applications locally.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Make (optional, for using Makefile commands)

### Running the Application

#### Production Mode (Built Frontend)
```bash
# Build and start all services
make build
make up

# Or using docker-compose directly
docker-compose build
docker-compose up -d
```

#### Development Mode (Hot Reloading)
```bash
# Start with development frontend (hot reloading)
make up-dev

# Or using docker-compose directly
docker-compose --profile dev up -d
```

### Accessing the Application
- **Frontend**: http://localhost:3000 (production) or http://localhost:5173 (development)
- **Backend API**: http://localhost:8000
- **Backend Admin**: http://localhost:8000/admin

## Available Commands

### Using Makefile (Recommended)
```bash
make help          # Show all available commands
make build         # Build all Docker images
make up            # Start all services
make up-dev        # Start with development frontend
make down          # Stop all services
make logs          # Show logs for all services
make logs-backend  # Show backend logs only
make logs-frontend # Show frontend logs only
make shell-backend # Open shell in backend container
make shell-frontend # Open shell in frontend container
make clean         # Remove all containers and volumes
make restart       # Restart all services
make migrate       # Run Django migrations
make import-transcripts # Import transcript data
make status        # Show status of all services
```

### Using Docker Compose Directly
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Start with development frontend
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Run commands in containers
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py import_transcripts
```

## Services

### Backend (Django)
- **Port**: 8000
- **Container**: qarib-backend
- **Features**: 
  - Automatic migrations on startup
  - Automatic transcript import
  - Hot reloading with volume mounts
  - SQLite database

### Frontend (React/Vite)
- **Production Port**: 3000 (Nginx)
- **Development Port**: 5173 (Vite dev server)
- **Container**: qarib-frontend (production) or qarib-frontend-dev (development)
- **Features**:
  - Production: Built React app served by Nginx
  - Development: Hot reloading with Vite dev server
  - API proxy to backend

## Development Workflow

### For Backend Development
1. Start services: `make up-dev`
2. Backend code changes are automatically reflected (volume mounted)
3. For database changes, run: `make migrate`
4. View logs: `make logs-backend`

### For Frontend Development
1. Start services: `make up-dev`
2. Frontend code changes trigger hot reloading
3. View logs: `make logs-frontend`

### For Full-Stack Development
1. Start services: `make up-dev`
2. Both frontend and backend support hot reloading
3. View all logs: `make logs`

## Troubleshooting

### Port Conflicts
If ports 3000, 5173, or 8000 are already in use:
1. Stop conflicting services
2. Or modify ports in `docker-compose.yml`

### Database Issues
```bash
# Reset database
make clean
make up
make migrate
make import-transcripts
```

### Container Issues
```bash
# Rebuild containers
make clean
make build
make up
```

### View Container Status
```bash
make status
# or
docker-compose ps
```

## Environment Variables

Copy `env.example` to `.env` and modify as needed:
```bash
cp env.example .env
```

Key variables:
- `DEBUG`: Django debug mode
- `CORS_ALLOWED_ORIGINS`: Allowed CORS origins
- `ALLOWED_HOSTS`: Django allowed hosts

## File Structure

```
├── docker-compose.yml          # Main Docker Compose configuration
├── docker-compose.override.yml # Development overrides
├── Makefile                    # Convenient commands
├── env.example                 # Environment variables template
├── backend/
│   ├── Dockerfile             # Backend container definition
│   └── .dockerignore          # Backend ignore patterns
└── frontend/
    ├── Dockerfile             # Frontend production container
    ├── Dockerfile.dev         # Frontend development container
    ├── nginx.conf             # Nginx configuration
    └── .dockerignore          # Frontend ignore patterns
```
