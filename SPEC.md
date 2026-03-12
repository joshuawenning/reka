# Reka - Time Tracking App Specification

## 1. Project Overview

- **Project Name**: Reka
- **Type**: Single-page web application (SPA-like with Astro)
- **Core Functionality**: A minimalist time tracking app for freelance creatives to track work sessions on projects, with manual entry support, project grouping, and customizable time preferences.
- **Target Users**: Freelance designers, developers, writers, and other creative professionals
- **Tech Stack**: Astro, vanilla JavaScript, scoped CSS, localStorage for persistence

---

## 2. UI/UX Specification

### Layout Structure

**Page Sections:**
1. **Header** (64px height)
   - Logo/App name (left)
   - Theme toggle + Settings gear icon (right)
   - Current running timer display (center, if active)

2. **Main Content Area**
   - Active Timer Section (when tracking)
   - Quick Project Selector / New Project Input
   - Time Entries List (grouped by project)
   - Manual Entry Form (collapsible)

3. **Footer** (48px height)
   - Minimal footer with subtle branding

**Grid/Layout:**
- Max content width: 720px (centered)
- Single column layout for focus
- Generous vertical spacing between sections (32px)

**Responsive Breakpoints:**
- Mobile: < 640px (full width with 16px padding)
- Tablet/Desktop: >= 640px (centered 720px container)

### Visual Design

**Color Palette:**

*Light Theme:*
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Text Primary: `#1A1A1A`
- Text Secondary: `#6B6B6B`
- Text Muted: `#9CA3AF`
- Accent: `#E63946` (Swiss red)
- Accent Hover: `#D62839`
- Border: `#E5E5E5`
- Success: `#10B981`

*Dark Theme:*
- Background: `#0A0A0A`
- Surface: `#141414`
- Text Primary: `#FAFAFA`
- Text Secondary: `#A3A3A3`
- Text Muted: `#525252`
- Accent: `#FF6B6B`
- Accent Hover: `#FF8585`
- Border: `#262626`
- Success: `#34D399`

**Typography:**
- Font Family: `"DM Sans", system-ui, sans-serif` (Google Fonts)
- Headings:
  - H1: 32px, font-weight 700, letter-spacing -0.02em
  - H2: 24px, font-weight 600, letter-spacing -0.01em
  - H3: 18px, font-weight 600
- Body: 15px, font-weight 400, line-height 1.6
- Monospace (timer): `"JetBrains Mono", monospace` (Google Fonts)

**Spacing System:**
- Base unit: 8px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Visual Effects:**
- Box shadows: Subtle, `0 1px 3px rgba(0,0,0,0.08)` (light), `0 1px 3px rgba(0,0,0,0.3)` (dark)
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 150ms ease-out for all interactive elements

### Components

**1. Timer Display**
- Large monospace font: 48px (desktop), 36px (mobile)
- Format: HH:MM:SS (or MM:SS when < 1 hour)
- 24-hour mode shows full HH:MM:SS always
- Pulsing dot indicator when running

**2. Project Input**
- Clean input with subtle border
- Placeholder: "Project name..."
- Autocomplete dropdown for existing projects (grouped)
- Enter to start new project

**3. Description Input**
- Secondary input below project
- Placeholder: "What are you working on?"
- Optional, smaller text

**4. Start/Stop Button**
- Primary action button
- States: Start (accent bg), Stop (outlined)
- Keyboard shortcut: Space (when focused)

**5. Time Entry Card**
- Project name (bold)
- Description (secondary text)
- Duration (monospace)
- Start/End time
- Date
- Delete button (subtle, appears on hover)
- Edit button

**6. Project Group Header**
- Collapsible section
- Project name + total time for project
- Expand/collapse icon

**7. Settings Panel (Modal/Drawer)**
- 24-hour toggle
- Timezone selector (dropdown with common timezones)
- Theme selector (Light/Dark/System)
- Clear all data button (with confirmation)

**8. Manual Entry Form**
- Expandable section
- Date picker
- Start time
- End time (or duration)
- Project selector/input
- Description
- Add entry button

---

## 3. Functionality Specification

### Core Features

**Time Tracking:**
- Start/stop timer for current session
- Timer persists in localStorage (survives page refresh)
- Auto-save every 30 seconds while running
- Display elapsed time in real-time

**Project Management:**
- Create new projects on-the-fly
- Group entries by project name (case-insensitive)
- Autocomplete suggestions from existing projects
- Project list sorted by most recent activity

**Time Entries:**
- List all entries grouped by project
- Each entry stores: id, project, description, startTime, endTime, duration
- Edit entry (project, description, times)
- Delete entry with confirmation
- Entries sorted by start time (newest first)

**Manual Entry:**
- Add past entries with specific times
- Required: project, start time, end time (or duration)
- Optional: description

**Preferences:**
- 24-hour time format (default: off/12-hour)
- Timezone selection (default: local)
- Theme: Light / Dark / System (default: System)

### User Interactions

1. **Starting a timer:**
   - Type project name → (optional) type description → click Start or press Enter
   - Timer begins, entry created in "running" state

2. **Stopping a timer:**
   - Click Stop → entry finalized with end time
   - Entry moves to completed list

3. **Editing an entry:**
   - Click edit icon → inline form appears → modify fields → save

4. **Manual entry:**
   - Click "Add manual entry" → form expands → fill details → submit

5. **Settings:**
   - Click gear icon → settings drawer slides in → adjust preferences → auto-save

### Data Handling

- All data stored in localStorage
- Data structure:
  ```json
  {
    "entries": [...],
    "preferences": {
      "24hour": false,
      "timezone": "America/New_York",
      "theme": "system"
    }
  }
  ```

### Edge Cases

- Timer running when page closes: restore on reload
- Empty project name: default to "Untitled"
- Overlapping entries: allow (user responsibility)
- Very long descriptions: truncate with ellipsis, full on hover
- No entries: show empty state with call-to-action

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Clean, minimal Swiss-inspired interface
- [ ] Typography is crisp and readable
- [ ] Light/dark themes both look refined
- [ ] Responsive on mobile (320px+) and desktop
- [ ] Smooth transitions on all interactions

### Functional Checkpoints
- [ ] Can start and stop timer
- [ ] Timer persists across page refresh
- [ ] Entries are saved to localStorage
- [ ] Projects are grouped correctly
- [ ] Can add manual entries
- [ ] Can edit and delete entries
- [ ] 24-hour toggle works correctly
- [ ] Theme switching works (light/dark/system)
- [ ] Timezone display is correct

### Performance Checkpoints
- [ ] Fast load time (< 1s)
- [ ] No layout shift on load
- [ ] Smooth 60fps animations
- [ ] Minimal bundle size

---

## 5. File Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Timer.astro
│   │   ├── ProjectInput.astro
│   │   ├── EntryList.astro
│   │   ├── EntryCard.astro
│   │   ├── ManualEntry.astro
│   │   ├── Settings.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       └── store.js
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── SPEC.md
```
