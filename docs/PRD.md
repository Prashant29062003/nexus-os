# 📔 Project PRD: NexusOS Ecosystem

**Vision:** A "Personal Operating System" that grows with the user.

**Stack:** MERN + React Native (Expo)

## 1. Executive Summary

**NexusOS** is a unified productivity suite designed to synchronize a user’s professional and personal life across desktop and mobile. It eliminates the need for separate apps for tasks, notes, and finance by providing a single, authenticated source of truth.

--- 

### **Functional Requirements**

* **Modular Dashboard:** A central hub that detects which modules (Tasks, Finance, etc.) are active for a user.
* **Cross-Platform Sync:** Real-time data consistency between the Web (React) and Mobile (React Native) via a shared REST API.
* **Dynamic Feature Set:** Users can toggle "Modules" on or off in their settings.
* **Offline Capability:** Mobile app should allow viewing cached data when internet is unavailable.

### **Non-Functional Requirements**

* **Extensibility:** Adding a new feature (e.g., "Fitness Tracker") should require zero changes to the Auth or Navigation logic.
* **Performance:** API response time  for core CRUD operations.

---

## 2. Modular Architecture Blueprint

We will use a **Feature-Folder Pattern**. This decouples the modules from the core engine.

### **The "Core" vs. "Modules" Logic**

* **The Core:** Handles Database connection, JWT Verification, Global Error Handling, and User Profiles.
* **The Modules:** Each module (Tasks, Finance, etc.) contains its own `routes`, `controller`, and `model`. They "plug" into the Core.

### **Folder Structure (Monorepo)**

```text
/nexus-os
├── /backend
│   ├── /src
│   │   ├── /core           # Auth, DB, Middleware
│   │   └── /modules        # [tasks/, finance/, notes/]
│   └── server.js
├── /web-client             # React.js (Desktop)
│   └── /src
│       ├── /core           # Layout, Redux Store
│       └── /features       # [tasks/, finance/]
└── /mobile-client          # React Native (Expo)
    └── /src
        ├── /navigation     # Shared Nav Logic
        └── /features       # [tasks/, finance/]

```

### 2.2 Core Modules

| Module | Web Feature (Desktop Optimized) | Mobile Feature (On-the-Go Optimized) |
| --- | --- | --- |
| **Tasks** | Drag-and-drop Kanban board for project management. | List view with "swipe-to-complete" gestures. |
| **Finance** | Detailed Analytics (Pie charts/Bar graphs) of monthly spending. | Quick-entry form for "on-the-spot" expense logging. |
| **Notes** | Full-screen Markdown editor with side-by-side preview. | Minimalist text editor for quick ideas; Search-first UI. |

### 2.3 Cross-Platform Synergy

* **Cloud Sync:** Any data added on the Mobile app appears on the Web app instantly.
* **Push Notifications:** Mobile alerts for high-priority tasks set on the Web.

---

## 3. Technical Blueprint (The Architecture)

### 3.1 System Architecture Diagram

The **API-First** approach ensures that the Backend acts as a central brain.

```text
[ Database: MongoDB Atlas ]
          |
[ Backend: Node.js / Express API ] <--- Shared Logic (Auth, Validation)
          |
          +---------------------------------------+
          |                                       |
[ Frontend: React Web ]                  [ Frontend: React Native ]
(Tailwind CSS, Redux)                    (NativeWind, Redux)
(Browser Access)                         (iOS / Android Access)

```

### 3.2 Data Blueprint (Mongoose Schemas)

Every document must have a `userId` to ensure data privacy and synchronization.

* **UserSchema:** `{ name, email, password, avatar, currencyPreference }`
* **TaskSchema:** `{ userId, title, description, status: [Todo, Progress, Done], priority, dueDate }`
* **FinanceSchema:** `{ userId, amount, category: [Food, Rent, Tech, Misc], type: [Income, Expense], date }`
* **NoteSchema:** `{ userId, title, content: MarkdownString, tags: [], lastModified }`

---

## 4. Technical Stack Breakdown

* **Backend:** Node.js, Express.js (REST API).
* **Database:** MongoDB (NoSQL) with Mongoose ODM.
* **Web:** React 18, Tailwind CSS, Axios, Redux Toolkit.
* **Mobile:** React Native (Expo), NativeWind (Tailwind for mobile), React Navigation.
* **Real-time:** Socket.io (for instant syncing between web and mobile).

---

## 5. Technical Blueprint: The "Bridge" (Redux Toolkit)

To make Web and Mobile work together, your **Redux Slices** should be identical.

* **Action:** User clicks "Add Task" on Mobile.
* **Thunk:** A shared async function sends a POST request to the API.
* **State Update:** The task is added to the local state instantly (Optimistic UI).
* **Sync:** When the user opens their Laptop (Web), the `useEffect` hook fetches the latest data from the "Core" API.

---

## 6. Next Steps: Initializing "The Core"

To start, you need to set up the **Backend Core**. This is the foundation upon which all future modules will sit.
