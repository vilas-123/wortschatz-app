# Wortschatz-Trainer (offline app)

958 German B1 words and phrases. English → German or German → English. You type the translation, the app checks it. If it is wrong, you see the solution and can press "Nochmal versuchen" to try the same card again. After every answer, right or wrong, the app shows the solution and 3 example sentences with English translation. Speaker buttons read the German word and each example sentence aloud ("Langsam sprechen" slows it down, "Wort automatisch vorlesen" reads the word after every answer). This uses the German voice built into your phone or computer and works offline; if no German voice is installed, install one in the system settings under text-to-speech. All words rotate endlessly (shuffled). The app stores nothing about your progress. Everything works **without internet**, there is no AI and no key.

## Quick start on a computer
1. Unzip the folder.
2. Double-click `index.html`. It opens in your browser and works offline.

## Install it as an app (recommended)
An installed app needs the folder to be served once over https or localhost. After the first load it works offline.

**Phone or computer, free hosting (2 minutes):**
- Netlify Drop: open https://app.netlify.com/drop and drag the whole folder in. Open the link it gives you.
- Or GitHub Pages: upload the folder to a repository and switch on Pages.

**Then install:**
- Android / Chrome: menu → Install app (or Add to Home screen).
- iPhone / Safari: Share → Add to Home Screen.
- Computer / Chrome or Edge: install icon in the address bar.

**Computer only, no hosting:** open a terminal in this folder and run `python3 -m http.server 8080`, then open http://localhost:8080 in Chrome and install from the address bar. Keep in mind that the app only works offline once it has been opened online at least once.

## Updating the app
If you change files, edit `VERSION` in `sw.js` (for example `v2`) so installed copies pick up the new version.
