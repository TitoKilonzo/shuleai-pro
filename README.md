# ShuleAI Pro 🎓

**Kenya's most advanced CBC-aligned educational gaming platform.**  
56+ interactive games covering all CBC learning areas for Grades 4–9.

![ShuleAI Pro](https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80)

---

## 🎮 Demo Access

> **For testing and demonstration purposes only. Not shown in the app UI.**

| Role | Email | Password |
|------|-------|----------|
| Student | `demo@shuleaipro.co.ke` | `Demo@2026` |
| Parent | `parent@shuleaipro.co.ke` | `Demo@2026` |

The demo accounts include:
- A fully active **Monthly subscription** (pre-activated)
- Sample progress data across all subjects
- Two demo children profiles (Parent dashboard)
- All 56+ games unlocked and playable

---

## 🚀 Features

- **56+ CBC-Aligned Educational Games** across 7 subjects
- **7 Subjects**: Mathematics, Integrated Science (Gr 7–9), Science & Technology (Gr 4–6), Pre-Technical Studies (Gr 7–9), CRE, Creative Arts & Social Studies (CAAS), Agriculture (Gr 4–9)
- **M-Pesa Daraja API Integration** for payments (STK Push)
- **Appwrite Backend**: Authentication, Database, Storage, Functions
- **Real-time Progress Tracking** with subject-level analytics
- **Parent Dashboard** with multi-child monitoring and weekly activity charts
- **Subscription Plans**: Weekly (KES 200), Monthly (KES 600), Termly (KES 1,650)
- **Access Code System** for institutional or gift subscriptions
- **Achievement Badges & Streaks** gamification
- **Fully Responsive** – works on mobile, tablet, desktop
- **Interactive Quiz Engine** with per-question timer and result review

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Custom CSS (CSS Variables, no external UI library) |
| Routing | React Router v6 |
| Backend / BaaS | Appwrite Cloud |
| Auth | Appwrite Email/Password Authentication |
| Database | Appwrite Database (NoSQL) |
| Serverless | Appwrite Functions (Node.js 18) |
| Payments | M-Pesa Daraja API (STK Push) |
| Hosting | Vercel / Netlify (recommended) |
| Fonts | Sora + DM Sans (Google Fonts) |

---

## 📁 Project Structure

```
shuleai-pro/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive navigation bar
│   │   ├── PaymentModal.jsx     # M-Pesa payment + access code modal
│   │   └── PricingSection.jsx   # Subscription plan cards
│   ├── context/
│   │   └── AuthContext.jsx      # Auth state, demo mode logic
│   ├── lib/
│   │   ├── appwrite.js          # Appwrite client, auth, DB, progress services
│   │   ├── mpesa.js             # M-Pesa Daraja integration + sandbox simulator
│   │   └── games.js             # 56+ games data + SUBJECTS definitions
│   ├── pages/
│   │   ├── Landing.jsx          # Public landing page
│   │   ├── SignIn.jsx           # Sign in page
│   │   ├── SignUp.jsx           # Registration page
│   │   ├── Dashboard.jsx        # Student dashboard
│   │   ├── ParentDashboard.jsx  # Parent monitoring dashboard
│   │   ├── GamesPage.jsx        # Game library with filters
│   │   └── GamePlayer.jsx       # Interactive quiz engine
│   ├── App.jsx                  # Routes and auth guards
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global design system
├── appwrite-functions/
│   ├── mpesa-stk-push/          # STK Push server function
│   └── mpesa-callback/          # M-Pesa payment callback
├── .env.example                 # Environment variables template
├── vite.config.js
└── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- [Appwrite Cloud](https://cloud.appwrite.io) account (free)
- Safaricom [Daraja API](https://developer.safaricom.co.ke) account

### 1. Clone & Install

```bash
git clone https://github.com/TitoKilonzo/shuleai-pro.git
cd shuleai-pro
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Fill in your values:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=shuleai_pro_db
VITE_MPESA_ENV=sandbox
```

### 3. Set Up Appwrite

**Create a project** in Appwrite Cloud, then create the following database and collections:

#### Database: `shuleai_pro_db`

| Collection | ID | Key Attributes |
|---|---|---|
| Users | `users` | name, email, phone, role, createdAt |
| Subscriptions | `subscriptions` | userId, plan, amount, mpesaRef, status, expiresAt |
| Progress | `progress` | userId, gameId, subject, score, timeSpent, completedAt |
| Access Codes | `access_codes` | code, plan, used, usedBy, usedAt |

**Set permissions** for each collection:
- `users`: Read/Write for authenticated users (own document)
- `subscriptions`: Read/Write for authenticated users
- `progress`: Read/Write for authenticated users
- `access_codes`: Read for all authenticated, Write for admin only

### 4. Deploy Appwrite Functions

Upload these functions via Appwrite Console → Functions:

```bash
# mpesa-stk-push
cd appwrite-functions/mpesa-stk-push
zip -r function.zip index.js package.json

# mpesa-callback
cd appwrite-functions/mpesa-callback
zip -r function.zip index.js package.json
```

Set environment variables in each function:
```
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9...
MPESA_CALLBACK_URL=https://[REGION].appwrite.io/v1/functions/mpesa-callback/executions
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=...
APPWRITE_API_KEY=...
APPWRITE_DATABASE_ID=shuleai_pro_db
APPWRITE_SUBSCRIPTIONS_COLLECTION=subscriptions
```

### 5. M-Pesa Daraja Setup

1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an app and get sandbox credentials
3. Test with sandbox shortcode `174379`
4. For production, apply for a live shortcode

### 6. Run Locally

```bash
npm run dev
# Opens at http://localhost:5173
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

### Netlify

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile (< 480px) | Single column, stacked navigation |
| Tablet (480–768px) | 2-column game grid, collapsed hero |
| Desktop (768–1200px) | Full layout with sidebar dashboards |
| Large (1200px+) | Max-width container, 3–4 column game grid |

---

## 🎓 CBC Curriculum Coverage

| Subject | Grades | Games |
|---|---|---|
| Mathematics | 4–9 | 15 |
| Integrated Science | 7–9 | 9 |
| Science & Technology | 4–6 | 6 |
| Pre-Technical Studies | 7–9 | 5 |
| CRE | 4–9 | 5 |
| Creative Arts & Social Studies | 4–9 | 8 |
| Agriculture | 4–9 | 8 |
| **Total** | | **56** |

---

## 💳 Subscription Plans

| Plan | Price | Duration | Features |
|---|---|---|---|
| Weekly | KES 200 | 7 days | All games, all subjects, progress tracking |
| Monthly | KES 600 | 30 days | + Priority Support |
| Termly | KES 1,650 | 90 days | + Certificates |

---

## 🔐 Security

- All passwords hashed by Appwrite (bcrypt)
- M-Pesa API credentials stored server-side only (Appwrite Functions)
- CORS configured per environment
- No sensitive keys exposed to client
- Session-based demo mode (sessionStorage only, no Appwrite calls)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Built by

**Tito Kilonzo Kinyambu**  
Full-Stack Developer  
[github.com/TitoKilonzo](https://github.com/TitoKilonzo) · [linkedin.com/in/titokinyambu](https://linkedin.com/in/titokinyambu)

---

> "Elimu ni ufunguo wa maisha" — *Education is the key to life* 🇰🇪
