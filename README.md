# 🛡️ SentinelGuard · AI Threat & Scam Radar

> Real-time heuristic and deterministic security analysis engine for phishing detection, domain spoofing analysis, and social engineering risk scoring.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
![Stack: HTML5/CSS3/ES6](https://img.shields.io/badge/Stack-Vanilla_JS-yellow.svg?style=flat-square)
![Deploy: Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

---

## ⚡ Overview

**SentinelGuard** is an explainable threat intelligence client that analyzes untrusted inputs (SMS alerts, phishing URLs, suspicious transaction emails) and provides verifiable reasons behind every risk classification.

Rather than acting as an opaque black box, SentinelGuard breaks down risks into verifiable heuristic signals:
- **Urgency Triggers:** Detects psychological coercion patterns used in social engineering.
- **Brand Spoofing & Typosquatting:** Flags impersonated entities (e.g., banking/crypto institutions).
- **High-Risk TLD Heuristics:** Matches disposable top-level domains commonly registered for transient phishing clusters.
- **Credential Harvesting Indicators:** Identifies coercive OTP, Aadhaar, PAN, and KYC requests.

---

## 🚀 Live Demo

- **Live Web App:** [https://sentinel-guard-rushank.vercel.app](https://sentinel-guard-rushank.vercel.app)

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), Modern CSS Custom Properties, HTML5 Semantics
- **Heuristics:** Regex-based lexical analysis, URL parser heuristics, dynamic risk weighting engine
- **Design:** Glassmorphism UI, SVG radial gauges, responsive mobile-first grid

---

## 📦 Local Setup

```bash
# Clone the repository
git clone https://github.com/rushank3485/sentinel-guard.git

# Enter project directory
cd sentinel-guard

# Open directly in browser
open index.html # or start a static server: npx serve .
```

---

## 📄 License

MIT © [Rushank](https://github.com/rushank3485)
