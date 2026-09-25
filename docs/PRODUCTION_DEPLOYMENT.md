# DSA Magna — Production Deployment & Operations Guide

This manual serves as the single source of truth for deploying, configuring, securing, and maintaining **DSA Magna** in real-world production environments.

---

## FREE FIRST RELEASE ($0 Hosting Architecture)

> [!IMPORTANT]
> **Product Architecture Decision: $0 Public Release Strategy.**
> DSA Magna launches initially with a 100% free hosting stack combining **Vercel Hobby** and **Supabase Free Tier**.
> No paid cloud infrastructure (no Hetzner, AWS, DigitalOcean VPS, custom domain, or paid monitoring) is required.

### 1. What is Included & Fully Available ($0 Tier):
- **Full Curriculum & Learning Modules**: All 4,000+ problems, learning journey roadmaps, pattern explanations, and topic drill-downs.
- **Interactive Practice Arena**: Monaco-based code editor, language selector (Python, Java, C++, JavaScript, TypeScript, Go, Rust, C), sample testcase exploration, custom input builder, and strategy predictor.
- **Interview Simulator**: Company tracks, problem playlists, assessment timers, and mock interviews.
- **Study Plans**: Structured milestones, level selection (Beginner, Intermediate, Advanced), and pacing.
- **Authenticated Learner Data**: Supabase Auth (Email & OAuth), user profile creation, progress persistence, onboarding state, and theme customization.
- **Zero Horizontal Overflow & Responsive Mobile Design**: Fully optimized across desktop, tablet, and mobile (375x812).

### 2. What is Deferred to the Future Full Release:
- **Public Arbitrary Code Execution**: Live execution of learner-submitted Java, Python, and C++ code on an external sandbox is deferred until dedicated judge infrastructure is provisioned.
- **Why Arbitrary Code Execution is Disabled in the Free Release**: Executing unvetted user code inside serverless Lambda/Vercel runtimes without an OS sandbox creates severe security vulnerabilities and exceeds serverless execution limits.
- **Safe Fallback Behavior**: In the Free First Release, `NEXT_PUBLIC_ENABLE_LOCAL_RUNNER=false` and unconfigured Judge0 endpoints (`JUDGE0_URL` / `JUDGE0_API_KEY`) safely transition Run and Submit into an intentional coming-soon state:
  > *"Execution unavailable in the first release. Live code execution is coming soon. Problem solving, learning, interview practice, study plans, and progress tracking are fully available."*
  No host process spawning occurs, no crash is produced, and no false "Accepted" verdicts are faked.

### 3. Exact Future Judge Activation Requirements (When Ready to Scale):
To activate live code execution in a future release without modifying application code:
1. Provision a dedicated Ubuntu 22.04 LTS VPS (e.g. Hetzner CX22, 2 vCPU, 4GB RAM, cgroups v1).
2. Deploy the official Judge0 v1.13.1 cluster with Caddy HTTPS reverse proxy as documented in Section 13.
3. Configure DNS `A` record pointing to the VPS.
4. Add the server-side environment variables in Vercel Project Settings:
   - `JUDGE0_URL`: `https://judge.yourdomain.com`
   - `JUDGE0_API_KEY`: `<SECRET_KEY>`
5. Redeploy Vercel. DSA Magna immediately transitions from the "Coming Soon" state to live isolated code execution.

---

## 1. System Architecture

```
                                    +-----------------------------------------+
                                    |               End Users                 |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |             Edge DNS / CDN              |
                                    |         (Custom Domain / Vercel)        |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |          Vercel Serverless &            |
                                    |             Edge Runtime                |
                                    |  - Next.js 15 App Router                |
                                    |  - Static Assets & SSR Pages            |
                                    |  - API Route Handlers (/api/*)          |
                                    +-----------------------------------------+
                                          /                          \
                                         /                            \
                                        v                              v
            +-------------------------------------+      +-----------------------------------------+
            |         Supabase Managed Cloud      |      |     Dedicated Judge Sandbox Cluster     |
            | - PostgreSQL 15 + Row Level Security|      |         (Judge0 / Piston on VM)         |
            | - Supabase Auth (JWT & OAuth)       |      | - Linux cgroups, namespaces, seccomp    |
            | - Realtime & Automated Triggers     |      | - Ephemeral unprivileged containers     |
            +-------------------------------------+      | - Network-isolated user execution       |
                                                         +-----------------------------------------+
```

