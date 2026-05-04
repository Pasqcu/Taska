# Taska — Sito web

Sito statico bilingua (IT/EN) per Taska.

## Struttura
- `index.html` — Home (hero, funzioni, come funziona, prezzi, FAQ)
- `privacy.html` — Privacy Policy
- `terms.html` — Termini d'Uso
- `support.html` — Centro assistenza
- `styles.css` — Stile completo
- `script.js` — Switch lingua, navigazione, animazioni
- `assets/` — Icona, logo, screenshot

## Come aggiungere gli screenshot
1. Salva i tuoi screenshot iPhone in `assets/mockups/`
2. Nominali ad esempio `dashboard.png`, `transactions.png`, `budget.png`
3. Nel file `index.html` cerca il commento `⬇️ SOSTITUISCI:` (sezione hero)
4. Decommenta la riga `<img class="phone-screenshot" ...>` e rimuovi il `<div class="phone-placeholder">`

Dimensioni consigliate: 1170×2532 px (iPhone 13/14/15 standard).

## Da aggiornare
- Link App Store: cerca `https://apps.apple.com/app/taska` e sostituisci con il link reale dopo la pubblicazione

## Pubblicazione
Carica la cartella su un qualsiasi servizio di hosting statico:
- Netlify (drag & drop su netlify.com)
- Vercel (vercel.com)
- GitHub Pages
- Cloudflare Pages

Nessuna build necessaria, è HTML/CSS/JS puro.

## Lingua
Lo switch IT/EN è in alto a destra. La lingua viene salvata nel browser.
