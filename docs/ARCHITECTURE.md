# How it's built

Nothing here is fancy. It's a static frontend talking to a small Express API
over JSON, with MySQL behind it. This doc is the map: what each piece is, the
routes, the data model, and — importantly — where the intentional holes are so
nobody "fixes" a challenge by accident.

## The stack

**Frontend** (`CTF-Frontend/`)
- Plain HTML, CSS, and vanilla JavaScript. No build step, no framework.
- Bootstrap 4 for layout, with a "neon glow" theme
  (`css/bootstrap4-neon-glow.css`) to get the hacker-terminal look. Custom fonts
  in `fonts/` (Doctor Glitch, PhelixBoomgartner).
- jQuery for DOM bits, and `js/w3.js` (W3.CSS helpers) for HTML includes like
  the shared top nav.
- **CryptoJS** does client-side MD5 hashing of passwords before they're sent —
  see `js/login.js` and `js/register.js`.
- **Chart.js** (`js/chart.js`) powers the leaderboard graph on
  `hackerboard.html`.
- All the API calls are hand-rolled `XMLHttpRequest`s, not fetch. The base URL
  `http://localhost:8081` is hardcoded across the `js/` files.

**Backend** (`TPCDF Backend/`)
- **Node.js + Express** (`server.js`) listening on `127.0.0.1:8081`.
- **body-parser** for JSON/urlencoded bodies, **cors** (wide open) so Live
  Server on a different port can call it.
- **jsonwebtoken** for auth — login hands back a JWT, later requests send it
  back to be verified.
- **mysql** (the callback-style `mysql` package, not `mysql2`) for the DB.
- **nodemailer** is in the dependency list for password/notification email, and
  **nodemon** restarts the server on file changes (`npm start` runs
  `nodemon server.js`).

**Database** — MySQL / MariaDB, schema dumped in `ImportMe.sql`. Database name
is `test`.

> The `package.json` also lists a few junk dependencies that crept in over time
> (`init`, `ejc`, `package.json`, `package.json@2.0.1`). They're harmless
> leftovers and nothing imports them. Not worth the risk of touching before an
> event; clean them up in the off-season if you like.

## Request flow

```
Browser (Live Server, :5500)
      |
      |  XMLHttpRequest, JSON, CORS
      v
Express API (:8081)  --- controllers/ --- models/ --- mysql --> DB "test" (:3307)
      |
      |  JWT signed with the secret "hehexd"
      v
sessionStorage on the client holds the token between pages
```

Login (`js/login.js`) hashes the password client-side as
`MD5(hex(password + salt))` where the salt is the string `j1n23s9xcx`, then
POSTs `{Username, Password}`. The server checks it against `userprofile` and, on
a match, signs the username into a JWT and returns it. The page stashes that
token in `sessionStorage` and every later call (loading puzzle state, posting a
solve time, using a hint) sends the token back.

## API routes

All defined in `server.js`. Handlers are in
`controllers/userController.js`, queries in `models/UsersDB.js`.

| Method | Route | What it does |
|--------|-------|--------------|
| GET  | `/TPuser/:Username` | Look up a single player |
| POST | `/TPusers` | Register a new player |
| POST | `/LoginTPusers` | Log in, returns a JWT |
| POST | `/Getuser/:token` | Decode a token back to a username |
| GET  | `/GetAllUsers` | Everyone + their puzzle progress (feeds the leaderboard) |
| POST | `/addTime` | Record a solve time for a puzzle |
| POST | `/useHint` | Mark that a player spent a hint |
| GET  | `/Puzzle7/:Username` | Challenge 7: look up a puzzle7 account |
| POST | `/LoggingPuzzle7` | Challenge 7: log in |
| POST | `/SwappingPuzzle7` | Challenge 7: update profile (**the tamperable one**) |
| POST | `/RegisteringPuzzle7` | Challenge 7: register |
| POST/GET | `/puzzle7_checkusername/...` | Challenge 7: username availability |

## Data model

Three tables in `test` (see `ImportMe.sql`):

**`userprofile`** — the main player table.
- `idUserProfile`, `username`, `password` (MD5 hex)
- `puzzle1` … `puzzle8` — one column per challenge, storing the solve time as a
  string. `'0'` means unsolved. The board has slots for 8; we ship 7 built out.
- `Hint` — an 8-char flag string tracking hint usage.

**`puzzle2`** — a small fake "users" table (`id, firstname, lastname, email,
password`) seeded with a few rows. This is the loot for the Challenge 3 SQL
injection.

**`puzzle7_user`** — separate accounts (`user_id, username, password`) for the
Challenge 7 mini-site, which runs its own little login/register/profile flow.

## The intentional weak spots (do NOT fix these)

These are the game. If you "harden" them you break the hunt.

- **SQL injection in the Challenge 3 target site.** The whole challenge is
  `' UNION SELECT ... #`. It has to stay injectable.
- **JWT signed with the secret `"hehexd"`** (`controllers/userController.js`).
  It's a hardcoded, guessable secret on purpose — token forgery is fair game.
- **The Challenge 7 profile-update endpoint (`/SwappingPuzzle7`) trusts the
  body.** Players intercept the update in Burp and change the username to
  `admin`. That's the intended solve, not a bug.
- **MD5 password hashing** with a fixed, in-repo salt (`j1n23s9xcx`). Weak by
  design and by era.
- **Wide-open CORS and no rate limiting.** Fine for a localhost event, awful
  anywhere else.

## Known rough edges (these you *can* touch)

Separate from the challenges, a couple of things are just... rough:

- `tpcdfsig.js` does `if (err) throw err;` on the DB connect callback, so if
  MySQL isn't up the whole server crashes on boot instead of logging something
  friendly. Safe to improve.
- Config (DB host/port/creds, the JWT secret, the API base URL) is hardcoded in
  several files rather than read from one place. If you ever move this off one
  laptop, pulling those into a config/`.env` is the first thing to do.
- Some frontend filenames are inconsistent (`Challenge4.html` vs `puzzle7/`,
  `puzzle7(zx).js`). Cosmetic, but it's why finding things takes a minute.
