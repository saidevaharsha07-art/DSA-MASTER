# DSA Magna — Launch Package & Distribution Kit

Welcome to the official launch assets kit for **DSA Magna**. This package contains ready-to-publish social distribution copy, pre- and post-launch checklists, and a production custom domain roadmap.

## Package Contents

1. [Launch Checklist](file:///./launch-checklist.md) — Step-by-step verification checklist covering production health, responsive design, analytics, and security.
2. [LinkedIn Announcement](file:///./linkedin-post.md) — Long-form professional announcement geared towards software engineers, recruiters, and engineering leaders.
3. [Instagram / Social Visual Post](file:///./instagram-caption.md) — Visual-first carousel captions with hook, value proposition, and hashtags for developer communities.
4. [WhatsApp / Community Message](file:///./whatsapp-message.md) — Direct, conversational broadcast copy for developer groups, Discord channels, and university WhatsApp chats.
5. [5-Day Social Content Sequence](file:///./social-content-plan.md) — Strategic campaign plan outlining post themes, formats, and talking points across the launch week.

---

## 🌐 Custom Domain Roadmap (`dsamagna.com`)

While the initial public release is live on Vercel at `https://dsa-master-7boq.vercel.app`, the roadmap for provisioning the sovereign domain `dsamagna.com` is detailed below.

### Phase 1: Domain Registration
- **Registrar**: Cloudflare Registrar, Namecheap, or Google Domains (Squarespace).
- **Domain**: `dsamagna.com` (and optionally `www.dsamagna.com`).
- **Privacy Protection**: Ensure WHOIS Privacy / Domain Protection is active (free on Cloudflare/Namecheap).

### Phase 2: Vercel Domain Assignment
1. Navigate to the project on **Vercel Dashboard** > **Settings** > **Domains**.
2. Click **Add Domain** and enter:
   - `dsamagna.com`
   - `www.dsamagna.com` (recommended to redirect to apex `dsamagna.com` or vice-versa).
3. Vercel will generate the required DNS records (A Record and CNAME).

### Phase 3: DNS Records Setup
In your domain registrar's DNS Management console, add the following records:

| Type | Name / Host | Target / Value | TTL | Note |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Automatic / 300s | Points apex domain to Vercel global edge network |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300s | Points www subdomain to Vercel |

*(If using Cloudflare DNS, set Proxy status to **DNS Only (Grey Cloud)** during verification to allow Vercel's automated Let's Encrypt SSL issuance).*

### Phase 4: Environment Variable Updates
Once DNS propagates (typically 2 to 30 minutes), update environment variables:
1. In Vercel Project Settings > Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://dsamagna.com`
2. In Supabase Dashboard > Authentication > URL Configuration:
   - **Site URL**: `https://dsamagna.com`
   - **Redirect URLs**: Add `https://dsamagna.com/**`
3. Trigger a production redeployment on Vercel to bake the updated site URL into metadata and OAuth callbacks.
