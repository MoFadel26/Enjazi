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



## Screenshots

All screenshots live in the `Screenshots/` folder.

| #  | Description                         |
|:--:|-------------------------------------|
| 1  | Landing Page                        |
| 2  | Sign-Up Form                        |
| 3  | Sign-Up with Google                 |
| 4  | Login Page                          |
| 5  | Dashboard Overview                  |
| 6  | Tasks Page — All Tasks              |
| 7  | Create Task Modal                   |
| 8  | Tasks Page — New Task Added         |
| 9  | Tasks Page — Completed Filter       |
| 10 | Calendar — Month View               |
| 11 | Calendar — Day View                 |
| 12 | Create Event Modal                  |
| 13 | Calendar — New Event on Month View  |
| 14 | Performance Page                    |
| 15 | Rooms — My Rooms                    |
| 16 | Rooms — Public Rooms                |
| 17 | Rooms — Create Room Form            |
| 18 | Rooms — New Room in My Rooms        |
| 19 | Settings — Profile Tab              |
| 20 | Settings — Appearance (Light/Dark)  |
| 21 | Settings — Pomodoro Tab             |
| 22 | Settings — Productivity Tab         |
| 23 | Settings — Notifications Tab        |

User Flow

Landing Page (/)

Screenshot: Screenshots/1.png

Hero banner with "Achieve More with Enjazi" and buttons: Login & Get Started

Sign-Up (/signup)

Screenshots: Screenshots/2.png, Screenshots/3.png

Form fields: Username, Email, Password (real-time validation)

Option to continue with Google OAuth

Login (/login)

Screenshot: Screenshots/4.png

Form fields: Email, Password

Links to Sign Up & Forgot Password

Dashboard (/dashboard)

Screenshot: Screenshots/5.png

Displays Today's Progress bar, Priority Tasks list, Today's Schedule sidebar

Tasks Page – All Tasks (/tasks)

Screenshot: Screenshots/6.png

Default filter: All Tasks

Sidebar filters: All, Today, Upcoming, Completed; Priority; Date Range

Task cards show title, description, due date/time, category icon, priority badge



New Task button opens Create Task modal

Create Task Modal

Screenshot: Screenshots/7.png

Fields: Title, Priority, Category, Date picker, Start & End time pickers, Description

Add Task button saves and closes modal

Tasks Page – After Adding

Screenshot: Screenshots/8.png

New task appears at top under All Tasks

Tasks Page – Completed Filter

Screenshot: Screenshots/9.png

Click Completed filter to view only completed tasks

Calendar – Month View (/calendar)

Screenshot: Screenshots/10.png

Month tab shows events & tasks as color‑coded blocks

Navigation: ← Today →, view toggles (Month/Week/Day), + Add Event

Calendar – Day View

Screenshot: Screenshots/11.png

Day tab displays vertical hourly timeline

Tasks & events positioned by start/end times

Click any slot or block to open EventForm modal

Create Event Modal

Screenshot: Screenshots/12.png

Fields: Title, Priority, Color, Date picker, Time pickers, Description

Save/Cancel buttons

Calendar – New Event in Month View

Screenshot: Screenshots/13.png

Confirms the new event is rendered on the selected date

Performance Page (/performance)

Screenshot: Screenshots/14.png

Metrics: study hours, tasks completed, focus score, streaks

Leaderboard with insights

Rooms – My Enrolled Rooms (/rooms)

Screenshot: Screenshots/15.png

Cards for rooms you’ve joined or created

Rooms – Public Rooms

Screenshot: Screenshots/16.png

Browse available public rooms

Rooms – Create & View New Room

Screenshot: Screenshots/17.png

Form fields: Room Name, Description, Image upload, Category, Public toggle

Settings — Profile (/settings/profile)

Screenshot: Screenshots/18.png

Update avatar, name, email, bio, password

Settings — Appearance (/settings/appearance)

Screenshots: Screenshots/19.png, Screenshots/20.png

Light/Dark theme, accent colors, font size, animations

Settings — Pomodoro (/settings/pomodoro)

Screenshot: Screenshots/21.png

Configure focus/break durations, sessions‑per‑long‑break, audio & auto‑start

Settings — Productivity Goals (/settings/productivity)

Screenshot: Screenshots/22.png

Set daily task targets, focus hours, default task duration & sort order

Settings — Notifications (/settings/notifications)

Screenshot: Screenshots/23.png

Toggle email digest, weekly summary, task reminders, browser alerts

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

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes with clear messages.
4. Push to your fork and create a pull request.

## Contact

For any questions or support, feel free to open an issue or contact the team.

