# vals

A tiny Valentine “Yes/No” page:

- Clicking **No** makes **Yes** bigger (and changes the No text).
- Clicking **Yes** shows a happy screen.
- After that, another tap reveals the plan: **Aubi & Ramsa**, **Time TBD**.

## Run locally

Open `index.html` in a browser.

If your browser blocks local scripts when opening a file directly, run a small local server:

```bash
cd /opt/projects/vals
python3 -m http.server 5173
```

Then open `http://localhost:5173`.