### Components
1. **Frontend & API Gateway (Vercel)**:
   - Next.js 15 App Router with TypeScript and Tailwind CSS.
   - Hosts static landing, curriculum navigation, problem catalogs, and serverless API endpoints.
   - Enforces HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Permissions-Policy`).
2. **Database & Identity (Supabase)**:
   - Managed PostgreSQL database with strict Row Level Security (RLS) on all user-owned tables.
   - Supabase Auth handles email/password, session restoration, Google/GitHub OAuth, and password recovery.
3. **External AI Engine (Google Gemini)**:
   - Server-side integration via `GEMINI_API_KEY` for adaptive mentoring and algorithmic explanation hints.
4. **Code Execution / Judge Engine (External Sandbox Cluster — MANDATORY FOR PROD)**:
   - **Current status: BLOCKED for public hosting**.
   - Requires a dedicated external Judge0 or Piston cluster running in an isolated network with kernel-level sandboxing (cgroups v2, namespaces, seccomp filters, CPU/memory quotas, no host network).

---

## 2. Environment Variables Inventory

| Variable Name | Classification | Target Scope | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | Public | Local, Preview, Prod | Branding string (`DSA Magna`). |
| `NEXT_PUBLIC_VERSION` | Public | Local, Preview, Prod | Application release version (e.g. `1.0.0`). |
| `NEXT_PUBLIC_SITE_URL` | Public | Local, Preview, Prod | Canonical base URL (`http://localhost:3000` or `https://yourdomain.com`). |
| `NEXT_PUBLIC_APP_URL` | Public | Local, Preview, Prod | Application root for auth redirects. |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Local, Preview, Prod | Public Supabase project API gateway. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Local, Preview, Prod | Public anonymous JWT for client-side Supabase SDK. |
| `NEXT_PUBLIC_AI_PROVIDER` | Public | Local, Preview, Prod | AI backend preference (`gemini` or `openai`). |
| `NODE_ENV` | Server Only | Local, Preview, Prod | Node environment (`development` \| `production` \| `test`). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | Preview, Prod | Admin service-role key for backend DB tasks and tests. |
| `DATABASE_URL` | Server Only | Local, Preview, Prod | PostgreSQL connection string for migrations. |
| `GEMINI_API_KEY` | Server Only | Local, Preview, Prod | Google AI Studio API key for server-side AI Mentor. |
| `JUDGE0_URL` | Server Only | Preview, Prod | Dedicated Judge0 execution endpoint. |
| `PISTON_URL` | Server Only | Preview, Prod | Dedicated Piston execution endpoint. |

---

## 3. Local Development Setup

1. **Clone repository & install dependencies**:
   ```bash
   git clone https://github.com/saidevaharsha07-art/DSA-MASTER.git
   cd DSA-MASTER
   npm install
   ```

2. **Configure local environment**:
   ```bash
   cp .env.example .env.local
   ```
   Populate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your development Supabase project keys.

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

---

## 4. Preview Deployment (Vercel)

1. Connect the GitHub repository to Vercel.
2. Under **Project Settings -> Environment Variables**, configure Preview variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
   - Leave `NEXT_PUBLIC_SITE_URL` blank so Vercel dynamic `VERCEL_URL` preview domains auto-resolve.
3. Every pull request or non-main branch push generates an isolated preview deployment.

---

## 5. Production Deployment (Vercel)

1. Under **Project Settings -> Environment Variables**, configure Production variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`
   - `NEXT_PUBLIC_APP_URL`: `https://yourdomain.com`
   - `NEXT_PUBLIC_SUPABASE_URL`: Production Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Production Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Production Service Role Key
   - `GEMINI_API_KEY`: Production Gemini Key
   - `JUDGE0_URL`: Dedicated Judge0 production instance URL
