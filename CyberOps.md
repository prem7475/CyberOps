# [CyberOps] — Complete Platform Specification
### A Premium, Hands-On Cybersecurity Learning & Practice Platform (Full Detail Edition)

> This is the exhaustive version. Hand each phase to your build session as its own task — each phase section below is long enough to scaffold a real sprint of work.

---

## 0. The Core Idea, Explained Properly

The platform's entire value proposition rests on one loop, repeated hundreds of times across a user's journey:

**Learn → Understand why it's vulnerable → Break it yourself → Get proof (flag) → Reflect on the fix → Move to the next, slightly harder thing.**

Everything "illegal-feeling" about this platform — scanning, exploiting, bypassing logins, escalating privileges, intercepting traffic, cracking passwords — is made legal and safe by one architectural fact: **the user never touches a real system.** Every target is a container you built, seeded only with vulnerabilities you put there on purpose, running on a private virtual network that has no path to the internet or to anyone else's data. The user's sense of "I'm actually hacking something real" is 100% genuine (real tools, real shells, real exploitation mechanics) while being 100% contained (fake, disposable, isolated infrastructure). This is exactly how TryHackMe, HackTheBox, and PortSwigger's Web Security Academy work — none of them let you attack real external targets either.

So the "how do I let users do illegal-feeling things safely" answer is: **you are not giving them access to do illegal things — you are building a realistic theater set and giving them access to break the set.** The techniques are real. The targets are props you built.

---

## 1. Detailed User Journey (First-Time User, Start to Finish)

