# Team19 Make-It-All System

A modern helpdesk and issue-tracking application built by Team 19 for COB290 (2025).

## What This Project Does

**Make-It-All** is a comprehensive helpdesk system featuring:

- **User Authentication** - Secure login and registration with role-based access (Manager/Employee)
- **Employee Dashboard** - Task management, knowledge base access, team posts
- **Manager Dashboard** - Analytics, team performance tracking, project statistics
- **Task Management** - Create, track, and manage tasks with priority levels
- **Knowledge Base** - Organized topics and posts for team collaboration
- **Team Posts** - Share updates and discussions within the organization
- **Responsive Design** - Mobile-friendly interface with dark mode support

## Technologies Used

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Styling**: Custom CSS variables + Tailwind utilities
- **Charts**: Chart.js for analytics visualization
- **Icons**: React Icons

## How to Use

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Demo Credentials

**Managers:**
- Username: `bwayne` / Password: `batman!`
- Username: `dprince` / Password: `wonder123`

**Employees:**
- Username: `jdoe` / Password: `pass1234`
- Username: `asmith` / Password: `hello2025`

## Project Structure

- `src/app/` - Next.js routes and pages
- `src/components/` - Reusable React components
- `src/lib/` - Context providers and utilities
- `src/styles/` - Global CSS and Tailwind configuration
- `src/data/` - Mock data (users, tasks, posts, etc.)
- `public/` - Static assets

## Features

✅ Secure authentication system
✅ Role-based access control
✅ Task tracking and management
✅ Team collaboration tools
✅ Real-time dashboard analytics
✅ Dark mode support
✅ Responsive mobile design
✅ Production-ready build
