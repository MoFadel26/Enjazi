# Enjazi - Smart Productivity Platform

## Overview

Enjazi is a productivity platform designed to help users develop sustainable work habits. Unlike traditional task managers, Enjazi integrates adaptive scheduling, goal tracking, and a ranked honor system where users earn digital rewards for consistent performance. The platform targets students, professionals, and productivity enthusiasts looking for a structured yet engaging approach to time management.

## Features

- **Adaptive Scheduling**: Automatically adjusts tasks based on user behavior and workload.
- **Goal Tracking**: Users can set and track goals to maintain productivity.
- **Competitive Rooms**: Create or join rooms to compete with friends and colleagues.
- **Leaderboard System**: Users earn streaks and compete for rankings.
- **Task Management**: Create, edit, delete tasks with priority, category, and deadline attributes.
- **Calendar Integration**: View tasks in a calendar format for easy planning.
- **User Roles**:
    - **Regular Users**: Manage personal tasks, join rooms, compete in leaderboards.
    - **Room Admins**: Create and manage rooms, assign tasks, moderate leaderboards.
    - **System Administrators**: Oversee the platform, manage themes, enforce policies.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/MoFadel26/Enjazi.git
   cd enjazi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

## Deployment with Vercel

### Prerequisites
- A [Vercel](https://vercel.com) account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database

### Steps

1. Fork or clone this repository to your GitHub account.

2. Set up your MongoDB Atlas database and obtain the connection string.

3. Connect your GitHub repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

4. Set up the following environment variables in Vercel:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure string for JWT token signing
   - `FRONTEND_URL`: The URL of your deployed frontend

5. Deploy the project:
   - Click "Deploy"
   - Vercel will automatically deploy your project based on the configuration in `vercel.json`

6. After deployment, you can access your application at the provided Vercel URL.

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes with clear messages.
4. Push to your fork and create a pull request.

## Contact

For any questions or support, feel free to open an issue or contact the team.