1. **Landing page** — user sees hero section with a live-looking animated terminal demo (pre-scripted, not a real backend call) showing a scan → exploit → flag sequence. Clear CTA: "Start Free."
2. **Signup** — email + password, or OAuth. Email verification required before dashboard access (prevents throwaway-account abuse of lab resources).
3. **Onboarding quiz (optional but recommended)** — 4–5 questions: "Have you used a Linux terminal before?" / "Do you know what a port scan is?" This routes the user to a recommended starting path (complete beginner → "Linux Fundamentals"; experienced → "Web App Security" or straight into rooms).
4. **Dashboard** — shows: recommended next lesson, overall progress ring, streak counter, "Continue where you left off" card, and a row of suggested rooms matched to their current skill level.
5. **First lesson** — short video (8–12 min) explaining a concept (e.g., "What is a port, and why does scanning matter?"). Below the video: written notes in collapsible sections, a "Key Commands" box showing the exact syntax they'll need, and a "Try it now" button.
6. **First room** — clicking "Try it now" provisions their first container live (with a loading animation: "Spinning up your machine… assigning IP… almost ready"). Terminal appears. A **task panel** sits beside the terminal listing numbered objectives: "1. Scan the target machine and find open ports. 2. Identify the service running on port 21. 3. Find the flag hidden in the FTP server."
7. **User works the room** — runs `nmap`, sees results in real terminal output (because it's a real container, real service, real response — not a scripted fake), identifies FTP, connects anonymously (a vulnerability you configured on purpose), finds a flag file.
8. **Submits flag** — pastes it into the flag box, gets instant success animation + points awarded + "Mark as complete" on the lesson.
9. **Reflection panel appears** — "What just happened?" section explains in plain language: anonymous FTP login was enabled, which is a real misconfiguration seen in production systems; here's how you'd fix it (disable anonymous auth, enforce credentials).
10. **Next recommended step** surfaces automatically, continuing the loop.

This loop — concept, hands-on proof, reflection on real-world relevance — is what separates a serious platform from "just a CTF with no teaching."

---

## 2. Vulnerability Design Framework (How "Hacking" Actually Works on the Backend)

You are not writing exploit code or malware — you are **configuring realistic weaknesses into infrastructure you own**, the same way every cybersecurity training lab in the world does it. Each room is built from a small, well-understood catalog of vulnerability *classes*. Here's how each class is realized as an actual container configuration (conceptually — this is standard, widely-documented security-training knowledge, not attack tooling):

| Vulnerability Class | How it's configured in the lab | What the user practices |
|---|---|---|
| Weak/default credentials | Target service ships with a known-weak username/password combo | Credential brute-forcing, password hygiene lessons |
| Anonymous/misconfigured services | FTP/SMB/NFS configured to allow anonymous or overly-permissive access | Enumeration, service misconfiguration awareness |
| Outdated software with known CVEs | Target runs an older, intentionally unpatched version of a real service in an isolated container | Vulnerability research (searchsploit), patch management lessons |
| Web input validation flaws (SQLi, XSS, command injection) | Custom-built vulnerable web app (your own code, deliberately unsafe) seeded with a flag in the backend DB | Using Burp/ZAP, sqlmap, manual testing — and critically, seeing the *secure* version side-by-side |
| Insecure file permissions / privilege escalation paths | Target OS has an intentionally misconfigured SUID binary, writable cron job, or sudo misconfig | Linux privilege escalation methodology (linpeas, manual enumeration) |
| Weak network segmentation | Multi-container labs where an "internal" machine is reachable only after pivoting through a compromised "edge" machine | Lateral movement, pivoting, routing through compromised hosts |
| Exposed secrets | Config files, environment variables, or Git history in the target containing credentials or API keys | Recon discipline, "don't trust the UI, check the filesystem" habits |

Every single vulnerability is: (a) built and seeded by you/your content team, (b) documented internally with an answer key, (c) paired with a "how to fix this" writeup shown after completion. This is content design, not weapon design — it's the same process used by every legitimate security-training company.

---

## 3. Network & IP Simulation (Detailed)

Users frequently want to feel like they're manipulating real network infrastructure. Here's how that's done safely:

- Each lab session gets its own **Docker bridge network** (or Linux network namespace), e.g. `10.50.{session_id}.0/24`, invisible and unreachable from any other session or the host's real network.
- The attacker container is assigned a private IP (e.g., `10.50.12.10`), target containers get others (`10.50.12.20`, `10.50.12.21`...).
- **"IP manipulation" features** users can safely play with inside their sandbox:
  - Changing their own container's IP alias / adding secondary interfaces (`ip addr add`)
  - Practicing ARP spoofing *within their own isolated network* against their own target containers (using `ettercap`/`bettercap`) — genuinely functional, because it's their own private virtual switch
  - Setting up port forwarding/pivoting through a compromised machine (`chisel`, `ssh -D`, `socat`) to reach a third "internal-only" machine that has no direct route from the attacker box — this is how real pivoting/lateral movement is taught
  - Editing their own `/etc/hosts`, practicing DNS spoofing against a lab DNS server you control
- None of this ever has a route out of the session's private network. There's no NAT to the internet, no route to the host's real interfaces, and no route to any other user's session network. This is enforced at the Docker network driver level plus firewall rules (iptables/nftables) on the host as a second layer of defense.

---

## 4. Realism & "Unreal Experience" — How Users Feel Like Real Hackers

This is a UX and content-design problem, not a technical trick:

- **Real tools, real output.** Never fake terminal output with scripted text. Every command result is the genuine output of a genuine tool against a genuine (if small) target. This authenticity is what separates a platform from a "choose your own adventure" game.
- **Realistic target design.** Target machines should look like believable small businesses, not obviously-fake CTF boxes — a mock "internal HR portal," a mock "company file server," a mock "IoT device admin panel." Naming, banners, and fake company branding inside the lab environment (e.g., a fictional company "Northwind Logistics") build immersion without needing anything illegal.
- **Mission framing.** Rooms are framed as engagements: "You've been hired by [Fictional Corp] to perform an authorized penetration test of their staging environment." This mirrors real-world professional context (and quietly reinforces the ethics/authorization lesson every time).
- **Live feedback & tension.** A visible timer, a "services discovered" counter that updates as nmap results stream in, sound/visual cues on flag capture — small polish details that make the moment of success feel earned.
- **Difficulty curve with genuine stakes.** Some advanced rooms can include a "detection" mechanic — a simulated monitoring system that logs noisy behavior (e.g., too many failed login attempts) and displays a mock "alert triggered" banner, teaching stealth/OPSEC concepts without any real consequence.
- **No hand-holding unless asked.** Hints are hidden by default and cost points to reveal, preserving the feeling of genuine discovery.

---

## 5. Admin / Instructor Panel — Full Detail

The admin panel is a separate route (`/admin`, role-gated) with its own minimal, data-dense UI (less decorative than the learner-facing app, more like a dashboard/table-heavy internal tool — think Retool/Linear admin views: dense tables, inline editing, clear status badges).

### 5.1 Admin Dashboard (landing page)
- Top stat cards: Total Users, Active Lab Sessions (live count), Rooms Completed Today, Avg. Session Duration, Server Resource Load (CPU/RAM across the container fleet)
- Graph: signups over time, room completions over time
- "Needs attention" panel: flagged abuse events, failed container provisions, rooms with unusually low completion rate (signals the room might be broken or too hard)

### 5.2 Content Management (Course/Lesson/Room Builder)
- **Path builder:** drag-and-drop ordering of modules within a path, each module containing an ordered list of lessons
- **Lesson editor:** video upload/attach (via Mux/Cloudflare Stream integration — shows processing status), rich-text/Markdown editor for notes, embedded quiz builder (multiple choice, drag the correct command, fill-in-the-blank)
- **Room builder — the most complex screen:**
  - Define room metadata: title, difficulty, category tags, estimated time, points value
  - **Container template selector:** choose base image for attacker box, add one or more target container images from a library of pre-built vulnerable images
  - **Network topology editor:** simple visual node-and-line editor to define which containers can reach which others (e.g., attacker → edge-server: yes; attacker → internal-db: no, only edge-server → internal-db: yes) — this visually defines the pivoting challenge
  - **Flag configuration:** define where the flag lives (file path, DB entry, env var) and whether it's static per room or dynamically generated per session
  - **Hint ladder:** add N hints with escalating specificity and point costs
  - **Writeup/solution field:** internal-only staff documentation of the intended solution path, used for QA and support
  - **Preview/test mode:** admin can spin up the room exactly as a user would, to verify it works before publishing
- **Publish workflow:** Draft → Internal Review → Published, with versioning so you can patch a broken room without losing user progress data tied to the old version

### 5.3 User Management
- Searchable/filterable user table: email, signup date, plan tier, last active, total points, flagged status
- Click into a user: full activity timeline, active sessions (with a "force-terminate session" button for abuse response), ability to grant/revoke roles, issue refunds, ban/suspend

### 5.4 Infrastructure Monitoring
- Live table of all currently-running containers: session ID, user, room, started-at, resource usage, time remaining before auto-teardown, manual "kill now" button
- Alerting thresholds config (e.g., "alert me if concurrent sessions > 80% of capacity")
- Image registry view: all lab container images, versions, last-built date, rebuild button (for patching base images with security updates)

### 5.5 Analytics
- Funnel view per learning path: % who start lesson 1 → % who finish → % who attempt the room → % who complete it (surfaces drop-off points)
- Room difficulty calibration: average time-to-complete and hint-usage rate per room, flagged if a room is wildly harder/easier than its stated difficulty
- Revenue dashboard (Phase 4+): MRR, churn, conversion rate from free to paid

---

## 6. Gamification Mechanics — Full Detail

- **Points:** base value per room scaled by difficulty (Easy: 50–100, Medium: 150–300, Hard: 400–800), reduced by hint usage (e.g., -10% per hint revealed), bonus for first-attempt flag submission with zero hints ("Clean Solve" bonus badge)
- **Badges:** category-based ("Web Warrior" — complete 10 web rooms), skill-based ("Privilege Escalation Specialist"), speed-based ("Solved in under 15 minutes"), streak-based ("7-day streak")
- **Streaks:** daily activity tracked via timezone-aware "did they complete at least one lesson or room today" check; streak freezes available (limited per month) so one missed day doesn't reset months of progress — this is a wellbeing-friendly mechanic, avoiding punishing lapses too harshly
- **Leaderboard:** global (all-time + monthly reset), friends-only view, path-specific leaderboards (e.g., top scorers in "Web App Security" specifically)
- **Certificates:** auto-generated PDF on path completion, with a unique verification URL (`/verify/[cert-id]`) so users can share it credibly on LinkedIn

---

## 7. PHASE 1 — Foundation & MVP (Expanded)

**Goal:** one complete, polished, real learning loop — not a skeleton, a genuinely finished small product.

### Backend/Infra
- Next.js frontend, NestJS backend, PostgreSQL, Redis, Docker Compose for local dev orchestration
- Auth system: email/password with bcrypt hashing, email verification via signed token link, JWT access + refresh token rotation, rate-limited login endpoint
- DB schema v1: `users`, `paths`, `modules`, `lessons`, `rooms`, `room_containers`, `sessions` (lab sessions), `submissions`, `progress`
- Lab orchestration service: a backend service that talks to the Docker Engine API to create a per-session network + containers, injects a unique flag value as an environment variable or seeded file at container start, and tears everything down on timeout or explicit "end session"
- WebSocket gateway for terminal: authenticates the user, maps their session to their specific container, pipes `docker exec -it <container> /bin/bash` through node-pty into the socket

### Frontend
- Full design system first: color tokens, typography scale, button/card/input components in the dark premium theme described in Section 2 of the original doc
- Landing page, auth pages, dashboard shell with sidebar
- Lesson page: video player + notes + "Try it now" button
- Room page: task panel + xterm.js terminal + flag submission + success/reflection panel

### Content
- One path: "Linux Fundamentals for Hackers" — 5 lessons (filesystem basics, permissions, processes, networking basics, intro to the shell as an attack surface)
- One fully-built room: a single target container with an anonymous-FTP misconfiguration and a flag file, paired to the final lesson

### Exit Criteria
A real user can sign up, verify email, watch all 5 lessons, open a genuine isolated terminal, scan and exploit the one target, submit the correct per-session flag, and see a reflection/fix explanation. No admin panel needed yet — rooms can be seeded directly via DB migration/seed script.

---

## 8. PHASE 2 — Content Depth, Gamification, Admin Panel (Expanded)

### Admin Panel (full build, as detailed in Section 5)
This is the big unlock of Phase 2 — before this, you were hand-seeding content via scripts. Build the full CMS described above so non-engineers (or future-you, moving faster) can create paths/rooms without touching code.

### Content Expansion
- 4 full paths: Linux Fundamentals, Web App Security Basics, Network Fundamentals, Intro to Pentesting Methodology
- 15–20 rooms across difficulty tiers, each following the vulnerability framework in Section 2
- Quiz engine between lessons (multiple choice + command fill-in-the-blank types)

### Gamification (full build, Section 6)
- Points, badges, streaks, leaderboards, certificates — all implemented with real DB-backed logic, not placeholder UI

### Tools Reference Library
- Full searchable reference for every tool in the catalog, each entry cross-linked to the lesson that teaches it and the room that drills it

### Hint System
- Hint ladder UI in the room page, point-cost deduction logic, "are you sure?" confirmation before revealing

---

## 9. PHASE 3 — Advanced Labs & Realism (Expanded)

### Multi-Container Network Labs
- Full implementation of the network topology editor (Section 5.2) and the pivoting mechanics (Section 3)
- At least 5 "chain" rooms: compromise edge machine → pivot → compromise internal machine → escalate privileges → final flag, modeling a realistic small-engagement scenario

### Advanced Modules
- Active Directory module: a small simulated Windows domain (domain controller + 1–2 workstation containers) for BloodHound/SharpHound-based attack path lessons
- Forensics/reverse-engineering module: static challenge files (not live containers) for binwalk/exiftool/volatility practice, plus a small binary-analysis track with ghidra/radare2

### Infrastructure Hardening
- Migrate from plain Docker isolation to gVisor (runsc) or Firecracker microVMs for stronger kernel-boundary isolation as concurrent users scale
- Infra-as-code: Terraform for cloud resources, Ansible for base image provisioning, so lab images are reproducible and auditable

### Admin: Monitoring & Analytics (full build, Sections 5.4–5.5)
- Live container fleet monitoring, funnel analytics, room difficulty calibration dashboards

---

## 10. PHASE 4 — Scale, Community, Monetization (Expanded)

### Monetization
- Free tier: limited rooms/month, shorter session timeouts (e.g., 30 min), ads-free (your product is ad-free by design)
- Pro tier (Stripe subscription): unlimited rooms, longer sessions, priority container provisioning, exclusive advanced paths, downloadable certificates
- Optional one-time path purchases for non-subscribers

### Community
- Post-completion discussion threads per room (locked until the user has solved it, to prevent spoilers)
- Public profile pages showcasing badges, certificates, completed paths
- Optional community-authored rooms with a staff review/QA queue before publishing (using the same admin room builder, with a "submitted by community" flag)

### Production Hardening
- WAF + DDoS protection on public endpoints, strict rate limiting on auth and terminal endpoints
- Full observability: Prometheus/Grafana for infra metrics, Sentry for app errors, structured audit logs for every terminal session (retained per a documented policy, disclosed in your privacy policy)
- Load testing of the container orchestration layer; autoscaling policy so lab provisioning doesn't degrade under concurrent load
- Finalized legal docs: Terms of Service explicitly stating labs are self-contained educational environments, authorized-use-only language, and a clear statement that the platform provides no access to real external systems

---

## 11. Non-Negotiable Safety Architecture (applies to every phase)

1. No lab container has outbound internet access by default — ever.
2. Every session's network is isolated from the host and from every other session, enforced at both the Docker network layer and host firewall rules.
3. Hard per-container resource quotas (CPU/RAM/disk/process count).
4. Idle timeout + hard max session length, with automatic teardown.
5. All target machines are custom-built by you, with fully documented, intentional vulnerabilities — never unknown/live production software.
6. Flags are dynamically generated per session, never static, to prevent answer-sharing between users.
7. Full audit logging of terminal sessions for abuse detection, governed by a disclosed retention policy.

This architecture is what makes the "feels illegal, is completely legal" experience work: everything the user does is real, skillful, and consequence-free because the entire battlefield is a prop you control end to end.
