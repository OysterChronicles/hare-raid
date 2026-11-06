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

- Drag the rabbit back from the slingshot and let go to launch.
- Tap the screen (or press Space) mid-flight to use the rabbit's special ability.
- Clear every fox to win. Each unused rabbit scores 10,000 bonus points.
- Press R to restart the current level.

### Rabbits

| Rabbit | Ability | Strong against |
| --- | --- | --- |
| Brown Hare | None | All-rounder |
| Jackrabbit | Sprint boost | Wood |
| Kit Trio | Splits into three | Ice |
| Flemish Giant | None (very heavy) | Stone |
| Dutch Thumper | Shockwave | Everything nearby |

## Notes

- Progress (unlocked levels, stars and best scores) is saved in the player's own browser. It does not sync between devices, and clearing browser data resets it.
- Best played in landscape on phones.
- The WhatsApp button on the level menu opens a chat with PaperWings Studios with a pre-filled enquiry message.
