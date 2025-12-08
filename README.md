# 🕯️ HuatuoGPT II 自殺防治守門員（ HuatuoGPT II: The Suicide Prevention Gatekeeper ）

> **"當學校輔導室的燈在下午五點熄滅，我們希望螢幕另一端的光，能接住每一個墜落的靈魂。"**
>
> 🏆 Built for the **Vibe Code with Gemini 3 Pro** Hackathon.

![License](https://img.shields.io/badge/License-MIT-green)
![Gemini 3 Pro](https://img.shields.io/badge/Model-Gemini%203%20Pro-purple)
![Gemini 2.5 Flash](https://img.shields.io/badge/Model-Gemini%202.5%20Flash-blue)
![Inspiration](https://img.shields.io/badge/Paper-HuatuoGPT--II-orange)

## 💔 The "Shoestring Budget" Reality (我們為什麼而戰)

在台灣的許多大學校園裡，心理諮商中心與校護資源往往受限於拮挶的經費預算，只能在行政上班時間（08:00 - 17:00）運作。

**但心理危機，從不挑上班時間發生。**

深夜是學生最脆弱、孤獨感最強烈，卻也最求助無門的時刻。因為學校**「沒錢」**聘請夜間值班的專業人員，這個致命的真空期往往成為遺憾發生的起點。這不是藉口，而是我們必須面對的殘酷現實。

我們拒絕接受「因為沒錢，所以無法救援」的結局。
我們決定用 **AI** 填補這個缺口，用最少的資源，做最溫柔的守候。

---

## 🔬 The Academic Inspiration: Standing on the Shoulders of Giants

本專案深受 **The Chinese University of Hong Kong, Shenzhen (CUHK-SZ)** 與 **Shenzhen Research Institute of Big Data** 發表的學術論文 **[HuatuoGPT-II, One-stage Training for Medical Adaption of LLMs](https://arxiv.org/abs/2311.09774)** 所啟發。

該論文證明了：透過 "One-stage Adaptation" (單階段適應) 與高品質的醫療語料庫，中型模型也能展現出媲美 GPT-4 的醫療專業能力。我們被這份研究深深打動——它展示了如何用精簡的算力達到頂尖的效果。

然而，現實是我們甚至沒有經費購買昂貴的 GPU 來部署地端模型。因此，我們採取了 **"Simulated Expert Persona" (模擬專家人格)** 的策略：

*   **Spirit of Huatuo (華佗的靈魂):** 我們提取了 HuatuoGPT-II 論文中的核心精神——**「專業醫學知識」結合「像醫生一樣的同理心」**。
*   **Power of Gemini (雙子星的力量):** 利用 **Gemini 3 Pro** 強大的 Context Window 與 Reasoning 能力，我們注入了嚴謹的 System Prompt（包含台灣藥師法規、自殺防治守門員指引），讓 Gemini 化身為雲端的 HuatuoGPT-II。

這是一個窮學校的反擊：**用最強的 API，解決最痛的資源分配問題。**

---

## ⚡ The "Vibe" Architecture: Gemini Symbiosis

為了在有限資源下達到極致的響應速度與深度，我們設計了雙模型協作架構：

### 🛡️ The Shield: Gemini 2.5 Flash (守門員)
*   **角色:** 極速分流護理師。
*   **任務:** 在使用者毫無察覺的毫秒級時間內，分析對話意圖。
*   **判斷:** 安全閒聊 (SAFE) vs 自殺風險 (SUICIDE_RISK) vs 處方請求 (PRESCRIPTION_REQUEST)。
*   **為什麼:** 危急時刻，速度就是生命。

### 🧠 The Heart: Gemini 3 Pro (治療師)
*   **角色:** 深夜值班的 AI 諮商師。
*   **任務:** 接收 Flash 的判斷，進行深度對話。
*   **Vibe:** 
    *   它不說教，它傾聽。
    *   當 Flash 發出 `SUICIDE_RISK` 警報，Pro 會立即切換至 **「危機干預模式」**：不再只是聊天，而是使用「著地技術 (Grounding Techniques)」，引導學生進行呼吸調節，並溫柔地推送 1925 或 119 資訊。

---

## 🚀 Impact Features (功能亮點)

### 1. 🇹🇼 Localized & Legally Aware (台灣在地化)
不同於通用 AI，我們的 HuatuoGPT II 經過台灣情境調校：
*   **法律知識:** 熟悉《性騷擾防治法》、《性別工作平等法》及《性別平等教育法》，針對權勢性侵，能及時給予建議。
*   **醫療界線:** 嚴守《醫師法》，絕不進行線上診斷或開藥，而是提供衛教與陪伴。

### 2. 🚨 Panic Button Paradigm (恐慌急救)
介面不僅是聊天視窗，更是一個急救包：
*   **Always-on Header:** 無論滑動到哪裡，一鍵撥打 119/1925 的按鈕永遠在手邊。
*   **Visual Mindfulness:** 內建 CSS 動畫驅動的 **4-2-6 正念呼吸引導**。當文字無法安撫焦慮的身體時，我們用視覺引導呼吸。

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Tailwind CSS (Glassmorphism 視覺風格，營造平靜感)。
*   **AI Core:** Google Gemini API (`@google/genai`).
*   **Prompt Engineering:** Chain-of-Thought promoting medical accuracy inspired by HuatuoGPT-II paper findings.

---

## 🚀 啟動與部署這個 AI Studio 應用程式

👀 **在 AI Studio 瞧瞧 HuatuoGPT II 自殺防治守門員 App：** [https://ai.studio/apps/drive/1ynZXYwBaw10-V1iLmDFff8WcgemJSaoA?fullscreenApplet=true](https://ai.studio/apps/drive/1ynZXYwBaw10-V1iLmDFff8WcgemJSaoA?fullscreenApplet=true)
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

## 📸 Local Usage

### Prerequisites
*   Node.js 18+
*   一顆想改變世界的心。

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

## 💌 Message to the Judges (給評審的話)

這不只是一個 Chatbot，這是我們對體制遺憾的溫柔補償。

我們證明了，即使學校沒有預算聘請夜間諮商師和校護，我們依然可以用科技守住最後一道防線。HuatuoGPT-II 論文展示了醫學語言模型的可能性，而我們用 **Gemini 3 Pro** 將這份可能性變成了每位學生口袋裡的 24 小時守護者。

**Technology is the campfire around which we gather in the dark.**
**(科技，是我們在黑暗中取暖的營火。)**

---

*Made with ❤️, ☕, and Gemini.*