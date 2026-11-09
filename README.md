# Hare Raid

A slingshot physics game: fling rabbits at fox forts across 10 levels.

A PaperWings Studios Production.

## What's in this folder

| File | Purpose |
| --- | --- |
| `index.html` | The whole game in one file (physics engine, art, sound and levels included; no external files needed) |
| `vercel.json` | Vercel settings for a static site |
| `README.md` | This file |

The page loads one optional web font (Fredoka) from Google Fonts. If it cannot load, the game falls back to the system font and still works.

## Deploy to Vercel

1. Create a new GitHub repository and push these three files to the root.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set **Framework Preset** to **Other**.
4. Leave **Build Command** and **Output Directory** empty (there is no build step).
5. Click **Deploy**.

Later updates: replace `index.html`, commit and push. Vercel redeploys automatically.

## How to play

- Drag the rabbit back from the slingshot and let go. The dotted guide shows the flight (full path on levels 1–2, first half after that).
- Tap the screen (or press Space) mid-flight for the rabbit's special move.
- Clear every fox to win. Each unused rabbit scores 10,000 bonus points. Press R to restart.
- Chain combos for bonus points: Double KO, Triple KO, Fox Frenzy, Domino, Demolition, Chain reaction, Long shot.
- Each level from 1 to 20 hides a golden carrot. Find all 20 to unlock the bonus level, Carrot Vault.

### Worlds

| World | Levels | What's new |
| --- | --- | --- |
| Meadow | 1–10 | The original levels |
| Frost Peaks | 11–20 | Balloon foxes, rubber walls, see-saws, swinging logs, wind, shield foxes, the Frost King |
| Bonus | Carrot Vault | Unlocks with all 20 golden carrots |
| Daily Challenge | 1 per day | A new fort every day (UTC), the same for every player |

### Rabbits

| Rabbit | Special move | Strong against |
| --- | --- | --- |
| Brown Hare | None | All-rounder |
| Jackrabbit | Sprint boost | Wood |
| Kit Trio | Splits into three | Ice |
| Flemish Giant | None (very heavy) | Stone |
| Dutch Thumper | Shockwave | Everything nearby |
| Lop Glider | Glides on its ears | Reaching far targets |
| Burrowing Bun | Dives, tunnels, pops up under the fort | Stone, sheltered foxes |
| Carrot Bomber | Drops an exploding carrot | Anything below it |

### Extras

- Camera follows each shot, with slow-motion on big moments.
- Replay the last shot from the results screen.
- 21 achievements (menu → Achievements).
- Share button: uses the phone's share sheet where available, otherwise copies a message; a WhatsApp button opens a pre-filled message.
- Music and sound effects are generated in the browser (no audio files). Each can be switched off separately.

## Global leaderboard (Supabase)

- After clearing a level, players can enter a nickname (1–16 letters, numbers, spaces, `.`, `-`, `_`) and post their score.
- The top 10 per level (best score per nickname) appear on the win screen and under **🏆 Leaderboards** on the level menu, with tabs for Meadow, Frost Peaks, Bonus and Daily.
- Daily Challenge scores go to a separate `daily_scores` table, one board per UTC day.
- Backend: Supabase project **Hare Raid** (organisation GT, region ap-southeast-1, Singapore).
  - Table `public.scores` is read-only to the public (row-level security on, direct writes revoked).
  - New scores go only through `submit_score()` (levels 1–21) and `submit_daily_score()` (today ±1 day). Both check the nickname, score range (0–400,000) and stars, and allow each nickname 5 posts per board every 10 minutes.
  - Rankings come from `top_scores(level)` and `top_daily(day)`.
- The page uses the project's **publishable** key, which is designed to be public. Never put the secret/service-role key in this file.
- Scores are not cheat-proof: a determined player could post a fake score within the allowed range. To remove an entry, delete its row in the Supabase Table Editor.

## Notes

- Progress (unlocked levels, stars and best scores) is saved in the player's own browser. It does not sync between devices, and clearing browser data resets it.
- Best played in landscape on phones.
- The WhatsApp button on the level menu opens a chat with PaperWings Studios with a pre-filled enquiry message.
