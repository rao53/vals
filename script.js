/**
 * Tiny, dependency-free Valentine page.
 * Behavior:
 * - Clicking "No" makes "Yes" larger + changes "No" label
 * - Clicking "Yes" shows happy screen, then a button reveals the plan
 */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const revealBtn = document.getElementById("revealBtn");
const restartBtn = document.getElementById("restartBtn");

const badge = document.getElementById("badge");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const actions = document.getElementById("actions");
const after = document.getElementById("after");
const plan = document.getElementById("plan");

const stickerEmoji = document.getElementById("stickerEmoji");
const stickerHearts = document.getElementById("stickerHearts");

let noCount = 0;

// Base sizes for the Yes button
const BASE_FONT_SIZE = 18;
const BASE_PADDING_V = 12;
const BASE_PADDING_H = 24;

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Wait… what?",
  "Pleaseee?",
  "Ok ok—hear me out",
  "I’ll be extra nice",
  "But you’re my favorite",
  "I’m gonna be so sad",
  "Fine… I’ll ask again",
];

const subtitlesByNo = [
  "I have a tiny question for you…",
  "No pressure. (Ok, a little.)",
  "Are you *really* sure?",
  "I can be very convincing.",
  "Imagine cute pics together.",
  "I brought my best puppy eyes.",
  "I’m not giving up that easily.",
  "Ok ok, I’m being dramatic.",
  "But I like you… a lot.",
  "One last tiny chance?",
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function applyYesSize() {
  // Grow the Yes button by increasing font-size and padding
  const growFactor = 1 + noCount * 0.35; // grows ~35% per No click
  const maxGrow = 3.5;
  const factor = clamp(growFactor, 1, maxGrow);

  const fontSize = Math.round(BASE_FONT_SIZE * factor);
  const paddingV = Math.round(BASE_PADDING_V * factor);
  const paddingH = Math.round(BASE_PADDING_H * factor);

  yesBtn.style.fontSize = `${fontSize}px`;
  yesBtn.style.padding = `${paddingV}px ${paddingH}px`;
  yesBtn.style.boxShadow = `0 ${8 + factor * 4}px ${20 + factor * 10}px rgba(46, 204, 113, ${clamp(0.15 + factor * 0.08, 0.15, 0.5)})`;
}

function updateNoUI() {
  const idx = clamp(noCount, 0, noPhrases.length - 1);
  noBtn.textContent = noPhrases[idx];
  subtitle.textContent = subtitlesByNo[idx] ?? subtitlesByNo[subtitlesByNo.length - 1];

  // Light escalation: after a few "No"s, show the playful badge.
  if (noCount >= 2) badge.hidden = false;

  // Make "No" feel less enticing over time (but still clickable).
  const noScale = clamp(1 - noCount * 0.06, 0.72, 1);
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.filter = noCount >= 4 ? "saturate(0.9)" : "none";
}

function onNo() {
  noCount += 1;
  // Exponential-ish growth that ramps quickly but caps via applyYesScale.
  yesScale *= noCount < 4 ? 1.22 : 1.3;
  applyYesScale();
  updateNoUI();

  // Make the sticker react.
  if (noCount >= 1) stickerEmoji.textContent = "🥺";
  if (noCount >= 5) stickerEmoji.textContent = "😭";
}

function onYes() {
  // Reset transforms so layout doesn’t look weird on the next screen.
  yesBtn.style.transform = "";
  noBtn.style.transform = "";

  title.textContent = "Yessss!";
  subtitle.textContent = "You just made me so happy.";
  actions.hidden = true;
  after.hidden = false;

  stickerEmoji.textContent = "🐻‍❄️";
  stickerHearts.hidden = false;
}

function onReveal() {
  after.hidden = true;
  plan.hidden = false;
  title.textContent = "Ok, here’s the plan";
  subtitle.textContent = "A sweet little date—just us.";
}

function onRestart() {
  noCount = 0;
  yesScale = 1;

  badge.hidden = true;
  stickerHearts.hidden = true;
  stickerEmoji.textContent = "🧸";

  title.textContent = "Will you be my Valentine?";
  subtitle.textContent = "I have a tiny question for you…";

  actions.hidden = false;
  after.hidden = true;
  plan.hidden = true;

  yesBtn.style.transform = "";
  yesBtn.style.filter = "";
  yesBtn.style.boxShadow = "";

  noBtn.style.transform = "";
  noBtn.style.filter = "";
  noBtn.textContent = "No";
}

noBtn.addEventListener("click", onNo);
yesBtn.addEventListener("click", onYes);
revealBtn.addEventListener("click", onReveal);
restartBtn.addEventListener("click", onRestart);

// Initialize deterministic UI.
applyYesScale();
updateNoUI();
