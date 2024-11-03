# Setting it up

This walks through getting the whole thing running on one laptop. It's the
setup we use on the organizer machine during the event. Budget maybe 15
minutes the first time, mostly waiting on `npm install` and the DB import.

## What you need first

- **Node.js** — anything reasonably recent works. We've run it on Node 16 all
  the way up to Node 24. You'll see a pile of `EBADENGINE` warnings on newer
  Node because some ancient dependencies claim they only support Node < 7.
  Ignore them, the app still runs.
- **A MySQL server on port 3307.** This trips everyone up, so read the next
  section carefully.
- **VS Code with the Live Server extension**, or any static file server. The
  frontend is just HTML/JS, so anything that serves a folder over HTTP works.
  We use Live Server out of habit.

## About that database port

`TPCDF Backend/tpcdfsig.js` connects to:

```
host:     localhost
port:     3307        <-- not the default 3306!
user:     root
password: (empty)
database: test
```

The original organizer ran MySQL through XAMPP/MAMP with the port bumped to
3307, and that config got baked into the code. You have two options:

1. **Match the code.** Run your MySQL/MariaDB on 3307 with a passwordless
   `root`. If you use XAMPP, change the MySQL port in `my.ini` to 3307 and
   leave root without a password (the default on a fresh XAMPP).
2. **Match your setup.** If your MySQL is on the normal 3306 (or has a root
   password), edit `tpcdfsig.js` to match. It's four lines, it's the honest
   fix, and honestly it's what most people end up doing.

Either way, the database name has to stay `test` — the SQL in `models/` is
full of `test.userprofile`, `test.puzzle7_user`, etc., so renaming the DB
means editing every query.

## Import the database

`ImportMe.sql` is a phpMyAdmin dump. It creates three tables inside the `test`
database:

- `userprofile` — the players. One row per account, with a `puzzleN` column per
  challenge (stores the solve time) and a `Hint` column.
- `puzzle2` — a tiny fake "user table" that Challenge 3's SQL injection reads
  out of.
- `puzzle7_user` — accounts for the standalone Challenge 7 mini-site.

Import it whichever way you like:

```bash
# command line
mysql -u root -P 3307 < ImportMe.sql
```

Or open phpMyAdmin, create/select the `test` database, and use Import → choose
`ImportMe.sql` → Go. If the `test` database doesn't exist yet, the dump does
*not* create it for you on some MySQL versions, so make the empty `test`
database first, then import.

## Start the backend

```bash
cd "TPCDF Backend"
npm install       # first time only
npm start         # this is just: nodemon server.js
```

When it's happy you'll see:

```
Example Apps listen at http://127.0.0.1:8081
Connected to MySQL Server!
```

If you get `Connected to MySQL Server!` — you're good. If instead the process
dies with an `ECONNREFUSED` stack trace, that's the DB. The connection line in
`tpcdfsig.js` does `if (err) throw err;`, so a database that isn't reachable
takes the whole server down on boot. Nine times out of ten it's the port (3306
vs 3307) or MySQL simply not being started.

## Start the frontend

The frontend talks to the backend at `http://localhost:8081` — that URL is
hardcoded in the JS files under `CTF-Frontend/js/` (e.g. `login.js`,
`puzzle.js`, `hackerboard.js`). So the backend has to be up first.

Open `CTF-Frontend/index.html` with Live Server (right-click → "Open with Live
Server" in VS Code). It'll pop up on something like
`http://127.0.0.1:5500/CTF-Frontend/index.html`.

Register an account, log in, and you should land on the quests board. If login
silently does nothing, open the browser dev console and check the request to
`:8081` — a failed request there means the backend isn't running or CORS is
being weird (the backend does `app.use(cors())` wide open, so it usually
isn't).

## Challenge 3's separate web root

Challenge 3 (the SQL injection one) is served from a small PHP/HTML site that
historically lived in an Apache `htdocs/` folder — that's what the old README
meant by "Puzzle 3 should be in ./htdocs/". That target site isn't part of this
repo; it's stood up separately on the organizer machine (XAMPP's Apache is the
easy way). If you're only bringing up the main app you can skip it, just know
Challenge 3 won't be solvable until that site is online. See
[CHALLENGES.md](CHALLENGES.md) for what it needs to contain.

## Quick smoke test

Once both halves are up, from a terminal:

```bash
# should return [] or a JSON list, not an error
curl http://localhost:8081/GetAllUsers
```

If that returns JSON, the API and DB are talking. Then just register through
the UI and you're done.
