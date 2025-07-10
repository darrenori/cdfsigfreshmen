# Running the hunt on the day

Notes from actually running this thing, so the next committee doesn't relearn it
the hard way. Read [SETUP.md](SETUP.md) first — this assumes the app is already
working on the host machine.

## A week before

- Bring the app up end to end on the machine you'll actually use on the day. Not
  "it worked on my laptop last year" — the machine, this year, with this year's
  MySQL. The port-3307 thing bites every single time.
- Walk the whole [CHALLENGES.md yearly-reset checklist](CHALLENGES.md#yearly-reset-checklist).
  The external stuff (Instagram bios, the greencurry page, tinyurl links, the
  Challenge 3 site, the Challenge 5 disk image, the Challenge 7 audio) is what
  rots between cohorts, not the code.
- **Actually solve every challenge yourself, start to finish.** This is the step
  people skip and regret. If Challenge 6 still says TODO in the walkthrough,
  either finish writing it or pull it from the board — don't ship a challenge the
  desk can't explain.
- Send freshmen the [TOOLKIT.md](TOOLKIT.md) install list ahead of time and put
  the offline installers on a USB stick.

## Setting up the room

- One machine is "the server": it runs MySQL, the backend on `:8081`, the
  Challenge 3 Apache site, and hosts the frontend. Everyone hits it over the
  local network.
- If players connect from their own laptops, the hardcoded `http://localhost:8081`
  in the frontend JS won't reach a *different* machine. Two options: have each
  player run their own copy locally, or find-and-replace `localhost` with the
  server's LAN IP across `CTF-Frontend/js/*.js` (and open the backend host in
  `server.js` beyond `127.0.0.1`). Decide this **before** the day, not during.
- Pull up the leaderboard (`hackerboard.html`) on the projector. It's half the
  fun and it quietly tells you if the backend has fallen over — if it stops
  updating, something's down.

## While it's running

- Keep an eye on the backend terminal. Remember `tpcdfsig.js` throws on a lost DB
  connection, so if MySQL hiccups the whole server dies and every player's app
  goes quiet at once. If the room suddenly goes silent, check that terminal
  first. Restarting is just `npm start` again.
- Man the hint desk with [CHALLENGES.md](CHALLENGES.md) open. Nudge, don't solve
  — point people at the right *tool* or the right *idea* rather than handing over
  the flag. The `Hint`/`useHint` mechanic is there if you want to make hint
  usage cost something on the scoreboard.
- Expect a cluster of people stuck at the same wall (usually Burp setup for
  Challenge 7, or getting the DB port right if they're self-hosting). Solve it
  once loudly for the room instead of ten times individually.

## Common fires and how to put them out

| Symptom | Almost always | Fix |
|---------|---------------|-----|
| Backend won't start, `ECONNREFUSED` stack trace | MySQL not up, or wrong port | Start MySQL; confirm it's on 3307 or edit `tpcdfsig.js` |
| Login/register "does nothing" | Backend down, or frontend pointed at wrong host | Check the request in dev tools → Network; confirm `:8081` reachable |
| Leaderboard blank or frozen | `/GetAllUsers` failing → backend or DB down | Restart backend; re-check DB |
| Whole room's app dies at once | DB dropped, server threw and exited | Restart MySQL, then `npm start` |
| Challenge 3 unsolvable | The separate injectable site isn't running | Start XAMPP/Apache with that site |
| Burp shows nothing | Intercept off, or proxy not set | Turn Intercept on; use Burp's built-in browser |

## After it's over

- Wipe or reset the `userprofile` and `puzzle7_user` tables so next year starts
  clean (and so the `admin` escalation works fresh).
- Jot down what broke and what confused people, right here or in an issue, while
  it's fresh. That five-minute note is worth more than any of these docs.
- If you touched config to make it run (DB creds, LAN IPs), remember those live
  in the code right now, so either revert them or leave a note for whoever
  clones this next.
