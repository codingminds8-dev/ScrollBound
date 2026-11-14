# Scrollbound

Scrollbound is a pixel-art study adventure built with vanilla HTML, CSS, and JavaScript modules.

## Run locally

Browsers block the JavaScript modules when `index.html` is opened directly with `file://`. Start a small local web server from this folder instead:

```powershell
cd C:\Users\howar\Desktop\ScrollBound
py -m http.server 8080
```

If `py` is unavailable, use:

```powershell
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

Keep the terminal window running while using the site. Press `Ctrl+C` in that window to stop the server.

## Start a study battle

1. Click **Start quest** or **Begin your quest** on the home screen.
2. Select a topic card.
3. Answer questions with the buttons or number keys `1`–`4`.

You can also open the study screen directly at `http://localhost:8080/#study`.
