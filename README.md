# 🕯️ HuatuoGPT II: Suicide Prevention Gatekeeper

> **"When the school counseling office lights go out at 5 PM, we hope the light on the screen can catch every falling soul."**
>
> 🏆 Built for the **Vibe Code with Gemini 3 Pro** Hackathon.
> *Multilingual Support: 🇺🇸 🇹🇼 🇨🇳 🇯🇵 🇰🇷 🇻🇳 🇮🇩 🇹🇭 🇮🇳*

![License](https://img.shields.io/badge/License-MIT-green)
![Gemini 3 Pro](https://img.shields.io/badge/Model-Gemini%203%20Pro-purple)
![Gemini 2.5 Flash](https://img.shields.io/badge/Model-Gemini%202.5%20Flash-blue)
![Inspiration](https://img.shields.io/badge/Paper-HuatuoGPT--II-orange)

## 💔 The "Shoestring Budget" Reality (Why We Fight)

In many universities in Taiwan (and globally), mental health centers and school nurses are often constrained by tight budgets, operating only during administrative hours (08:00 - 17:00).

**But mental crises do not follow office hours.**

Late nights are when students feel most fragile and lonely, yet it is also when help is hardest to find. Because schools have **"no money"** to hire night-shift professionals, this deadly vacuum often becomes where tragedies begin.

We refuse to accept "no budget" as an excuse for "no rescue."
We decided to use **AI** to fill this gap, using minimal resources to provide the gentlest guardianship.

---

## 🔬 The Academic Inspiration: Standing on the Shoulders of Giants

This project is deeply inspired by the academic paper **[HuatuoGPT-II, One-stage Training for Medical Adaption of LLMs](https://arxiv.org/abs/2311.09774)** by **The Chinese University of Hong Kong, Shenzhen (CUHK-SZ)**.

The paper proved that through "One-stage Adaptation" and high-quality medical corpora, medium-sized models can demonstrate medical proficiency comparable to GPT-4. We were moved by this research—it showed how to achieve top-tier results with lean computing power.

However, the reality is we don't even have the funds to buy expensive GPUs to deploy local models. Therefore, we adopted a **"Simulated Expert Persona"** strategy:

*   **Spirit of Huatuo:** We extracted the core spirit of the HuatuoGPT-II paper—**"Professional Medical Knowledge" combined with "Doctor-like Empathy."**
*   **Power of Gemini:** Leveraging **Gemini 3 Pro's** powerful Context Window and Reasoning capabilities, we injected rigorous System Prompts (including Taiwan/US pharmacist regulations and suicide prevention guidelines) to let Gemini become the cloud-based HuatuoGPT-II.

This is a counterattack by a poor school: **Using the strongest API to solve the most painful resource allocation problem.**

---

## ⚡ The "Vibe" Architecture: Gemini Symbiosis

To achieve extreme response speed and depth with limited resources, we designed a dual-model collaboration architecture:

### 🛡️ The Shield: Gemini 2.5 Flash (The Gatekeeper)
*   **Role:** High-speed Triage Nurse.
*   **Task:** Analyze conversation intent in milliseconds, unnoticed by the user.
*   **Verdict:** SAFE vs. SUICIDE_RISK vs. PRESCRIPTION_REQUEST.
*   **Why:** In critical moments, speed is life.

### 🧠 The Heart: Gemini 3 Pro (The Therapist)
*   **Role:** The Late-Night AI Counselor.
*   **Task:** Receive the Flash verdict and engage in deep conversation.
*   **Vibe:** 
    *   It doesn't preach; it listens.
    *   When Flash triggers a `SUICIDE_RISK` alert, Pro immediately switches to **"Crisis Intervention Mode"**: It stops casual chat and uses **Grounding Techniques**, guiding the student to breathe and gently pushing **988 (US)** or **1925 (TW)** resources.

---

## 🚀 Impact Features

### 1. 🌏 Global Reach, Local Rescue (Multilingual Support)
We believe that **language should never be a barrier to survival**.
Many universities in Taiwan host brilliant students from all over Asia. When a crisis hits, they revert to their mother tongue for comfort, but they need **local** help.

*   **🇺🇸 English Mode (Judge/Demo Context):** Optimized for hackathon judges. Uses **911/988** resources and adheres to Western protocols.
*   **🇹🇼 Taiwan Native Mode (Traditional Chinese):** Deeply localized with Taiwan's legal knowledge (Gender Equality Education Act) and local lifelines (1925, 119).
*   **🌏 International Student Mode (New!):**
    *   **Supported Languages:** Simplified Chinese 🇨🇳, Japanese 🇯🇵, Korean 🇰🇷, Vietnamese 🇻🇳, Indonesian 🇮🇩, Thai 🇹🇭, Hindi 🇮🇳.
    *   **The Logic:** Gemini speaks to them in their **native language** (providing emotional safety) but directs them to **Taiwan's emergency resources (119/1925)** (providing physical safety).
    *   *Example:* A Vietnamese student feels panic. The AI comforts them in Vietnamese but tells them to dial **119** (Taiwan), not 115 (Vietnam).

### 2. 🚨 Panic Button Paradigm
The interface is not just a chat window, it's a first-aid kit:
*   **Always-on Header:** A one-tap button to dial **911/119** is always within reach.
*   **Visual Mindfulness:** Built-in CSS animation driven **4-4-4 Mindful Breathing**. When words fail to soothe anxiety, we use visual cues to guide the body.

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Tailwind CSS (Glassmorphism visual style for calmness).
*   **AI Core:** Google Gemini API (`@google/genai`).
*   **Prompt Engineering:** Chain-of-Thought promoting medical accuracy inspired by HuatuoGPT-II paper findings.

---

## 🚀 Launch on AI Studio

Here is everything you need to run the app on your own machine!

👀 **Check out the App on AI Studio:** [https://ai.studio/apps/drive/1ynZXYwBaw10-V1iLmDFff8WcgemJSaoA?fullscreenApplet=true](https://ai.studio/apps/drive/1ynZXYwBaw10-V1iLmDFff8WcgemJSaoA?fullscreenApplet=true)
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

## 📸 Local Usage

### Prerequisites
*   Node.js 18+
*   A heart that wants to change the world.

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/HuatuoGPT-II.git

# Install dependencies
npm install

# Set up your API Key
export API_KEY="your_gemini_api_key_here"

# Start the Night Watch
npm start
```

---

## 💌 Message to the Judges

This is not just a chatbot; it's our gentle compensation for a systemic regret.

We proved that even if schools lack the budget to hire night-shift counselors and nurses, we can still use technology to hold the line. The HuatuoGPT-II paper demonstrated the possibility of medical LLMs, and we used **Gemini 3 Pro** to turn that possibility into a 24-hour guardian in every student's pocket—whether they are from Taipei, Tokyo, or Texas.

**Technology is the campfire around which we gather in the dark.**

---

*Made with ❤️, ☕, and Gemini.*