2. Promote deployment to Production via GitHub merge to `main` or `vercel --prod`.

---

## 6. Vercel Configuration

- **Framework Preset**: Next.js
- **Node.js Version**: 20.x or 22.x
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Headers**: Configured in `next.config.ts` (nosniff, sameorigin, strict-transport-security).

---

## 7. Supabase Configuration

1. Log in to [Supabase Console](https://supabase.com/dashboard).
2. Create a new project (e.g. `dsa-magna-prod`).
3. Under **SQL Editor**, execute `supabase/schema.sql`:
   - Creates all tables: `profiles`, `progress`, `submissions`, `drafts`, `activities`, `memory_progress`, `settings`, `user_onboarding`.
   - Enables RLS on all 8 tables.
   - Applies strict `auth.uid() = user_id` policies for SELECT, INSERT, UPDATE, DELETE.
   - Installs `handle_new_user` trigger with `SECURITY DEFINER SET search_path = public`.

---

## 8. OAuth Configuration (Google & GitHub)

1. **Google OAuth**:
   - Go to Google Cloud Console -> APIs & Services -> Credentials.
   - Create OAuth 2.0 Client ID (Web Application).
   - Authorized Javascript origins: `https://yourdomain.com`.
   - Authorized redirect URI: `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`.
   - In Supabase Dashboard -> Authentication -> Providers -> Google: paste Client ID and Secret.
2. **GitHub OAuth**:
   - GitHub Developer Settings -> OAuth Apps -> New OAuth App.
   - Homepage URL: `https://yourdomain.com`.
   - Authorization callback URL: `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`.
   - In Supabase Dashboard -> Authentication -> Providers -> GitHub: paste Client ID and Secret.

---

## 9. Email Configuration

1. In Supabase Dashboard -> Authentication -> Email Templates:
   - Customize "Confirm your signup" template with DSA Magna branding.
   - Customize "Reset password" template.
2. In Supabase Dashboard -> Authentication -> URL Configuration:
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**:
     - `https://yourdomain.com/auth/callback`
     - `https://yourdomain.com/**`
     - `http://localhost:3000/**` (for local dev)
3. For reliable email delivery, connect a custom SMTP provider (Resend / SendGrid / Postmark).

---

## 10. Custom Domain Configuration (DNS)

1. In Vercel -> Project -> Settings -> Domains:
   - Add `yourdomain.com` and `www.yourdomain.com`.
2. In your DNS Provider (Cloudflare / Namecheap / Route53):
   - Apex record (`@`): `A` record pointing to `76.76.21.21` (or CNAME to `cname.vercel-dns.com` where ALIAS/ANAME is supported).
   - Subdomain (`www`): `CNAME` pointing to `cname.vercel-dns.com`.
3. Wait for SSL certificate provisioning (automatic via Let's Encrypt in Vercel).

---

## 11. Database Migrations

- The canonical production schema resides in `supabase/schema.sql`.
- When updating schemas:
  - Do NOT modify existing historical columns destructively.
  - Apply backward-compatible migrations via SQL editor or Supabase CLI (`supabase db push`).
  - Always verify that new user-owned tables have `ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;` and policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE`.

---

## 12. Security Checklist

- [x] All user tables enforce Row Level Security (`auth.uid() = user_id`).
- [x] No `NEXT_PUBLIC_*` variable contains service secrets or database passwords.
- [x] API routes (`/api/db/sync`, `/api/judge/run`, `/api/judge/submit`, `/api/ai/generate`) validate payloads and enforce authentication.
- [x] Security headers active: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=31536000`, `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] Robots.txt blocks search engines from crawling `/dashboard`, `/settings`, `/profile`, `/api/*`.
- [x] No hardcoded preview URLs in authentication callbacks.
- [ ] **External isolated judge connected (MANDATORY BLOCKER)**.

---

## 13. Production Judge Infrastructure

### Architectural Isolation & Production Safety Policy
DSA Magna enforces a strict separation between the Next.js serverless web runtime and user-submitted code execution.

**Why Local Host Execution Is Disabled in Production:**
1. **Arbitrary Code Security Hazard**: In development environments, local runners spawn processes via `child_process.spawn`. In a public production setting, executing unvetted C++, Java, or Python submissions without Linux namespaces, seccomp filters, or cgroups exposes the host to filesystem traversal, process table exhaustion (fork bombs), CPU/memory starvation, and credential harvesting.
2. **Serverless Lambda Environment Constraints**: Vercel Serverless Functions execute inside ephemeral micro-containers without compilation toolchains (`javac`, `g++`, `gcc`) or full runtimes. Local spawning on Vercel immediately fails with `ENOENT` or execution timeouts.
3. **Multi-Tenant Protection**: Production servers must never execute code from different students in the same OS namespace.

To prevent unsafe execution, DSA Magna incorporates a strict server-side environment guard:
- `NEXT_PUBLIC_ENABLE_LOCAL_RUNNER=false` (Production)
- `ENABLE_LOCAL_RUNNER=false` (Production)
- In production (`NODE_ENV === 'production'`), `isLocalExecutionAllowed()` unconditionally returns `false`. Any attempt to invoke `sandboxRunner.execute()` throws an immediate exception, completely preventing `child_process.spawn` calls.

---

### Required Isolated Judge Service Architecture

Production execution dispatches user code to a dedicated, isolated external execution cluster (e.g. **Judge0** or **Piston**).

```text
[ Learner Browser ]
       │  (HTTPS POST /api/judge/run or /api/judge/submit)
       ▼
[ DSA Magna Next.js App (Vercel) ]
       │  • Input & payload validation (max 50KB code, max 64KB payload)
       │  • User authorization & cross-user spoofing prevention
       │  • Dynamic language mapping (Java -> 62, Python -> 71, C++ -> 54)
       │  • Server-controlled CPU & memory limit injection
       │  • Server-only JUDGE0_API_KEY attachment
       ▼
[ Network Boundary (TLS / Mutual Auth / Private VPC) ]
       ▼
[ Dedicated Isolated Judge Cluster (Judge0) ]
       │  • Docker container isolation
       │  • cgroups v2 (CPU quotas, strict 256MB RAM cap)
       │  • Network namespace: none (zero outbound network access)
       │  • Read-only root filesystem with ephemeral tmpfs
       │  • Non-root unprivileged execution user (nobody)
       │  • seccomp profile restricting dangerous syscalls
       ▼
[ Normalized DSA Magna Execution Result ]
```

---

### Environment Variables & Configuration

The server-side adapter connects using the following server-only environment variables:

| Variable | Description | Classification | Scope |
| :--- | :--- | :--- | :--- |
| `JUDGE0_URL` | Base URL of the dedicated Judge0 API endpoint (e.g. `https://judge.dsamagna.com`) | Confidential URL | Server-only (Vercel Production & Preview) |
| `JUDGE0_API_KEY` | Secret bearer or token header for Judge0 API authentication | **CRITICAL SECRET** | Server-only (Vercel Production & Preview) |
| `NEXT_PUBLIC_ENABLE_LOCAL_RUNNER` | Guard flag controlling client/local runner visibility (`false` in production) | Public Config | Production (`false`), Local Dev (`true`) |

> [!CAUTION]
> `JUDGE0_API_KEY` must **NEVER** be exposed to the client, prefixed with `NEXT_PUBLIC_`, printed to server logs, or returned in error payloads. DSA Magna sanitizes all stdout/stderr streams before returning results to students.

---

### Network Boundary & Authentication
- **Vercel to Judge**: All communication occurs over encrypted HTTPS/TLS 1.3.
- **Authentication**: Requests from DSA Magna to Judge0 include `X-Auth-Token: <JUDGE0_API_KEY>` (or `X-RapidAPI-Key` if using RapidAPI endpoints).
- **IP Allowlisting**: For self-hosted instances on AWS EC2, GCP, or Hetzner, configure firewall rules to only permit incoming HTTP/HTTPS traffic from Vercel's Anycast egress IP ranges or configure Cloudflare Access / Tailscale tunnel.

---

### Execution Isolation Requirements
1. **Container Sandboxing**: Every submission compiles and executes in a clean, ephemeral container.
2. **Cgroups v2 Limits**:
   - Max CPU time: 2.0s to 5.0s (controlled by DSA Magna `SUPPORTED_LANGUAGES`).
   - Max Memory: 128MB to 256MB.
   - Max Processes (pids limit): 64 (prevents fork bombs).
3. **Network Isolation**: `enable_network: false` (container network interface set to down; no outbound socket connections).
4. **Filesystem**: Read-only root image; execution directory mounted as a temporary in-memory `tmpfs` volume with a maximum disk size of 10MB.
5. **Privilege Dropping**: Execution runs as UID 1000 or unprivileged user `nobody`.

---

### Failure Behavior & Resilience
If the external judge service is unreachable, overloaded, or misconfigured, DSA Magna handles errors safely and gracefully:
- **Judge Unavailable (Network Failure or 5xx)**: Returns a clean user message:
  `"Code execution is temporarily unavailable. Please try again shortly."`
  **DSA Magna NEVER silently falls back to unsafe host execution in production.**
- **Authentication Failure (401/403)**: Returns:
  `"Code execution service authentication failed. Please contact the administrator."`
  (Never reveals the API key or internal endpoint).
- **Rate Limit Exceeded (429)**: Returns:
  `"Execution rate limit reached. Please wait a few seconds before trying again."`
- **Execution Timeout**: Returns status `time_limit` with exit code `124` and explicit runtime limit details.
- **Compilation / Runtime Errors**: Captures compiler output or exception traces safely without leaking system information.

---

### Monitoring & Key Rotation
- **Health Checks**: Monitor `GET ${JUDGE0_URL}/about` every 60 seconds with threshold alerts for queue latency.
- **Credential Rotation**: To rotate `JUDGE0_API_KEY`:
  1. Generate a new secret token in the Judge0 configuration.
  2. Update `JUDGE0_API_KEY` in Vercel Project Settings > Environment Variables.
  3. Redeploy or restart Vercel serverless functions without downtime.
  4. Decommission the old token after confirming successful execution.

---

### Verified Official Judge0 Deployment Template (v1.13.1 Reconciliation)

#### 1. Host OS & Kernel Prerequisite (cgroups v1)
> [!IMPORTANT]
> **Recommended Host OS: Ubuntu 22.04 LTS.**
> Judge0 v1.13.1 uses Martin Mares's `isolate` sandbox, which strictly requires **cgroups v1**. Ubuntu 22.04 LTS fully supports cgroups v1 when enabled in GRUB. (Ubuntu 24.04 LTS is NOT recommended because its newer systemd v255 drops legacy cgroup v1 support, leading to known failures in Judge0 issue #536).

On a fresh Ubuntu 22.04 LTS VPS, configure legacy cgroups before launching Docker:
```bash
sudo sed -i 's/GRUB_CMDLINE_LINUX="/GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=0 /' /etc/default/grub
sudo update-grub
sudo reboot
# Verify after reboot (must output "tmpfs"):
stat -fc %T /sys/fs/cgroup/
```

#### 2. Reconciled `docker-compose.yml`
*Aligns with official Judge0 v1.13.1 architecture, adds Caddy for HTTPS termination, keeps internal ports private, and strictly omits `/var/run/docker.sock`.*

```yaml
version: '3.8'

services:
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - judge0-net

  server:
    image: judge0/judge0:v1.13.1
    restart: unless-stopped
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    env_file:
      - ./judge0.conf
    privileged: true
    depends_on:
      - redis
      - db
    networks:
      - judge0-net

  workers:
    image: judge0/judge0:v1.13.1
    restart: unless-stopped
    command: ["./scripts/workers"]
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    env_file:
      - ./judge0.conf
    privileged: true
    depends_on:
      - redis
      - db
    networks:
      - judge0-net

  redis:
    image: redis:7.2.4-alpine
    restart: unless-stopped
    command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}", "--appendonly", "yes"]
    volumes:
      - redis_data:/data
    networks:
      - judge0-net

  db:
    image: postgres:13.0
    restart: unless-stopped
    env_file:
      - ./judge0.conf
    environment:
      - POSTGRES_USER=judge0
      - POSTGRES_DB=judge0
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - judge0-net

networks:
  judge0-net:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
  postgres_data:
  redis_data:
```

#### 3. Reconciled `judge0.conf`
```ini
# Judge0 System Configuration
SERVER_PORT=2358
ENABLE_WAIT_RESULT=true

# Database Credentials
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=judge0
POSTGRES_PASSWORD=<POSTGRES_PASSWORD_PLACEHOLDER>
POSTGRES_DB=judge0

# Redis Queue
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=<REDIS_PASSWORD_PLACEHOLDER>

# API Authentication (Header matches DSA Magna client)
AUTHN_HEADER=X-Auth-Token
AUTHN_TOKEN=<JUDGE0_API_KEY_PLACEHOLDER>

# Execution Sandboxing & Limits
CPU_TIME_LIMIT=4.0
CPU_EXTRA_TIME=1.0
WALL_TIME_LIMIT=6.0
MEMORY_LIMIT=262144
STACK_LIMIT=65536
MAX_PROCESSES_AND_OR_THREADS=64
MAX_FILE_SIZE=10240
ENABLE_NETWORK=false
```

#### 4. External Reverse Proxy (`Caddyfile`)
```caddy
judge.yourdomain.com {
    reverse_proxy server:2358
}
```

---

## 14. Monitoring & Observability

- **Application Performance & Errors**:
  - Install Sentry for Next.js (`@sentry/nextjs`) to capture client and server runtime exceptions without logging PII.
  - Enable Vercel Web Analytics and Speed Insights for Core Web Vitals monitoring.
- **Supabase Metrics**:
  - Monitor database connections, API error rates, and query latency in Supabase Dashboard -> Reports.
- **Judge Health**:
  - Monitor dedicated judge queue depth, error rates, and worker memory via Prometheus/Grafana.

---

## 15. Backups & Disaster Recovery

1. **Supabase Backups**:
   - Supabase automatically takes daily backups (Point-in-Time Recovery available on Pro plan).
   - Periodic logical backup: run `supabase db dump -f backup.sql` weekly and store encrypted in cold storage.
2. **Recovery Procedure**:
   - Restore database snapshot via Supabase Console -> Backups.
   - Re-deploy Next.js production build from git commit hash.

---

## 16. Production Smoke Test

Run the automated smoke test before and after production release:
```bash
npx playwright test tests/e2e/production-smoke.spec.ts
```
Covers:
- Public landing, Journey, Practice, Interview, Study Plan
- Authentication UI (Login, Signup, Forgot Password)
- Protected route redirection
- Core learning drill-downs
- Multi-viewport layout (375x812 mobile, 1440x900 desktop)
- Light & dark theme rendering

---

## 17. Rollback Procedure

1. **Immediate Vercel Rollback**:
   - In Vercel Dashboard -> Deployments: Find the previous stable deployment and click **"Promote to Production"**.
   - Instant (<5 seconds) traffic switch at the edge.
2. **Git Rollback**:
   - `git revert HEAD`
   - `git push origin main`

---

## 18. Launch Checklist

- [ ] Supabase production project created and `schema.sql` applied.
- [ ] OAuth provider credentials verified in Supabase Dashboard.
- [ ] Vercel production environment variables populated from `.env.example`.
- [ ] Custom domain DNS propagated and SSL certificate issued.
- [ ] Dedicated isolated judge runner provisioned and `JUDGE0_URL` configured.
- [ ] `npx playwright test tests/e2e/production-smoke.spec.ts` passes against production URL.
- [ ] Sentry error tracking verified.
