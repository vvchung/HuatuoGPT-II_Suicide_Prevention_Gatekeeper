# 🕯️ HuatuoGPT II: Suicide Prevention Gatekeeper

> **"When the school counseling office lights go out at 5 PM, we hope the light on the screen can catch every falling soul."**
>
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
    *   When Flash triggers a `SUICIDE_RISK` alert, Pro immediately switches to **"Crisis Intervention Mode"**: It stops casual chat and uses **Grounding Techniques**, guiding the student to breathe and providing **119** or **1925** resources (Taiwan's local lifelines).

---

## 🚀 Impact Features

### 1. 🌏 Global Reach, Local Rescue (Multilingual Support)
We believe that **language should never be a barrier to survival**.
Many universities in Taiwan host brilliant students from all over Asia. When a crisis hits, they revert to their mother tongue for comfort, but they need **local** help.

*   **🇺🇸 English Mode:** Tailored for international students and residents **currently in Taiwan**. All crisis resources point to Taiwan's local emergency numbers (**119/1925**) to ensure immediate local rescue.
*   **🇹🇼 Taiwan Native Mode (Traditional Chinese):** Deeply localized with Taiwan's legal knowledge (Gender Equality Education Act) and local lifelines (1925, 119).
*   **🌏 International Student Mode (New!):**
    *   **Supported Languages:** Simplified Chinese 🇨🇳, Japanese 🇯🇵, Korean 🇰🇷, Vietnamese 🇻🇳, Indonesian 🇮🇩, Thai 🇹🇭, Hindi 🇮🇳.
    *   **The Logic:** Gemini speaks to them in their **native language** (providing emotional safety) but directs them to **Taiwan's emergency resources (119/1925)** (providing physical safety).
    *   *Example:* A Vietnamese student feels panic. The AI comforts them in Vietnamese but tells them to dial **119** (Taiwan), not 115 (Vietnam).

### 2. 🛡️ Cross-Domain Privacy & De-identification
Your trust is our foundation, especially in sensitive cases like medical crises or personal safety. We implement a multi-layered **Privacy Guardrail** system following international cross-domain de-identification standards (Medical x Legal):
*   **Local Redaction**: Names, IDs, phone numbers, and license plates are automatically redacted on your own device before ever being sent to the AI.
*   **Functional Anonymity**: Specific institutions (hospitals, courts, companies) are replaced with their functional roles (e.g., "a medical center", "a court", "a large enterprise") to preserve professional context while cutting physical identification links.
*   **Temporal & Geospatial Padding**: Specific dates and precise addresses are shifted to relative time (e.g., "T-3 days") and broad regions to prevent cross-correlation tracking.
*   **Zero-Trace Reasoning**: The AI is strictly instructed not to record any suspected personal details in its internal reasoning process, maintaining "Identity Deletion, Behavior Retention."

### 3. 🚨 Panic Button Paradigm
The interface is not just a chat window, it's a first-aid kit:
*   **Always-on Header:** A one-tap button to dial **119** or **1925** is always within reach.
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

## 💌 Our Mission

This is not just a chatbot; it's a 24-hour guardian for students who find themselves alone in the dark. 

**Anonymity and psychological safety** are the first steps toward healing. We understand that in sensitive situations—whether it's a mental health crisis or legal trauma—the fear of exposure is the greatest barrier to seeking help. That's why we've built this safe space where every request is guarded with the highest privacy standards, yet met with the warmest empathy.

By bridging the gap between professional knowledge and compassionate listening, we ensure that no student—regardless of where they are from—ever has to face a crisis without a voice to hold their hand. Whether you are from Taipei, Tokyo, or New York, if you are studying in Taiwan, **HuatuoGPT II: Suicide Prevention Gatekeeper is here for you.**

**"Technology is the campfire around which we gather in the dark."**

---

*Made with ❤️, ☕, and Gemini.*