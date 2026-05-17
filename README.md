# Taska — Sito web

Sito statico bilingua (IT/EN) per Taska, con grafica ispirata alle pagine prodotto Apple.

## Struttura
- `index.html` — Home (hero scuro, sezioni alternate light/dark, bento, prezzi, FAQ)
- `privacy.html` — Privacy Policy
- `terms.html` — Termini d'Uso (con indice laterale sticky)
- `support.html` — Centro assistenza (cards di contatto + FAQ + info app)
- `styles.css` — Design system Apple-inspired (SF system font, neri puri, accenti viola brand)
- `script.js` — Switch lingua, nav adattiva chiaro/scuro, scroll reveal, parallax leggero, FAQ accordion
- `assets/` — Icona e logo

## Design
- **Tipografia** — system font SF Pro (`-apple-system`), nessun font web esterno
- **Palette** — bianco / `#f5f5f7` / nero `#000` / accenti viola `#7C6AF5` → blu `#5B8DEF` per i gradient
- **CTA** — Apple Blue `#0071e3`
- **Sezioni** — alternanza dark / light come sulle pagine prodotto Apple
- **Nav sticky** — backdrop-blur, passa automaticamente da dark a light a seconda della sezione visibile

## Come aggiungere gli screenshot
1. Salva gli screenshot iPhone in `assets/mockups/`
2. Nominali ad esempio `dashboard.png`, `transactions.png`, `budget.png`
3. In `index.html` cerca il commento `⬇️ SOSTITUISCI` (sezione hero)
4. Decommenta la riga `<img class="phone-screenshot" ...>` e rimuovi il `<div class="phone-placeholder">`

Dimensioni consigliate: 1170×2532 px (iPhone 13/14/15 standard).

## Da aggiornare
- Link App Store: cerca `https://apps.apple.com/app/taska` e sostituisci con il link reale dopo la pubblicazione.

## Pubblicazione
Carica la cartella su un qualsiasi hosting statico:
- GitHub Pages
- Netlify (drag & drop su netlify.com)
- Vercel
- Cloudflare Pages

Nessuna build necessaria — HTML/CSS/JS puro.

## Lingua
Lo switch IT/EN è in alto a destra. La lingua viene salvata in `localStorage`.
