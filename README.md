# CodeArena 🚀  
*A full-stack coding platform for classrooms and competitive programming*

🔗 **Live Demo:** https://code-arena-rho.vercel.app/student/home  

---

## 📌 Overview

**CodeArena** is a production-grade, full-stack coding platform designed for academic and competitive environments.  
It enables **teachers** to create classes, assignments, and coding problems, while **students** can write, run, and submit code directly in the browser — similar to platforms like HackerRank or LeetCode, but tailored for classroom use.

The system focuses on **secure code execution**, **role-based access control**, and a **clean, scalable architecture**.

---

## ✨ Key Features

### 👩‍🏫 Teacher Features
- Create and manage classes using unique class codes
- Create assignments and attach multiple coding problems
- Define expected outputs for automated evaluation
- View student submissions and track progress

### 👨‍🎓 Student Features
- Join classes using class codes
- View assignments and problems
- Write code in an in-browser editor
- Run code against custom inputs
- Submit solutions and view submission history
- Instant feedback on whether output matches expected results

---

## 🧠 Core Concepts

- **Role-Based Access Control (RBAC)**  
  Separate dashboards and permissions for Teachers and Students

- **Secure Code Execution**  
  User-submitted code is executed inside isolated **Docker containers**, preventing system abuse and ensuring safety

- **Multi-Language Support**
  - C
  - C++
  - Java
  - Python
  - JavaScript

- **Automated Evaluation**
  - Code output is matched against expected output
  - Clear pass/fail feedback after execution

---

## 🏗️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- Custom Hooks Architecture

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT-based Authentication
- Prisma ORM

### Database
- PostgreSQL

### Code Execution
- Docker (language-specific containers)
- Isolated runtime per submission

### DevOps & Deployment
- Dockerized services
- Deployed frontend on Vercel
- Backend hosted on cloud infrastructure

---

## 🧩 System Architecture (High Level)

```text
Browser (Student / Teacher)
        ↓
React Frontend (RBAC, Editor, Dashboards)
        ↓
Node.js + Express API
        ↓
PostgreSQL (Users, Classes, Assignments, Submissions)
        ↓
Docker Engine
   → Isolated Containers
   → Execute User Code
   → Capture Output
```

###🔐 Security Highlights
- JWT authentication for all protected routes
- Docker sandboxing for code execution
- No direct system or file access from user code
- Strict separation of student and teacher privileges

## 🧪 Example Workflow

- Teacher creates a class → generates a unique class code  
- Student joins the class using the class code  
- Teacher creates assignments and adds coding problems  
- Student writes code in the in-browser editor and runs it  
- Code executes securely inside isolated Docker containers  
- Program output is compared with the expected output  
- Student submits the solution and views submission history  

---

## 🌱 Future Enhancements

- Syntax-highlighted and language-aware code editor  
- Plagiarism detection for student submissions  
- Time and memory constraints per problem  
- Real-time leaderboards for competitive assignments  
- Support for additional programming languages  
- WebSocket-based live execution feedback and status updates  

---

## 🙌 Why CodeArena?

CodeArena bridges the gap between traditional **online judges** and **classroom-based coding platforms**.  
It is designed not just for solving problems, but for **learning, teaching, and evaluating code safely at scale**, with a strong focus on security, scalability, and real-world system design.
