# Quinthesis Launch Checklist

**Tagline:** "The second opinion your AI answer deserves"

**Last updated:** 2026-01-04

---

## Completed

- [x] OpenRouter app attribution (usage tracking)
- [x] UI bug fixes (duplicate $, archive navigation)
- [x] Timestamps in archive sidebar
- [x] Launch messaging on Login & Demo pages
- [x] SEO meta tags (title, description, keywords)
- [x] Open Graph tags (Facebook/LinkedIn sharing)
- [x] Twitter Card tags
- [x] robots.txt
- [x] sitemap.xml
- [x] Google Search Console verification tag added

---

## Pending

### SEO & Discovery

- [ ] **Google Search Console** - Verify ownership (retry - was timing out)
  - Go to: https://search.google.com/search-console
  - Use "URL prefix" method with `https://quinthesis.vercel.app`
  - Choose "HTML tag" verification (tag already in place)
  - After verified, submit sitemap: `https://quinthesis.vercel.app/sitemap.xml`

- [ ] **Bing Webmaster Tools** - Helps with ChatGPT visibility
  - Go to: https://www.bing.com/webmasters
  - Can import from Google Search Console once that's verified

- [ ] **Test social sharing cards**
  - Twitter: https://cards-dev.twitter.com/validator
  - Facebook: https://developers.facebook.com/tools/debug/

---

## Launch Channels (To Decide)

### Soft Launch Options
- Share with friends/colleagues for feedback
- Post in relevant Discord/Slack communities

### Public Launch Options
- [ ] **Product Hunt** - Good for developer/AI tools
- [ ] **Hacker News** - "Show HN: Quinthesis - Multi-AI deliberation for better answers"
- [ ] **Twitter/X** - Thread explaining the concept
- [ ] **Reddit** - r/artificial, r/ChatGPT, r/LocalLLaMA

---

## Messaging Framework

### The Problem
Single AI answers have issues:
- Blind spots - each model has biases and knowledge gaps
- Confident hallucinations - AI sounds certain even when wrong
- No way to verify - you just have to trust it

### The Solution
"The second opinion your AI answer deserves"
- Multiple AI models (GPT, Claude, Gemini) respond independently
- They review each other anonymously (peer review)
- A lead model synthesizes the best answer

### Target Audiences

| Audience | Pain Point | Hook |
|----------|-----------|------|
| Researchers | Need reliable info | "Peer-reviewed AI answers" |
| Decision makers | High-stakes choices | "Get consensus, not guesswork" |
| AI skeptics | Been burned by hallucinations | "Multiple models catch errors" |
| Power users | Already use multiple AIs manually | "We automate what you're doing" |

### 10-Second Pitch
> "Quinthesis asks your question to multiple leading AI models, has them anonymously review each other's answers, then synthesizes the best response. Like peer review for AI."

---

## Content Ideas (Future)

- [ ] Blog post: "Why one AI isn't enough"
- [ ] Comparison: Single AI vs Quinthesis on tricky questions
- [ ] Video demo of the deliberation process

---

## URLs

- **Production:** https://quinthesis.vercel.app
- **Demo page:** https://quinthesis.vercel.app/demo
- **Sitemap:** https://quinthesis.vercel.app/sitemap.xml
- **GitHub:** https://github.com/anbuneel/quinthesis
