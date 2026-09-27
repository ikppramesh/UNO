# UNO Ultimate

A web-based UNO game you can play against the computer or with friends anywhere, using a shareable link.

- **Single player:** play against 1–9 computer opponents.
- **Multiplayer:** 2–10 seats per room. Share the link, and any empty seats can be filled with computer players.
- **Game modes:** Classic UNO, UNO Flip, UNO Show 'em No Mercy, Liar's UNO, and Mega Draw (+15), which is an example of a home-made mode.
- **Themes:** Classic, Frozen ❄, Ramayanam 🏹, Mahabharatam ⚔
- **House rules in the lobby:** starting hand size, stacking draw cards, draw until you can play, 7-0 swapping, liar mode, and a knock-out card limit.
- **Custom cards in the lobby:** add cards such as *Wild Draw +15 ×4* with no code changes.
- **Reconnects:** if you refresh or lose your connection, you go back to your seat. A computer plays for a disconnected player after 15 seconds.

## Run it on your computer

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm start
```

Open http://localhost:3000. The terminal also prints a `http://192.168.x.x:3000` address, which people on the **same Wi-Fi** can open to join.

## Play with friends in other places

`localhost` links only work on your own computer. For friends in other locations, the game has to run on a public server. Any Node.js host works. Two easy options:

**Option A: Render (free tier, permanent link)**
1. Push this repo to GitHub.
2. On https://render.com choose **New → Blueprint** and select the repo. The included `render.yaml` sets everything up.
3. You get a URL like `https://uno-ultimate.onrender.com`. Create a room there and share the invite link.

(On the free tier the server sleeps when nobody is using it, so the first visit can take about 30 seconds.)

**Option B: a quick temporary tunnel from your own computer**
```bash
npm start
# in a second terminal:
npx cloudflared tunnel --url http://localhost:3000
```
This prints a public `https://….trycloudflare.com` link that works while your computer is running.

## How to play

1. Enter your name.
2. **Play vs Computer:** pick a mode, a theme and how many opponents, then press **Play now**.
3. **Play with Friends:** press **Create room**, then **Copy link** and send it. Friends open the link and press **Join**. As host, you can add computer players, change the mode, theme and house rules, then press **Start**.
4. Cards you can play are raised and outlined. Press **UNO!** when you are down to 2 or 1 cards. If you forget, others can **Catch** you for +2.

### Mode notes
- **UNO Flip:** a Flip card turns every card over to the Dark side (Draw 5, Skip Everyone, Wild Draw Colour). You can see the *other* side of your opponents' cards.
- **No Mercy:** draw cards stack, you draw until you can play, 7 swaps hands, 0 passes all hands, and anyone who reaches 25 cards is knocked out.
- **Liar's UNO:** every card is played face-down while you *announce* what it is, and lying is allowed. The next player either believes you or calls **LIAR!**
  - Caught lying: take the card back and draw 2.
  - Wrong accusation: the accuser draws 2.

## Adding your own modes and themes

### A new theme
Edit [public/js/themes.js](public/js/themes.js): copy an existing theme block, give it a new key, and change the colours, names, icons, card back and background. It appears in the theme menus automatically.

### A new game mode
1. Copy [server/variants/megadraw.js](server/variants/megadraw.js) to a new file.
2. Change its `id`, `name`, `description`, default `rules`, and `buildDeck()` (the list of cards).
3. Register it in [server/variants/index.js](server/variants/index.js).

The card types the engine understands are listed at the top of [server/engine/cards.js](server/engine/cards.js): numbers, skip, reverse, draw +N, skip everyone, discard all, flip, wild, wild draw +N, wild reverse draw +N, colour roulette and wild draw colour. Any combination and any +N value works, for example a "UNO +15" deck.

If you want a card type with a completely new effect, add a `case` for it in `resolvePlay()` in [server/engine/game.js](server/engine/game.js).

## Project layout

```
server/
  index.js           web server + Socket.IO
  rooms.js           rooms, invite codes, host controls, reconnects, bot timing
  engine/game.js     the rules engine (server-authoritative: players can't cheat)
  engine/bot.js      computer player AI
  engine/cards.js    card types and matching rules
  variants/          one file per game mode
public/
  index.html, css/style.css
  js/app.js          client UI
  js/cards.js        card rendering
  js/themes.js       theme definitions
tests/simulate.js    plays thousands of bot-only games in every mode to catch rule bugs
```

Run the rules test with `npm test`.
