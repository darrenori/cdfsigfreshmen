# Challenge walkthrough (organizers only)

Spoilers, obviously. This is the answer key so whoever's running the desk can
unstick players and check flags. Order roughly follows difficulty, which is
also the order they appear on `quests.html`.

Some of these depend on external accounts (Instagram, a shared Google Drive,
tinyurl links) that get set up fresh each year. Where a challenge points at
"our account" or a link, that's a placeholder you re-create before the event —
see the notes at the bottom.

---

## Challenge 1 — the warm-up

**Category:** basic recon / read-the-page

Russell's uploaded challenge post links out to our site. The flag is sitting in
the description text of that post. That's the whole thing — it's meant to teach
freshmen to actually *read* what's in front of them before overthinking it.

**Solve:** open the link, read the description, copy the flag.

---

## Challenge 2 — OSINT

**Category:** open-source intelligence

Players start from Darren's Instagram (`d4rr3n.t4nn`) and look at who Russell
follows. One of those accounts has a bio (or a post) containing a base64
string. Decode it and it points to `greencurry`.

Visiting `{our-domain}/greencurry` gives the answer for this stage, and the
`greencurry` page also carries a second base64 blob that matters later (it
decodes to `SuperSparklyBoy5`, which is a credential used in Challenge 3).

**Solve:**
1. OSINT the IG accounts, find the base64 in a bio/post.
2. Decode base64 → `greencurry`.
3. Go to `{our-domain}/greencurry`, grab the flag, and note the second base64.

---

## Challenge 3 — SQL injection

**Category:** web exploitation

This one targets the separate little login site (the one that historically
lived in Apache's `htdocs/`, see [SETUP.md](SETUP.md)). It's injectable on
purpose. The classic payload:

```
' UNION SELECT firstname, lastname, password FROM users #
```

That dumps the fake user table out onto the page. Combined with the base64
credential from the `greencurry` page (`SuperSparklyBoy5`), players get through.

**Solve:** UNION-based injection in the login field, read the leaked creds, log
in. `sqlmap` also cracks it wide open if a player wants to automate — see
[TOOLKIT.md](TOOLKIT.md).

---

## Challenge 4 — the comment trail

**Category:** recon / following breadcrumbs

Access is gated on a link an organizer shares during the event
(historically Afiq handed out a tinyurl). Following it, the next step —
`https://tinyurl.com/utyy4b5u` — is hidden in the **comments** of the page/post
players land on. They have to actually dig through the comment section to find
it.

**Solve:** open the shared link, scroll the comments, find the tinyurl, follow
it to the flag.

---

## Challenge 5 — deleted-file forensics

**Category:** digital forensics

Players are given a disk/image to examine. The flag is in a **deleted** file
that has to be recovered.

**Solve:**
1. Load the image into **FTK Imager**.
2. Find and **export the deleted file**.
3. Open it in **HxD** (hex editor) and read the flag out of the bytes.

Tool notes are in [TOOLKIT.md](TOOLKIT.md).

---

## Challenge 6 — "Great Search"

**Category:** recon / search skills

This one was never fully written up in the old notes — the title "Great Search"
is the hint (it's a search/recon puzzle). **Whoever owns this challenge for the
year needs to fill in the exact steps here before the event.** Don't leave it
blank on the day; a half-documented challenge is how the desk gets swamped.

**Solve:** _TODO — document the intended path._

---

## Challenge 7 — audio → hash collision → privilege escalation

**Category:** crypto + web exploitation (the finale, two parts)

**Part A — the audio:**
1. Player follows the challenge link and downloads the audio file.
2. Run it through an audio Morse decoder — we point people at
   `morsecode.world`'s adaptive audio decoder.
3. The Morse decodes to a message about an **MD5 collision**.
4. The player has to supply **two different inputs with the same MD5 hash**.

**Part B — becoming admin:**
This part uses the standalone Challenge 7 mini-site (`CTF-Frontend/puzzle7/`,
backed by the `/…Puzzle7`/`/SwappingPuzzle7` routes).
1. Register a normal account and log in.
2. Fire up **Burp Suite**, set the browser proxy to point at it.
3. Trigger a **profile update**, catch the request in Burp, send it to
   **Repeater**.
4. Edit the intercepted request: set username to `admin` and password to `asd1`.
   The `/SwappingPuzzle7` endpoint trusts the body, so it happily rewrites the
   admin account's password.
5. Now log in as `admin` / `asd1`. Done.

Burp walkthrough lives in [TOOLKIT.md](TOOLKIT.md).

---

## Yearly reset checklist

These bits are tied to accounts/links that expire or change between cohorts.
Re-do them before each run and update the pointers above:

- [ ] Instagram accounts for Challenge 2 (the `d4rr3n.t4nn` account + whoever
      Russell follows), with the base64 bio in place.
- [ ] The `{our-domain}/greencurry` page, carrying both the Challenge 2 flag and
      the `SuperSparklyBoy5` base64 for Challenge 3.
- [ ] The Challenge 3 injectable site stood up (Apache/XAMPP), seeded with the
      creds.
- [ ] Challenge 4's shared entry link + the tinyurl buried in the comments.
- [ ] Challenge 5's disk image with the deleted flag file.
- [ ] Challenge 6 — **write it up.**
- [ ] Challenge 7's audio file (Morse → MD5-collision prompt) hosted and linked.
- [ ] Reset the `admin` accounts in `userprofile` and `puzzle7_user` so the
      Challenge 7 escalation lands cleanly.
