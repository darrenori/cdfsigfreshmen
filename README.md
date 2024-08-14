# CDFSIG Freshmen Scavenger Hunt

This is the CTF-style scavenger hunt we (TP CDFSIG — the Cybersecurity &
Digital Forensics Cohort student interest group) run for incoming freshmen.
It's a small web app: a static frontend that looks like a hacker terminal, and
a Node/Express + MySQL backend that tracks who's solved what and when.

The whole point is that the app is *deliberately* broken in places. SQL
injection, a JWT that's signed with a joke secret, a profile-update endpoint
you can tamper with in Burp — those aren't bugs to fix, they're the challenges.
So please don't "clean them up." If you're new to the repo, read
[docs/CHALLENGES.md](docs/CHALLENGES.md) first so you know which sharp edges are
on purpose.

## What's in here

```
cdfsigfreshmen/
├── CTF-Frontend/          Static site (HTML/CSS/JS). Serve with Live Server.
│   ├── index.html         Landing page
│   ├── quests.html        The puzzle board players work through
│   ├── hackerboard.html   Leaderboard (pulls from /GetAllUsers)
│   └── puzzle7/           Self-contained mini-site for the last challenge
├── TPCDF Backend/         Express API on http://127.0.0.1:8081
│   ├── server.js          Routes live here
│   ├── controllers/       Request handlers + JWT
│   ├── models/            SQL queries
│   └── tpcdfsig.js        MySQL connection (localhost:3307, db "test")
├── ImportMe.sql           Database dump — import this before anything works
└── docs/                  Everything below
```

## Docs

- [docs/SETUP.md](docs/SETUP.md) — get it running on your machine, step by step.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the pieces fit, the API
  routes, the tech stack, and the intentional weak spots.
- [docs/CHALLENGES.md](docs/CHALLENGES.md) — the answer key. Organizers only.
- [docs/TOOLKIT.md](docs/TOOLKIT.md) — the tools a player actually needs
  (Burp, sqlmap, FTK Imager, HxD, CyberChef, and friends).
- [docs/RUNNING-THE-EVENT.md](docs/RUNNING-THE-EVENT.md) — running the hunt on
  the day without it falling over.

## Quick start (the 60-second version)

You need Node, a MySQL server (we run it on port **3307**), and a way to serve
static files (VS Code's Live Server is what we use).

```bash
# 1. backend deps
cd "TPCDF Backend"
npm install

# 2. import the database (from a mysql shell or phpMyAdmin)
#    the dump creates the "test" database and its tables
mysql -u root -P 3307 < ../ImportMe.sql

# 3. start the API
npm start                      # nodemon server.js -> :8081

# 4. in a second window, open CTF-Frontend/index.html with Live Server
```

Full details, and the gotchas (yes, the DB port really is 3307), are in
[docs/SETUP.md](docs/SETUP.md).

## Heads up

This app stores passwords as MD5, hardcodes its JWT secret, and trusts input it
shouldn't. That's fine for a throwaway freshmen event on localhost. **Don't put
this on the public internet** and don't reuse any of this code in something real.
