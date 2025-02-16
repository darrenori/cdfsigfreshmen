# The toolkit

The tools a player needs to get through the hunt, plus how the desk usually
explains them to freshmen who've never opened them before. Nothing here is
obscure — it's the standard starter kit, which is the point. This event is
partly an excuse to make people install and actually use these once.

If you just want to know *which* tool solves *which* challenge, jump to the
cheat sheet at the bottom.

## Web / interception

### Burp Suite (Community Edition)
The star of Challenge 7. It's an intercepting proxy: it sits between the browser
and the server so you can pause, read, and edit requests before they go out.

Getting a freshman going:
1. Install Burp Community (free) and start it with the temporary project.
2. Point the browser at Burp's proxy (`127.0.0.1:8080`). The painless way is
   Burp's bundled Chromium ("Open browser" in the Proxy tab) so you don't have
   to fiddle with system proxy settings or the CA cert.
3. **Proxy → Intercept on**, do the action in the app, and the request freezes
   in Burp.
4. Right-click → **Send to Repeater**. In Repeater you can edit any field and
   hit Send as many times as you want. That's where the `admin` / `asd1`
   tamper happens.

The one thing people miss: turn Intercept back **off** afterwards or their
browser looks frozen and they panic.

### sqlmap
Optional, for Challenge 3. If a player would rather automate the injection than
craft the `UNION SELECT` by hand, `sqlmap` will find and dump it:

```
sqlmap -u "http://<challenge3-host>/login.php" --data="username=x&password=y" --dump
```

We don't *require* it — doing the injection manually teaches more — but it's
fair game and some people love it.

### Browser dev tools
Underrated. F12 → Network/Console is enough for a lot of the recon stages, and
it's how you debug the main app too (a login that "does nothing" is almost
always a failed request to `:8081` that shows up right here).

## Forensics

### FTK Imager
Challenge 5's main tool. It reads disk images and lets you browse the file
system inside them — including files that were deleted but not yet overwritten.
The move is: open the image, navigate to the deleted entry (FTK shows them with
an X), right-click → **Export Files** to pull it out to disk.

### HxD
A hex editor. Once the deleted file is exported, open it in HxD to read the raw
bytes — the flag is in there even if the file doesn't open "normally" in a
viewer. Any hex editor works; HxD is just the free one we standardize on.

## Encoding / crypto

### CyberChef
The swiss-army knife for the decode stages. Challenges 2 and 3 lean on base64;
CyberChef's "From Base64" (and "Magic" if you're not sure what you're looking
at) handles them, plus about a hundred other operations. Runs entirely in the
browser at gchq.github.io/CyberChef, or self-host the download if the venue
Wi-Fi is bad.

### Morse decoder
Challenge 7 Part A is Morse hidden in an audio file. We point people at the
adaptive **audio** decoder at `morsecode.world` — you feed it the sound and it
transcribes. (If the recording is clean, decoding by ear or with a visual
waveform in Audacity also works.)

### MD5 collision tools
Challenge 7 asks for two different inputs with the same MD5 hash. Freshmen
aren't expected to *break* MD5 from scratch — the well-known collision pairs are
findable, and generators exist:

- **fastcoll** — classic prefix-collision generator; produces two files with an
  identical MD5.
- **HashClash** (Marc Stevens' toolkit) — the heavier, more capable option if
  someone wants to go deep.
- Or just use one of the famous published collision pairs. Any two inputs that
  MD5 to the same digest satisfy the check.

### hashcat / John the Ripper
Not strictly required by any challenge as written, but worth having around if a
player wants to crack a hash they've recovered rather than look it up. Both are
standard; hashcat if there's a GPU, John if not.

## Cheat sheet: tool per challenge

| Challenge | Tools that get you through |
|-----------|---------------------------|
| 1 — warm-up | just a browser |
| 2 — OSINT | browser, CyberChef (base64) |
| 3 — SQL injection | browser (manual `UNION SELECT`) or sqlmap; CyberChef |
| 4 — comment trail | browser |
| 5 — forensics | **FTK Imager** + **HxD** |
| 6 — great search | browser / search-fu (TBD, see CHALLENGES.md) |
| 7 — audio → collision → admin | Morse decoder, MD5 collision tool, **Burp Suite** |

## Install-day tips

Most freshmen show up with nothing installed. If you can, send this list ahead
of time:

- Burp Suite Community — needs a recent Java, which the installer bundles now.
- FTK Imager — free, but registration-walled behind Exterro's site; grab it
  early, not on the day.
- HxD — tiny, Windows-only. Mac folks can use `hexfiend` or `xxd`.
- CyberChef — nothing to install, but download the offline copy in case Wi-Fi
  dies mid-event.

Have the offline installers on a USB stick at the desk. There's always someone
whose download won't finish.
