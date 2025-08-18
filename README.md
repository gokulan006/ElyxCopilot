# Elyx Hackathon Submission — Joseph’s Health Journey

## 1. Introduction
This project is our submission for the **Elyx Hackathon 2025**.  
We built an app that showcases the **8-month health journey of Joseph Martinez**.
The app combines **member profile, dashboard, conversation history, biomarker analysis, and reports** into one place and visualizes important metrics and results.
It helps Joseph clearly understand his progress, while giving the Elyx team full **decision traceability** and accountability.

---

## 2. Demo
- **YouTube Demo:** [youtube](https://youtu.be/qNWECowiMzQ?si=17xC-XF-ITVuzEtP) 
- **Demo Link**  [demo](https://elyx-copilot-1boy.vercel.app/)  
---

## 3. Features
- **Member Profile** – Goals, chronic conditions, adherence, behavioral insights.  
- **Dashboard** – Key health metrics, support hours, and progress trends.  
- **Conversation Copilot** – 8 months of synthetic chats with *Decision* and *Reason* logged for each important update.  
- **Biomarker Analysis** – Diagnostic panels (metabolic, lipid, inflammation, body composition) with doctor interpretation and recommendations.  
- **Journey Timeline** – Major milestones like onboarding, travel challenges, diagnostics, and breakthrough improvements.  

---

## 4. How it will be useful
- **For the User (Joseph):**
  - Tracks all health data in one place.  
  - Provides simple explanations for every lifestyle change, test, or therapy.  
  - Builds trust and helps him stay motivated with clear progress.  

- **For the Elyx Team:**
  - Transparency and traceability of every decision.  
  - Easy to review history during handovers.  
  - Better allocation of support hours across doctors, dietitians, and coaches.  
  - Stronger accountability and personalized care delivery.  

---
## 5. GitHub Folder Structure
```
elyx-health-journey/
├─ public/                   # Static assets 
├─ src/                      # Main source code (React + TypeScript)
│ ├─ components/             # UI components (Dashboard, Copilot, Profile, etc.)
│ ├─ data/                    
│ └─ ... 
├─ .gitignore
├─ LICENSE
├─ README.md
├─ index.html                 # Entry point
├─ package.json               # Project dependencies
├─ package-lock.json
├─ vite.config.ts             # Vite configuration
├─ tailwind.config.js         # TailwindCSS configuration
├─ postcss.config.js          # PostCSS configuration
├─ eslint.config.js           # ESLint configuration
├─ tsconfig.json              # TypeScript config (global)
├─ tsconfig.app.json          # TypeScript config (app-specific)
├─ tsconfig.node.json         # TypeScript config (Node)
```

---

## 6. Running Setup

### Prerequisites
- Node.js ≥ 18  
- npm (comes with Node.js)

### Steps to Run
```bash
git clone https://github.com/gokulan006/CrisisWatch-AI.git
cd ElyxCopilot
npm install
npm run dev
```

open this url in your browser: http://localhost:5173

---

## 7.Team
- Gokulan M (Lead)
- Suyash Ranjan

## 8. Prompt Design

We generated Joseph’s 8-month health journey using structured prompts.  
Each week contains **14 conversations**, and the flow ensures variety (normal weeks, challenge weeks, travel weeks, reset weeks, and diet-focused weeks).   

### Conversation Prompt
```
Make an 8-month conversation with Joseph in JSON format.  
Each week must have 14 conversations.  
- Use only Ruby(Concierge), Dr.Warren(Medical Strategist), Advik(Performance Scientist), Joseph(Member), Carla (The Nutritionist), Rachel (The PT / Physiotherapist),Neel (The Concierge Lead) (no extra roles).  
- Each week has a theme: normal, challenge, reset, travel, diet focus.  
- In every week Joseph starts 5 questions himself on average.  
- Not all roles need to appear in when ever required.  
- Every 3 months (March, June, August), a full diagnostic test is conducted.  
  - March: noticeable improvement.  
  - June: slight diabetes relapse.  
  - August: significant overall recovery.  
- After each test, the Elyx team analyzes results and provides updated plans.

```

### Test Panel Prompt
```
Test Panel

General Health Assessment:
- Clinical history, physical exam, BMI, blood pressure, heart rate  

Blood Tests:
- OGTT with paired insulin, HbA1c, lipid profile, full blood count  
- Liver & kidney function, micronutrient panel, CRP/ESR, thyroid panel, cortisol  
- Sex hormones, heavy metals, epigenetic tests, urinalysis  

Cancer Screening:
- FIT, colonoscopy, mammogram, HPV test, MRI options  

Advanced Cardiovascular:
- ECG, coronary calcium score, echocardiogram, carotid scan  

Fitness & Body Composition:
- VO₂ max, grip strength, functional movement screening, spirometry, DEXA scan  

Genetics & Hormones:
- Pharmacogenomics, hereditary risk assessment, sex hormones  

Brain & Skin Health:
- Cognitive tests, mental health review, brain MRI, skin analysis (VISIA)  

Extended Care:
- Specialist consultations, lifestyle recommendations (diet, exercise, stress)  
```

### Results Prompt
```
We have taken the test at January, March, June, and August.  
Provide results in table format showing changes in blood pressure, glucose, HbA1c, CRP, LDL, and notes on progression.  
```


